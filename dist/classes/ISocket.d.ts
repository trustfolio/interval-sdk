import type { WebSocket as NodeWebSocket } from 'ws';
import { Evt } from 'evt';
export declare class TimeoutError extends Error {
}
export declare class NotConnectedError extends Error {
}
export interface ISocketConfig {
    connectTimeout?: number;
    sendTimeout?: number;
    pingTimeout?: number;
    id?: string;
}
/**
 * A relatively thin wrapper around an underlying WebSocket connection. Can be thought of as a TCP layer on top of WebSockets,
 * ISockets send and expect `ACK` messages following receipt of a `MESSAGE` message containing the transmitted data.
 * Can also ping its connected counterpart to determine if the
 * connection has been lost.
 *
 * @property connectTimeout - The number of ms that this ISocket will
 * wait to establish connection to its counterpart before rejecting
 * the `connect` Promise.
 * @property sendTimeout - The number of ms that this ISocket will
 * wait to receive an `ACK` response after sending a `MESSAGE`
 * before rejecting the `send` Promise.
 * @property pingTimeout - The number of ms that this ISocket will
 * wait to receive a `pong` after sending a `ping` before
 * rejecting the `ping` Promise.
 */
export default class ISocket {
    private ws;
    private connectTimeout;
    private sendTimeout;
    private pingTimeout;
    private isAuthenticated;
    private timeouts;
    onMessage: Evt<string>;
    onOpen: Evt<void>;
    onError: Evt<Error>;
    onClose: Evt<[number, string]>;
    onAuthenticated: Evt<void>;
    id: string;
    private pendingMessages;
    /** Client **/
    /**
     * Establishes an ISocket connection to the connected WebSocket
     * counterpart, throwing an error if connection is not established
     * within `connectTimeout`.
     */
    connect(): Promise<void>;
    /** Server **/
    confirmAuthentication(): Promise<void>;
    get isOpen(): boolean;
    /** Both **/
    /**
     * Send a `MESSAGE` containing data to the connected counterpart,
     * throwing an error if `ACK` is not received within `sendTimeout`.
     */
    send(data: string, options?: {
        timeoutFactor?: number;
    }): Promise<void>;
    /** Both **/
    /**
     * Close the underlying WebSocket connection, and this ISocket
     * connection.
     */
    close(code?: number, reason?: string): void;
    constructor(ws: WebSocket | NodeWebSocket, config?: ISocketConfig);
    get isPingSupported(): boolean;
    get readyState(): number;
    /** Both **/
    /**
     * Ping the connected counterpart, throwing a TimeoutError if a
     * `pong` is not received within `pingTimeout`.
     */
    ping(): Promise<void>;
}
