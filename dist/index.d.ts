import Routes from './classes/Routes';
import IOError from './classes/IOError';
import Logger, { LogLevel } from './classes/Logger';
import Page from './classes/Page';
import { ClientSchema, HostSchema, IceConfig } from './internalRpcSchema';
import { DuplexRPCHandlers } from './classes/DuplexRPCClient';
import { NotConnectedError, TimeoutError } from './classes/ISocket';
import { SerializableRecord } from './ioSchema';
import type { ActionCtx, ActionLogFn, IO, IntervalActionHandler, IntervalActionStore, NotifyConfig, IntervalRouteDefinitions, IntervalPageStore, PageCtx, IntervalActionDefinition, IntervalErrorHandler } from './types';
import IntervalError from './classes/IntervalError';
import IntervalClient from './classes/IntervalClient';
import Action from './classes/Action';
import { BasicLayout } from './classes/Layout';
export type { ActionCtx, ActionLogFn, IO, IntervalActionHandler, IntervalActionDefinition, IntervalActionStore, };
export interface InternalConfig {
    apiKey: string;
    endpoint: string;
    routes?: IntervalRouteDefinitions;
    routesDirectory?: string;
    actions?: Record<string, IntervalActionDefinition>;
    groups?: Record<string, Page>;
    logLevel?: LogLevel;
    retryIntervalMs?: number;
    retryChunkIntervalMs?: number;
    pingIntervalMs?: number;
    connectTimeoutMs?: number;
    sendTimeoutMs?: number;
    pingTimeoutMs?: number;
    maxResendAttempts?: number;
    completeHttpRequestDelayMs?: number;
    closeUnresponsiveConnectionTimeoutMs?: number;
    reinitializeBatchTimeoutMs?: number;
    onError?: IntervalErrorHandler;
    verboseMessageLogs?: boolean;
    getClientHandlers?: () => DuplexRPCHandlers<ClientSchema> | undefined;
    setHostHandlers?: (handlers: DuplexRPCHandlers<HostSchema>) => void;
}
export interface QueuedAction {
    id: string;
    assignee?: string;
    params?: SerializableRecord;
}
export declare function getActionStore(): IntervalActionStore;
export declare function getPageStore(): IntervalPageStore;
export declare function getSomeStore(): IntervalActionStore | IntervalPageStore;
export declare const io: IO;
export declare const ctx: ActionCtx & PageCtx;
export default class Interval {
    #private;
    config: InternalConfig;
    routes: Routes;
    constructor(config: InternalConfig);
    get actions(): Routes;
    protected get apiKey(): string | undefined;
    protected get httpEndpoint(): string;
    protected get log(): Logger;
    get isConnected(): boolean;
    /**
     * Establish the persistent connection to Interval.
     */
    listen(): Promise<void>;
    ping(): Promise<boolean>;
    /**
     * Immediately terminate the connection to interval, terminating any actions currently in progress.
     */
    immediatelyClose(): void | undefined;
    /**
     * Safely close the connection to Interval, preventing new actions from being launched and closing the persistent connection afterward. Resolves when the connection is successfully safely closed.
     */
    safelyClose(): Promise<void>;
    get client(): IntervalClient | undefined;
    fetchIceConfig(): Promise<IceConfig>;
    /**
     * Sends a custom notification to Interval users via email or Slack. To send Slack notifications, you'll need to connect your Slack workspace to the Interval app in your organization settings.
     *
     * **Usage:**
     *
     * ```typescript
     * await ctx.notify({
     *   message: "A charge of $500 was refunded",
     *   title: "Refund over threshold",
     *   delivery: [
     *     {
     *       to: "#interval-notifications",
     *       method: "SLACK",
     *     },
     *     {
     *       to: "foo@example.com",
     *     },
     *   ],
     * });
     * ```
     */
    notify(config: NotifyConfig): Promise<void>;
    /**
     * Enqueue an action to be completed, with an optional `assignee` email to assign the action to, and optional `params` which will be passed to the action as `ctx.params`. Assigned actions will be displayed in users' dashboards as a task list.
     */
    enqueue(slug: string, { assignee, params }?: Pick<QueuedAction, 'assignee' | 'params'>): Promise<QueuedAction>;
    /**
     * Dequeue a previously assigned action which was created with `interval.enqueue()`.
     */
    dequeue(id: string): Promise<QueuedAction>;
}
export { Interval, IOError, IntervalError, NotConnectedError, TimeoutError, Action, Page, BasicLayout as Layout, };
