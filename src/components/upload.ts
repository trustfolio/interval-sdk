import path from 'path'
import fetch, { Response } from 'node-fetch'
import { IntervalError } from '..'
import { T_IO_PROPS, T_IO_RETURNS, T_IO_STATE } from '../ioSchema'

export function file({
  generatePreSignedUrl,
  ...props
}: Omit<T_IO_PROPS<'UPLOAD_FILE'>, 'isProvidingUrls'> & {
  generatePreSignedUrl?: (
    state: T_IO_STATE<'UPLOAD_FILE'>
  ) => Promise<{ uploadUrl: string; downloadUrl: string }>
}) {
  const isProvidingUrls = !!generatePreSignedUrl

  return {
    props: { ...props, isProvidingUrls },
    getValue({ url, ...response }: T_IO_RETURNS<'UPLOAD_FILE'>) {
      return {
        ...response,
        lastModified: new Date(response.lastModified),
        get extension(): string {
          return path.extname(response.name)
        },
        async url(): Promise<string> {
          return url
        },
        async text(): Promise<string> {
          return retryFetch(url).then(r => r.text())
        },
        async json(): Promise<any> {
          return retryFetch(url).then(r => r.json())
        },
        async buffer(): Promise<Buffer> {
          return retryFetch(url)
            .then(r => r.arrayBuffer())
            .then(arrayBuffer => Buffer.from(arrayBuffer))
        },
      }
    },
    async onStateChange(newState: T_IO_STATE<'UPLOAD_FILE'>) {
      if (!generatePreSignedUrl) {
        return { isProvidingUrls }
      }

      const urls = await generatePreSignedUrl(newState)

      return { ...urls, isProvidingUrls }
    },
  }
}

const MAX_RETRIES = 3

async function retryFetch(url: string): Promise<Response> {
  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      const r = await fetch(url)
      return r
    } catch (err) {
      if (i === MAX_RETRIES) {
        throw err
      }
    }
  }

  // This should never happen, final failing response err would be thrown above
  throw new IntervalError('Failed to fetch file.')
}
