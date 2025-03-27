"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DuplexRPCClient_retryChunkIntervalMs;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplexRPCClient = void 0;
const zod_1 = require("zod");
const evt_1 = require("evt");
const internalRpcSchema_1 = require("../internalRpcSchema");
const IntervalClient_1 = require("./IntervalClient");
const ISocket_1 = require("./ISocket");
let count = 0;
function generateId() {
    count = count + 1;
    return count.toString();
}
/**
 * Responsible for making RPC calls to another DuplexRPCClient.
 * Can send messages from CallerSchema and respond to messages
 * from ResponderSchema.
 *
 * @property communicator - The ISocket instance responsible for
 * sending the RPC messages.
 * @property handlers - Defines the actions taken when receiving
 * a given message, an object keyed by the message schema key.
 */
class DuplexRPCClient {
    constructor({ communicator, canCall, canRespondTo, handlers, retryChunkIntervalMs, }) {
        this.pendingCalls = new Map();
        this.messageChunks = new Map();
        _DuplexRPCClient_retryChunkIntervalMs.set(this, 100);
        this.communicator = communicator;
        this.communicator.onMessage.attach(this.onmessage.bind(this));
        this.canCall = canCall;
        this.canRespondTo = canRespondTo;
        this.handlers = handlers;
        this.onMessageReceived = new evt_1.Evt();
        if (retryChunkIntervalMs && retryChunkIntervalMs > 0) {
            __classPrivateFieldSet(this, _DuplexRPCClient_retryChunkIntervalMs, retryChunkIntervalMs, "f");
        }
    }
    packageResponse({ id, methodName, data, }) {
        const preparedResponseText = {
            id: id,
            kind: 'RESPONSE',
            methodName: methodName,
            data,
        };
        return JSON.stringify(preparedResponseText);
    }
    packageCall({ id, methodName, data, }) {
        const callerData = {
            id,
            kind: 'CALL',
            data,
            methodName: methodName, // ??
        };
        return JSON.stringify(callerData);
    }
    setCommunicator(newCommunicator) {
        this.communicator.onMessage.detach();
        this.communicator = newCommunicator;
        this.communicator.onMessage.attach(this.onmessage.bind(this));
    }
    handleReceivedResponse(parsed) {
        const onReplyFn = this.pendingCalls.get(parsed.id);
        if (!onReplyFn)
            return;
        onReplyFn(parsed.data);
        this.pendingCalls.delete(parsed.id);
    }
    async handleReceivedCall(parsed) {
        const methodName = parsed.methodName;
        const method = this.canRespondTo[methodName];
        if (!method) {
            throw new Error(`There is no method for ${parsed.methodName}`);
        }
        // struggling to get real inference here
        const inputs = method.inputs.parse(parsed.data);
        const handler = this.handlers[methodName];
        const returnValue = await handler(inputs);
        const preparedResponseText = this.packageResponse({
            id: parsed.id,
            methodName: methodName,
            data: returnValue,
        });
        try {
            await this.communicator.send(preparedResponseText);
        }
        catch (err) {
            console.error('Failed sending response', preparedResponseText, err);
        }
        return;
    }
    async onmessage(data) {
        const txt = data;
        try {
            let inputParsed = internalRpcSchema_1.DUPLEX_MESSAGE_SCHEMA.parse(JSON.parse(txt));
            this.onMessageReceived.post(inputParsed);
            if (inputParsed.kind === 'CALL') {
                try {
                    await this.handleReceivedCall(inputParsed);
                }
                catch (err) {
                    if (err instanceof zod_1.ZodError) {
                        console.error('[DuplexRPCClient] Received invalid call:', inputParsed);
                    }
                    else {
                        console.error('[DuplexRPCClient] Failed handling call: ', inputParsed);
                    }
                    console.error(err);
                }
            }
            else if (inputParsed.kind === 'RESPONSE') {
                try {
                    this.handleReceivedResponse(inputParsed);
                }
                catch (err) {
                    if (err instanceof zod_1.ZodError) {
                        console.error('[DuplexRPCClient] Received invalid response:', inputParsed);
                    }
                    else {
                        console.error('[DuplexRPCClient] Failed handling response: ', inputParsed);
                    }
                    console.error(err);
                }
            }
        }
        catch (err) {
            console.error('[DuplexRPCClient] Received invalid message:', data);
            console.error(err);
        }
    }
    async send(methodName, inputs, options = {}) {
        const id = generateId();
        const msg = this.packageCall({
            id,
            data: inputs,
            methodName: methodName, // ??
        });
        return new Promise((resolve, reject) => {
            this.pendingCalls.set(id, (rawResponseText) => {
                try {
                    const parsed = this.canCall[methodName]['returns'].parse(rawResponseText);
                    return resolve(parsed);
                }
                catch (err) {
                    reject(err);
                }
            });
            if (Array.isArray(msg)) {
                Promise.allSettled(msg.map(async (chunk) => {
                    const NUM_TRIES_PER_CHUNK = 3;
                    // If a chunk times out, retry it a few times
                    for (let i = 0; i <= NUM_TRIES_PER_CHUNK; i++) {
                        try {
                            return await this.communicator.send(chunk);
                        }
                        catch (err) {
                            if (err instanceof ISocket_1.TimeoutError) {
                                // console.debug(
                                //   `Chunk timed out, retrying in ${
                                //     this.#retryChunkIntervalMs
                                //   }ms...`
                                // )
                                await (0, IntervalClient_1.sleep)(__classPrivateFieldGet(this, _DuplexRPCClient_retryChunkIntervalMs, "f"));
                            }
                            else {
                                throw err;
                            }
                        }
                    }
                    throw new ISocket_1.TimeoutError();
                })).then(responses => {
                    // reject the first failed promise, if any
                    for (const response of responses) {
                        if (response.status === 'rejected') {
                            reject(response.reason);
                        }
                    }
                });
            }
            else {
                this.communicator.send(msg, options).catch(err => {
                    reject(err);
                });
            }
        });
    }
}
exports.DuplexRPCClient = DuplexRPCClient;
_DuplexRPCClient_retryChunkIntervalMs = new WeakMap();
