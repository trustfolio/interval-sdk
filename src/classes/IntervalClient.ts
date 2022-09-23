import { z, ZodError } from 'zod'
import { v4 } from 'uuid'
import { WebSocket } from 'ws'
import fetch from 'node-fetch'
import { AsyncLocalStorage } from 'async_hooks'
import * as superjson from 'superjson'
import { JSONValue } from 'superjson/dist/types'
import ISocket, { TimeoutError } from './ISocket'
import { DuplexRPCClient } from './DuplexRPCClient'
import IOError from './IOError'
import Logger from './Logger'
import {
  wsServerSchema,
  hostSchema,
  TRANSACTION_RESULT_SCHEMA_VERSION,
  ActionEnvironment,
  LoadingState,
  CREATE_GHOST_MODE_ACCOUNT,
  DECLARE_HOST,
  ActionDefinition,
  RouterDefinition,
} from '../internalRpcSchema'
import {
  ActionResultSchema,
  IOFunctionReturnType,
  IO_RESPONSE,
  LinkProps,
  T_IO_RENDER_INPUT,
  T_IO_RESPONSE,
} from '../ioSchema'
import { IOClient } from './IOClient'
import * as pkg from '../../package.json'
import { deserializeDates } from '../utils/deserialize'
import type {
  ActionCtx,
  PageCtx,
  IntervalActionHandler,
  IntervalActionStore,
  IntervalPageStore,
  InternalMenuItem,
} from '../types'
import TransactionLoadingState from '../classes/TransactionLoadingState'
import localConfig from '../localConfig'
import { Interval, InternalConfig, IntervalError } from '..'
import Router from './Router'
import {
  Layout,
  Basic,
  LayoutSchemaInput,
  MetaItemSchema,
  MetaItemsSchema,
} from './Layout'

export const DEFAULT_WEBSOCKET_ENDPOINT = 'wss://interval.com/websocket'

export function getHttpEndpoint(wsEndpoint: string) {
  const url = new URL(wsEndpoint)
  url.protocol = url.protocol.replace('ws', 'http')
  url.pathname = ''
  const str = url.toString()

  return str.endsWith('/') ? str.slice(0, -1) : str
}

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

interface SetupConfig {
  instanceId?: string
}

export const actionLocalStorage = new AsyncLocalStorage<IntervalActionStore>()

export const pageLocalStorage = new AsyncLocalStorage<IntervalPageStore>()

export default class IntervalClient {
  #interval: Interval
  #ghostOrgId: string | undefined
  #apiKey: string | undefined
  #endpoint: string = DEFAULT_WEBSOCKET_ENDPOINT
  #httpEndpoint: string
  #logger: Logger
  #retryIntervalMs: number = 3000
  #pingIntervalMs: number = 30_000
  #closeUnresponsiveConnectionTimeoutMs: number = 3 * 60 * 1000 // 3 minutes
  #reinitializeBatchTimeoutMs: number = 200
  #pingIntervalHandle: NodeJS.Timeout | undefined
  #intentionallyClosed = false
  #config: InternalConfig

  #actionDefinitions: ActionDefinition[] = []
  #routerDefinitions: RouterDefinition[] = []
  #actionHandlers: Map<string, IntervalActionHandler> = new Map()
  #pageHandlers: Map<string, NonNullable<Router['index']>> = new Map()

  organization:
    | {
        name: string
        slug: string
      }
    | undefined
  environment: ActionEnvironment | undefined

