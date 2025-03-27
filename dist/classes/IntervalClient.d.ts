/// <reference types="node" />
import { ActionEnvironment } from '../internalRpcSchema';
import type { IntervalActionStore, IntervalPageStore } from '../types';
import { Interval, InternalConfig } from '..';
import type { AsyncLocalStorage } from 'async_hooks';
declare let actionLocalStorage: AsyncLocalStorage<IntervalActionStore> | undefined;
declare let pageLocalStorage: AsyncLocalStorage<IntervalPageStore> | undefined;
export { actionLocalStorage, pageLocalStorage };
export declare function getHttpEndpoint(wsEndpoint: string): string;
export declare const sleep: (ms: number) => Promise<unknown>;
export default class IntervalClient {
    #private;
    organization: {
        name: string;
        slug: string;
    } | undefined;
    environment: ActionEnvironment | undefined;
    constructor(interval: Interval, config: InternalConfig);
    get isConnected(): boolean;
    handleActionsChange(config?: InternalConfig): void;
    listen(): Promise<void>;
    private initializeConnection;
    respondToRequest(requestId: string): Promise<unknown>;
    immediatelyClose(): void;
    safelyClose(): Promise<void>;
    declareHost(httpHostId: string): Promise<void>;
    ping(): Promise<boolean>;
    /**
     * This is used for testing and intentionally non-private.
     * Do not use unless you're absolutely sure what you're doing.
     */
    protected __dangerousInternalSend(methodName: any, inputs: any): Promise<any>;
}
