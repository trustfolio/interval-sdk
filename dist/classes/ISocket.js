"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotConnectedError = exports.TimeoutError = void 0;
const evt_1 = require("evt");
const uuid_1 = require("uuid");
const zod_1 = require("zod");
const MESSAGE_META = zod_1.z.object({
    data: zod_1.z.any(),
    id: zod_1.z.string(),
    type: zod_1.z.union([zod_1.z.literal('ACK'), zod_1.z.literal('MESSAGE')]),
});
class TimeoutError extends Error {
}
exports.TimeoutError = TimeoutError;
class NotConnectedError extends Error {
}
exports.NotConnectedError = NotConnectedError;
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
class ISocket {
    /** Client **/
    /**
     * Establishes an ISocket connection to the connected WebSocket
     * counterpart, throwing an error if connection is not established
     * within `connectTimeout`.
     */
    async connect() {
        return new Promise((resolve, reject) => {
            if (this.isOpen && this.isAuthenticated) {
                return resolve();
            }
            const failTimeout = setTimeout(() => reject(new TimeoutError()), this.connectTimeout);
            this.timeouts.add(failTimeout);
            this.onAuthenticated.attach(() => {
                clearTimeout(failTimeout);
                this.timeouts.delete(failTimeout);
                return resolve();
            });
        });
    }
    /** Server **/
    async confirmAuthentication() {
        return this.send('authenticated');
    }
    get isOpen() {
        return this.ws.readyState === this.ws.OPEN;
    }
    /** Both **/
    /**
     * Send a `MESSAGE` containing data to the connected counterpart,
     * throwing an error if `ACK` is not received within `sendTimeout`.
     */
    async send(data, options = {}) {
        if (!this.isOpen)
            throw new NotConnectedError();
        return new Promise((resolve, reject) => {
            var _a;
            const id = (0, uuid_1.v4)();
            const failTimeout = setTimeout(() => {
                reject(new TimeoutError());
            }, this.sendTimeout * ((_a = options.timeoutFactor) !== null && _a !== void 0 ? _a : 1));
            this.timeouts.add(failTimeout);
            this.pendingMessages.set(id, {
                data,
                onAckReceived: () => {
                    clearTimeout(failTimeout);
                    this.timeouts.delete(failTimeout);
                    resolve();
                },
            });
            this.ws.send(JSON.stringify({ id, data, type: 'MESSAGE' }));
        });
    }
    /** Both **/
    /**
     * Close the underlying WebSocket connection, and this ISocket
     * connection.
     */
    close(code, reason) {
        this.onMessage.detach();
        return this.ws.close(code, reason);
    }
    constructor(ws, config) {
        // this works but on("error") does not. No idea why ¯\_(ツ)_/¯
        // will emit "closed" regardless
        // this.ws.addEventListener('error', e => {
        //   this.dispatchEvent(e)
        // })
        var _a, _b, _c;
        this.pendingMessages = new Map();
        this.onMessage = new evt_1.Evt();
        this.onOpen = new evt_1.Evt();
        this.onError = new evt_1.Evt();
        this.onClose = new evt_1.Evt();
        this.onAuthenticated = new evt_1.Evt();
        this.timeouts = new Set();
        this.ws = ws;
        this.id = (config === null || config === void 0 ? void 0 : config.id) || (0, uuid_1.v4)();
        this.connectTimeout = (_a = config === null || config === void 0 ? void 0 : config.connectTimeout) !== null && _a !== void 0 ? _a : 15000;
        this.sendTimeout = (_b = config === null || config === void 0 ? void 0 : config.sendTimeout) !== null && _b !== void 0 ? _b : 5000;
        this.pingTimeout = (_c = config === null || config === void 0 ? void 0 : config.pingTimeout) !== null && _c !== void 0 ? _c : 5000;
        this.isAuthenticated = false;
        this.onClose.attach(() => {
            for (const timeout of this.timeouts) {
                clearTimeout(timeout);
            }
            this.timeouts.clear();
        });
        this.ws.onopen = () => {
            this.onOpen.post();
        };
        this.ws.onclose = (ev) => {
            var _a, _b;
            this.onClose.post([(_a = ev === null || ev === void 0 ? void 0 : ev.code) !== null && _a !== void 0 ? _a : 0, (_b = ev === null || ev === void 0 ? void 0 : ev.reason) !== null && _b !== void 0 ? _b : 'Unknown']);
        };
        this.ws.onerror = (ev) => {
            const message = 'message' in ev ? ev.message : 'Unknown error';
            this.onError.post(new Error(message));
        };
        this.ws.onmessage = (evt) => {
            // only in browser
            if ('stopPropagation' in evt) {
                evt.stopPropagation();
            }
            if (!this.isOpen)
                return;
            const data = JSON.parse(evt.data.toString());
            const meta = MESSAGE_META.parse(data);
            if (meta.type === 'ACK') {
                const pm = this.pendingMessages.get(meta.id);
                if (pm) {
                    pm.onAckReceived();
                    this.pendingMessages.delete(meta.id);
                }
            }
            if (meta.type === 'MESSAGE') {
                ws.send(JSON.stringify({ type: 'ACK', id: meta.id }));
                if (meta.data === 'authenticated') {
                    this.isAuthenticated = true;
                    this.onAuthenticated.post();
                }
                else if (meta.data === 'ping') {
                    // do nothing
                }
                else {
                    this.onMessage.post(meta.data);
                }
            }
        };
        if ('pong' in ws) {
            ws.on('pong', buf => {
                const id = buf.toString();
                const pm = this.pendingMessages.get(id);
                if ((pm === null || pm === void 0 ? void 0 : pm.data) === 'ping') {
                    pm.onAckReceived();
                }
            });
        }
    }
    get isPingSupported() {
        return 'ping' in this.ws;
    }
    get readyState() {
        return this.ws.readyState;
    }
    /** Both **/
    /**
     * Ping the connected counterpart, throwing a TimeoutError if a
     * `pong` is not received within `pingTimeout`.
     */
    async ping() {
        if (!this.isOpen)
            throw new NotConnectedError();
        const ws = this.ws;
        return new Promise((resolve, reject) => {
            const pongTimeout = setTimeout(() => reject(new TimeoutError('Pong not received in time')), this.pingTimeout);
            this.timeouts.add(pongTimeout);
            const id = (0, uuid_1.v4)();
            this.pendingMessages.set(id, {
                data: 'ping',
                onAckReceived: () => {
                    clearTimeout(pongTimeout);
                    this.timeouts.delete(pongTimeout);
                    resolve();
                },
            });
            if ('ping' in ws) {
                ws.ping(id, undefined, err => {
                    if (err) {
                        reject(err);
                    }
                });
            }
            else {
                ws.send(JSON.stringify({ type: 'MESSAGE', id, data: 'ping' }));
            }
        });
    }
}
exports.default = ISocket;