  constructor(interval: Interval, config: InternalConfig) {
    this.#interval = interval
    this.#apiKey = config.apiKey
    this.#logger = new Logger(config.logLevel)
    this.#config = config

    if (config.endpoint) {
      this.#endpoint = config.endpoint
    }

    if (config.retryIntervalMs && config.retryIntervalMs > 0) {
      this.#retryIntervalMs = config.retryIntervalMs
    }

    if (config.pingIntervalMs && config.pingIntervalMs > 0) {
      this.#pingIntervalMs = config.pingIntervalMs
    }

    if (
      config.closeUnresponsiveConnectionTimeoutMs &&
      config.closeUnresponsiveConnectionTimeoutMs > 0
    ) {
      this.#closeUnresponsiveConnectionTimeoutMs =
        config.closeUnresponsiveConnectionTimeoutMs
    }

    if (
      config.reinitializeBatchTimeoutMs &&
      config.reinitializeBatchTimeoutMs > 0
    ) {
      this.#reinitializeBatchTimeoutMs = config.reinitializeBatchTimeoutMs
    }

    this.#httpEndpoint = getHttpEndpoint(this.#endpoint)
  }

  #walkRoutes() {
    const routerDefinitions: RouterDefinition[] = []
    const actionDefinitions: (ActionDefinition & { handler: undefined })[] = []
    const actionHandlers = new Map<string, IntervalActionHandler>()
    const pageHandlers = new Map<string, NonNullable<Router['index']>>()

    function walkRouter(groupSlug: string, router: Router) {
      routerDefinitions.push({
        slug: groupSlug,
        name: router.name,
        description: router.description,
        hasIndex: !!router.index,
      })

      if (router.index) {
        pageHandlers.set(groupSlug, router.index)
      }

      for (const [slug, def] of Object.entries(router.routes)) {
        if (def instanceof Router) {
          walkRouter(`${groupSlug}/${slug}`, def)
        } else {
          actionDefinitions.push({
            groupSlug,
            slug,
            ...('handler' in def ? def : {}),
            handler: undefined,
          })

          actionHandlers.set(
            `${groupSlug}/${slug}`,
            'handler' in def ? def.handler : def
          )
        }
      }
    }

    if (this.#config.routes) {
      for (const [slug, def] of Object.entries(this.#config.routes)) {
        if (def instanceof Router) {
          walkRouter(slug, def)
        } else {
          actionDefinitions.push({
            slug,
            ...('handler' in def ? def : {}),
            handler: undefined,
          })
          actionHandlers.set(slug, 'handler' in def ? def.handler : def)
        }
      }
    }

    this.#routerDefinitions = routerDefinitions
    this.#actionDefinitions = actionDefinitions
    this.#actionHandlers = actionHandlers
    this.#pageHandlers = pageHandlers
  }

  get #log() {
    return this.#logger
  }

  #pageIOClients = new Map<string, IOClient>()
  #ioResponseHandlers = new Map<string, (value: T_IO_RESPONSE) => void>()
  #pendingIOCalls = new Map<string, string>()
  #transactionLoadingStates = new Map<string, LoadingState>()
  #transactionCompleteCallbacks = new Map<
    string,
    [(output?: any) => void, (err?: any) => void]
  >()
  #ws: ISocket | undefined = undefined
  #serverRpc:
    | DuplexRPCClient<typeof wsServerSchema, typeof hostSchema>
    | undefined = undefined
  #isConnected = false
  #isInitialized = false

  get isConnected() {
    return this.#isConnected
  }

  #reinitializeTimeout: NodeJS.Timeout | null = null

  handleActionsChange(config?: InternalConfig) {
    if (config !== undefined) {
      this.#config = config
    }

    if (this.#isInitialized && !this.#reinitializeTimeout) {
      this.#reinitializeTimeout = setTimeout(async () => {
        await this.#initializeHost()
        this.#reinitializeTimeout = null
      }, this.#reinitializeBatchTimeoutMs)
    }
  }

  async listen() {
    await this.initializeConnection()
    await this.#initializeHost()
  }

  private async initializeConnection() {
    await this.#createSocketConnection()
    this.#createRPCClient()
  }

  async respondToRequest(requestId: string) {
    if (!requestId) {
      throw new Error('Missing request ID')
    }

    if (!this.#ws) {
      await this.#createSocketConnection()
    }

    if (!this.#serverRpc) {
      this.#createRPCClient(requestId)
    }

    const result = new Promise((resolve, reject) => {
      this.#transactionCompleteCallbacks.set(requestId, [resolve, reject])
    })

    if (!this.#isInitialized) {
      await this.#initializeHost(requestId)
    }

    return await result
  }

  close() {
    this.#intentionallyClosed = true

    if (this.#serverRpc) {
      this.#serverRpc = undefined
    }

    if (this.#ws) {
      this.#ws.close()
      this.#ws = undefined
    }

    this.#isConnected = false
  }

  async declareHost(httpHostId: string) {
    this.#walkRoutes()

    const body: z.infer<typeof DECLARE_HOST['inputs']> = {
      httpHostId,
      actions: this.#actionDefinitions,
      groups: this.#routerDefinitions,
      sdkName: pkg.name,
      sdkVersion: pkg.version,
    }

    const response = await fetch(`${this.#httpEndpoint}/api/hosts/declare`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.#apiKey}`,
      },
      body: JSON.stringify(body),
    })
      .then(r => r.json())
      .then(r => DECLARE_HOST.returns.parseAsync(r))
      .catch(err => {
        this.#logger.debug(err)
        throw new IntervalError('Received invalid API response.')
      })

    if (response.type === 'error') {
      throw new IntervalError(
        `There was a problem declaring the host: ${response.message}`
      )
    }

    if (response.sdkAlert) {
      this.#log.handleSdkAlert(response.sdkAlert)
    }

    if (response.invalidSlugs.length > 0) {
      this.#log.warn('[Interval]', '⚠ Invalid slugs detected:\n')

      for (const slug of response.invalidSlugs) {
        this.#log.warn(`  - ${slug}`)
      }

      this.#log.warn(
        '\nAction slugs must contain only letters, numbers, underscores, periods, and hyphens.'
      )

      if (response.invalidSlugs.length === this.#actionDefinitions.length) {
        throw new IntervalError('No valid slugs provided')
      }
    }
  }

  /**
   * Resends pending IO calls upon reconnection.
   */
  async #resendPendingIOCalls() {
    if (!this.#isConnected) return

    const toResend = new Map(this.#pendingIOCalls)

    while (toResend.size > 0) {
      await Promise.allSettled(
        Array.from(toResend.entries()).map(([transactionId, ioCall]) =>
          this.#send('SEND_IO_CALL', {
            transactionId,
            ioCall,
          })
            .then(response => {
              toResend.delete(transactionId)

              if (!response) {
                // Unsuccessful response, don't try again
                this.#pendingIOCalls.delete(transactionId)
              }
            })
            .catch(async err => {
              if (err instanceof IOError) {
                this.#logger.error(
                  'Failed resending pending IO call: ',
                  err.kind
                )

                if (
                  err.kind === 'CANCELED' ||
                  err.kind === 'TRANSACTION_CLOSED'
                ) {
                  this.#logger.debug('Aborting resending pending IO call')
                  toResend.delete(transactionId)
                  this.#pendingIOCalls.delete(transactionId)
                  return
                }
              } else {
                this.#logger.debug('Failed resending pending IO call:', err)
              }

              this.#logger.debug(
                `Trying again in ${Math.round(
                  this.#retryIntervalMs / 1000
                )}s...`
              )
              await sleep(this.#retryIntervalMs)
            })
        )
      )
    }
  }

  /**
   * Resends pending transaction loading states upon reconnection.
   */
  async #resendTransactionLoadingStates() {
    if (!this.#isConnected) return

    const toResend = new Map(this.#transactionLoadingStates)

    while (toResend.size > 0) {
      await Promise.allSettled(
        Array.from(toResend.entries()).map(([transactionId, loadingState]) =>
          this.#send('SEND_LOADING_CALL', {
            transactionId,
            ...loadingState,
          })
            .then(response => {
              toResend.delete(transactionId)

              if (!response) {
                // Unsuccessful response, don't try again
                this.#transactionLoadingStates.delete(transactionId)
              }
            })
            .catch(async err => {
              if (err instanceof IOError) {
                this.#logger.error(
                  'Failed resending transaction loading state: ',
                  err.kind
                )

                if (
                  err.kind === 'CANCELED' ||
                  err.kind === 'TRANSACTION_CLOSED'
                ) {
                  this.#logger.debug(
                    'Aborting resending transaction loading state'
                  )
                  this.#transactionLoadingStates.delete(transactionId)
                  return
                }
              } else {
                this.#logger.debug('Failed resending pending IO call:', err)
              }

              this.#logger.debug(
                `Trying again in ${Math.round(
                  this.#retryIntervalMs / 1000
                )}s...`
              )
              await sleep(this.#retryIntervalMs)
            })
        )
      )
    }
  }

  async #findOrCreateGhostModeAccount() {
    let config = await localConfig.get()

    let ghostOrgId = config?.ghostOrgId

    if (!ghostOrgId) {
      const response = await fetch(
        this.#httpEndpoint + '/api/auth/ghost/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then(r => r.json())
        .then(r => CREATE_GHOST_MODE_ACCOUNT.returns.parseAsync(r))
        .catch(err => {
          this.#log.debug(err)
          throw new IntervalError('Received invalid API response.')
        })

      await localConfig.write({
        ghostOrgId: response.ghostOrgId,
      })

      ghostOrgId = response.ghostOrgId
    }

    return ghostOrgId
  }

  /**
   * Establishes the underlying ISocket connection to Interval.
   */
  async #createSocketConnection(connectConfig?: SetupConfig) {
    const id = connectConfig?.instanceId ?? v4()

    const headers: Record<string, string> = { 'x-instance-id': id }
    if (this.#apiKey) {
      headers['x-api-key'] = this.#apiKey
    } else if (!this.#apiKey) {
      this.#ghostOrgId = await this.#findOrCreateGhostModeAccount()
      headers['x-ghost-org-id'] = this.#ghostOrgId
    }

    const ws = new ISocket(
      new WebSocket(this.#endpoint, {
        headers,
        followRedirects: true,
      }),
      { id }
    )

    ws.onClose.attach(async ([code, reason]) => {
      if (this.#intentionallyClosed) {
        this.#intentionallyClosed = false
        return
      }

      this.#log.error(`❗ Could not connect to Interval (code ${code})`)

      if (reason) {
        this.#log.error('Reason:', reason)
      }

      if (this.#pingIntervalHandle) {
        clearInterval(this.#pingIntervalHandle)
        this.#pingIntervalHandle = undefined
      }
      // don't initialize retry process again if already started
      if (!this.#isConnected) return

      this.#log.prod('🔌 Reconnecting...')

      this.#isConnected = false

      while (!this.#isConnected) {
        this.#createSocketConnection({ instanceId: ws.id })
          .then(() => {
            this.#log.prod('⚡ Reconnection successful')
            this.#isConnected = true
            this.#resendPendingIOCalls()
            this.#resendTransactionLoadingStates()
          })
          .catch(() => {
            /* */
          })

        this.#log.prod(
          `Unable to connect. Retrying in ${Math.round(
            this.#retryIntervalMs / 1000
          )}s...`
        )
        await sleep(this.#retryIntervalMs)
      }
    })

    await ws.connect()

    this.#ws = ws
    this.#isConnected = true

    let lastSuccessfulPing = new Date()
    this.#pingIntervalHandle = setInterval(async () => {
      if (!this.#isConnected) {
        if (this.#pingIntervalHandle) {
          clearInterval(this.#pingIntervalHandle)
          this.#pingIntervalHandle = undefined
        }

        return
      }

      try {
        await ws.ping()
        lastSuccessfulPing = new Date()
      } catch (err) {
        this.#logger.warn('Pong not received in time')
        if (!(err instanceof TimeoutError)) {
          this.#logger.error(err)
        }

        if (
          lastSuccessfulPing.getTime() <
          new Date().getTime() - this.#closeUnresponsiveConnectionTimeoutMs
        ) {
          this.#logger.error(
            'No pong received in last three minutes, closing connection to Interval and retrying...'
          )
          if (this.#pingIntervalHandle) {
            clearInterval(this.#pingIntervalHandle)
            this.#pingIntervalHandle = undefined
          }
          ws.close()
        }
      }
    }, this.#pingIntervalMs)

    if (!this.#serverRpc) return

    this.#serverRpc.setCommunicator(ws)

    await this.#initializeHost()
  }

  /**
   * Creates the DuplexRPCClient responsible for sending
   * messages to Interval.
   */
  #createRPCClient(requestId?: string) {
    if (!this.#ws) {
      throw new Error('ISocket not initialized')
    }

    const serverRpc = new DuplexRPCClient({
      communicator: this.#ws,
      canCall: wsServerSchema,
      canRespondTo: hostSchema,
      handlers: {
        OPEN_PAGE: async inputs => {
          if (!this.organization) {
            this.#log.error('No organization defined')
            return { type: 'ERROR' as const }
          }

          const { pageKey } = inputs
          const appHandler = this.#pageHandlers.get(inputs.page.slug)

          this.#log.debug(appHandler)

          if (!appHandler) {
            this.#log.debug('No app handler called', inputs.page.slug)
            return { type: 'ERROR' as const }
          }

          let { params, paramsMeta } = inputs

          if (params && paramsMeta) {
            params = superjson.deserialize({
              json: params as JSONValue,
              meta: paramsMeta,
            })
          }
          const ctx: PageCtx = {
            user: inputs.user,
            params: deserializeDates(params),
            environment: inputs.environment,
            organization: this.organization,
            page: inputs.page,
          }

          let page: Layout
          let menuItems: InternalMenuItem[] | undefined = undefined
          let renderInstruction: T_IO_RENDER_INPUT | undefined = undefined

          const MAX_PAGE_RETRIES = 5

          const sendPage = async () => {
            if (page instanceof Basic) {
              const pageLayout: LayoutSchemaInput = {
                kind: 'BASIC',
                title:
                  page.title === undefined
                    ? undefined
                    : typeof page.title === 'string'
                    ? page.title
                    : null,
                description:
                  page.description === undefined
                    ? undefined
                    : typeof page.description === 'string'
                    ? page.description
                    : null,
                menuItems,
                children: renderInstruction,
              }

              if (page.metadata) {
                const items: MetaItemSchema[] = []
                for (const pageItem of page.metadata) {
                  let { label, value } = pageItem
                  if (typeof value === 'function' || value instanceof Promise) {
                    items.push({ label })
                  } else {
                    items.push({ label, value })
                  }
                }

                const { json, meta } = superjson.serialize(items)

                if (json) {
                  pageLayout.metadata = {
                    json: json as MetaItemSchema[],
                    meta,
                  } as MetaItemsSchema
                }
              }

              for (let i = 0; i < MAX_PAGE_RETRIES; i++) {
                try {
                  await this.#send('SEND_PAGE', {
                    pageKey,
                    page: JSON.stringify(pageLayout),
                  })
                  return
                } catch (err) {
                  this.#logger.debug('Failed sending page', err)
                  this.#logger.debug('Retrying in', this.#retryIntervalMs)
                  await sleep(this.#retryIntervalMs)
                }
              }

              throw new IntervalError(
                'Unsuccessful sending page, max retries exceeded.'
              )
            }
          }

          // What follows is a pretty convoluted way to coalesce
          // `scheduleSendPage` calls into non-clobbering/overlapping
          // `sendPage `calls. This can probably be simplified but I
          // can't think of a better way at the moment.

          // Tracks whether a send is currently in progress
          let sendPagePromise: Promise<void> | null = null

          // Keeps track of a brief timeout to coalesce rapid send calls
          let pageSendTimeout: NodeJS.Timeout | null = null

          // Tracks whether a new send needs to happen after the current one
          let newPageScheduled = false

          const processSendPage = () => {
            newPageScheduled = false
            pageSendTimeout = null
            sendPagePromise = sendPage()
              .catch(err => {
                this.#logger.error(
                  `Failed sending page with key ${pageKey}`,
                  err
                )
              })
              .finally(() => {
                sendPagePromise = null

                if (newPageScheduled) {
                  scheduleSendPage()
                }
              })
          }

          const scheduleSendPage = () => {
            newPageScheduled = true

            if (sendPagePromise) return
            if (pageSendTimeout) return

            pageSendTimeout = setTimeout(processSendPage, 0)
          }

          const client = new IOClient({
            logger: this.#logger,
            send: async instruction => {
              renderInstruction = instruction
              scheduleSendPage()
            },
            // onAddInlineAction: () => {
            //   const key = v4()
            //   this.#actionHandlers.set(key, handler)
            //   return key
            // },
          })

          const {
            io: { group, display },
          } = client

          this.#pageIOClients.set(pageKey, client)
          this.#ioResponseHandlers.set(pageKey, client.onResponse.bind(client))

          pageLocalStorage.run({ display, ctx }, () => {
            appHandler(display, ctx).then(res => {
              page = res

              if (typeof page.title === 'function') {
                page.title = page.title()
              }

              if (page.title instanceof Promise) {
                page.title.then(title => {
                  page.title = title
                  scheduleSendPage()
                })
              }

              if (page.description) {
                if (typeof page.description === 'function') {
                  page.description = page.description()
                }

                if (page.description instanceof Promise) {
                  page.description.then(description => {
                    page.description = description
                    scheduleSendPage()
                  })
                }
              }

              if (page.menuItems) {
                menuItems = page.menuItems.map(menuItem => {
                  // if (
                  //   'action' in menuItem &&
                  //   typeof menuItem['action'] === 'function'
                  // ) {
                  //   const inlineAction = client.addInlineAction(menuItem.action)
                  //   return {
                  //     ...menuItem,
                  //     inlineAction,
                  //   }
                  // }

                  return menuItem
                })
              }

              if (page instanceof Basic) {
                const { metadata } = page
                if (metadata) {
                  for (let i = 0; i < metadata.length; i++) {
                    let { value } = metadata[i]
                    if (typeof value === 'function') {
                      value = value()
                      metadata[i].value = value
                    }

                    if (value instanceof Promise) {
                      value.then(resolved => {
                        metadata[i].value = resolved
                        scheduleSendPage()
                      })
                    }
                  }
                }
              }

              if (page.children) {
                group(page.children).then(() => {
                  this.#logger.debug(
                    'Initial children render complete for pageKey',
                    pageKey
                  )
                })
              } else {
                scheduleSendPage()
              }
            })
          })

          return {
            type: 'SUCCESS' as const,
            pageKey,
          }
        },
        CLOSE_PAGE: async inputs => {
          const client = this.#pageIOClients.get(inputs.pageKey)
          if (client) {
            for (const key of client.inlineActionKeys.values()) {
              this.#actionHandlers.delete(key)
            }

            client.inlineActionKeys.clear()
            this.#pageIOClients.delete(inputs.pageKey)
          }

          this.#ioResponseHandlers.delete(inputs.pageKey)
        },
        START_TRANSACTION: async inputs => {
          if (!this.organization) {
            this.#log.error('No organization defined')
            return
          }

          const { action, transactionId } = inputs
          const actionHandler = this.#actionHandlers.get(action.slug)

          this.#log.debug(actionHandler)

          if (!actionHandler) {
            this.#log.debug('No actionHandler called', action.slug)
            return
          }

          const client = new IOClient({
            logger: this.#logger,
            send: async ioRenderInstruction => {
              const ioCall = JSON.stringify(ioRenderInstruction)
              this.#pendingIOCalls.set(transactionId, ioCall)

              await this.#send('SEND_IO_CALL', {
                transactionId,
                ioCall,
              })

              this.#transactionLoadingStates.delete(transactionId)
            },
            // onAddInlineAction: handler => {
            //   const key = v4()
            //   this.#actionHandlers.set(key, handler)
            //   return key
            // },
          })

          this.#ioResponseHandlers.set(
            transactionId,
            client.onResponse.bind(client)
          )

          // To maintain consistent ordering for logs despite network race conditions
          let logIndex = 0
          let { params, paramsMeta } = inputs

          if (params && paramsMeta) {
            params = superjson.deserialize({
              json: params as JSONValue,
              meta: paramsMeta,
            })
          }

          const ctx: ActionCtx = {
            user: inputs.user,
            // TODO: Remove this when all active SDKs support superjson
            params: deserializeDates(params),
            environment: inputs.environment,
            organization: this.organization,
            action,
            log: (...args) => this.#sendLog(transactionId, logIndex++, ...args),
            notify: async config => {
              await this.#interval.notify({
                ...config,
                transactionId: inputs.transactionId,
              })
            },
            loading: new TransactionLoadingState({
              logger: this.#logger,
              send: async loadingState => {
                this.#transactionLoadingStates.set(transactionId, loadingState)
                await this.#send('SEND_LOADING_CALL', {
                  transactionId,
                  ...loadingState,
                })
              },
            }),
            redirect: (props: LinkProps) =>
              this.#sendRedirect(transactionId, props),
          }

          const { io } = client

          actionLocalStorage.run({ io, ctx }, () => {
            actionHandler(client.io, ctx)
              .then(res => {
                // Allow actions to return data even after being canceled

                const { json, meta } = superjson.serialize(res)
                const result: ActionResultSchema = {
                  schemaVersion: TRANSACTION_RESULT_SCHEMA_VERSION,
                  status: 'SUCCESS',
                  data: (json as IOFunctionReturnType) ?? null,
                  meta,
                }

                return result
              })
              .catch(err => {
                // Action did not catch the cancellation error
                if (err instanceof IOError && err.kind === 'CANCELED') throw err

                this.#logger.error(err)

                const result: ActionResultSchema = {
                  schemaVersion: TRANSACTION_RESULT_SCHEMA_VERSION,
                  status: 'FAILURE',
                  data: err.message
                    ? { error: err.name, message: err.message }
                    : null,
                }

                return result
              })
              .then(async (res: ActionResultSchema) => {
                await this.#send('MARK_TRANSACTION_COMPLETE', {
                  transactionId,
                  result: JSON.stringify(res),
                })

                if (requestId) {
                  const callbacks =
                    this.#transactionCompleteCallbacks.get(requestId)
                  if (callbacks) {
                    const [resolve] = callbacks
                    resolve()
                  } else {
                    this.#log.debug(
                      'No transaction complete callbacks found for requestId',
                      requestId
                    )
                  }
                }
              })
              .catch(err => {
                if (err instanceof IOError) {
                  switch (err.kind) {
                    case 'CANCELED':
                      this.#log.prod(
                        'Transaction canceled for action',
                        action.slug
                      )
                      break
                    case 'TRANSACTION_CLOSED':
                      this.#log.prod(
                        'Attempted to make IO call after transaction already closed in action',
                        action.slug
                      )
                      break
                  }
                } else {
                  this.#log.error('Error sending action response', err)
                }

                if (requestId) {
                  const callbacks =
                    this.#transactionCompleteCallbacks.get(requestId)
                  if (callbacks) {
                    const [_, reject] = callbacks
                    reject(err)
                  } else {
                    this.#log.debug(
                      'No transaction complete callbacks found for requestId',
                      requestId
                    )
                  }
                }
              })
              .finally(() => {
                this.#pendingIOCalls.delete(transactionId)
                this.#transactionLoadingStates.delete(transactionId)
                this.#ioResponseHandlers.delete(transactionId)
                for (const key of client.inlineActionKeys.values()) {
                  this.#actionHandlers.delete(key)
                }
              })
          })

          return
        },
        IO_RESPONSE: async inputs => {
          this.#log.debug('got io response', inputs)

          try {
            const ioResp = IO_RESPONSE.parse(JSON.parse(inputs.value))
            const replyHandler = this.#ioResponseHandlers.get(
              ioResp.transactionId
            )

            if (!replyHandler) {
              this.#log.debug('Missing reply handler for', inputs.transactionId)
              return
            }

            replyHandler(ioResp)
          } catch (err) {
            if (err instanceof ZodError) {
              this.#log.error('Received invalid IO response:', inputs)
              this.#log.debug(err)
            } else {
              this.#log.error('Failed handling IO response:', err)
            }
          }
        },
      },
    })

    this.#serverRpc = serverRpc
  }

  /**
   * Sends the `INITIALIZE_HOST` RPC call to Interval,
   * declaring the actions that this host is responsible for handling.
   */
  async #initializeHost(requestId?: string) {
    if (!this.#ws) {
      throw new IntervalError('ISocket not initialized')
    }

    if (!this.#serverRpc) {
      throw new IntervalError('serverRpc not initialized')
    }

    const isInitialInitialization = !this.#isInitialized
    this.#isInitialized = true

    this.#walkRoutes()

    const response = await this.#send('INITIALIZE_HOST', {
      apiKey: this.#apiKey,
      actions: this.#actionDefinitions,
      groups: this.#routerDefinitions,
      sdkName: pkg.name,
      sdkVersion: pkg.version,
      requestId,
    })

    if (!response) {
      throw new IntervalError('Unknown error')
    }

    if (response.sdkAlert) {
      this.#log.handleSdkAlert(response.sdkAlert)
    }

    if (response.type === 'error') {
      throw new IntervalError(response.message)
    } else {
      if (response.invalidSlugs.length > 0) {
        this.#log.warn('[Interval]', '⚠ Invalid slugs detected:\n')

        for (const slug of response.invalidSlugs) {
          this.#log.warn(`  - ${slug}`)
        }

        this.#log.warn(
          '\nAction slugs must contain only letters, numbers, underscores, periods, and hyphens.'
        )
      }

      this.organization = response.organization
      this.environment = response.environment

      if (isInitialInitialization) {
        this.#log.prod(
          `🔗 Connected! Access your actions at: ${response.dashboardUrl}`
        )
        this.#log.debug('Host ID:', this.#ws.id)
      }
    }

    return response
  }

  async #send<MethodName extends keyof typeof wsServerSchema>(
    methodName: MethodName,
    inputs: z.input<typeof wsServerSchema[MethodName]['inputs']>
  ) {
    if (!this.#serverRpc) throw new IntervalError('serverRpc not initialized')

    while (true) {
      try {
        return await this.#serverRpc.send(methodName, inputs)
      } catch (err) {
        if (err instanceof TimeoutError) {
          this.#log.debug(
            `RPC call timed out, retrying in ${Math.round(
              this.#retryIntervalMs / 1000
            )}s...`
          )
          this.#log.debug(err)
          sleep(this.#retryIntervalMs)
        } else {
          throw err
        }
      }
    }
  }

  /**
   * This is used for testing and intentionally non-private.
   * Do not use unless you're absolutely sure what you're doing.
   */
  protected async __dangerousInternalSend(methodName: any, inputs: any) {
    if (!this.#serverRpc) throw new IntervalError('serverRpc not initialized')

    return await this.#serverRpc.send(methodName, inputs)
  }

  async #sendLog(transactionId: string, index: number, ...args: any[]) {
    if (!args.length) return

    let data = args
      .map(arg => {
        if (arg === undefined) return 'undefined'
        if (typeof arg === 'string') return arg
        return JSON.stringify(arg, undefined, 2)
      })
      .join(' ')

    if (data.length > 10_000) {
      data =
        data.slice(0, 10_000) +
        '...' +
        '\n^ Warning: 10k logline character limit reached.\nTo avoid this error, try separating your data into multiple ctx.log() calls.'
    }

    await this.#send('SEND_LOG', {
      transactionId,
      data,
      index,
      timestamp: new Date().valueOf(),
    }).catch(err => {
      this.#logger.error('Failed sending log to Interval', err)
    })
  }

  async #sendRedirect(transactionId: string, props: LinkProps) {
    const response = await this.#send('SEND_REDIRECT', {
      transactionId,
      ...props,
    })

    if (!response) {
      throw new IntervalError('Failed sending redirect')
    }
  }
}
