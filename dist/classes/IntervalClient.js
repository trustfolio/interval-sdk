"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _IntervalClient_instances, _IntervalClient_interval, _IntervalClient_apiKey, _IntervalClient_endpoint, _IntervalClient_httpEndpoint, _IntervalClient_logger, _IntervalClient_completeHttpRequestDelayMs, _IntervalClient_completeShutdownDelayMs, _IntervalClient_retryIntervalMs, _IntervalClient_maxResendAttempts, _IntervalClient_pingIntervalMs, _IntervalClient_closeUnresponsiveConnectionTimeoutMs, _IntervalClient_reinitializeBatchTimeoutMs, _IntervalClient_pingIntervalHandle, _IntervalClient_intentionallyClosed, _IntervalClient_resolveShutdown, _IntervalClient_config, _IntervalClient_routes, _IntervalClient_actionDefinitions, _IntervalClient_pageDefinitions, _IntervalClient_actionHandlers, _IntervalClient_pageHandlers, _IntervalClient_verboseMessageLogs, _IntervalClient_onError, _IntervalClient_walkRoutes, _IntervalClient_log_get, _IntervalClient_ioClients, _IntervalClient_ioResponseHandlers, _IntervalClient_pendingIOCalls, _IntervalClient_openPages, _IntervalClient_pendingPageLayouts, _IntervalClient_transactionLoadingStates, _IntervalClient_httpRequestCompleteCallbacks, _IntervalClient_ws, _IntervalClient_serverRpc, _IntervalClient_isInitialized, _IntervalClient_isReconnecting, _IntervalClient_reinitializeTimeout, _IntervalClient_resendPendingIOCalls, _IntervalClient_resendPendingPageLayouts, _IntervalClient_resendTransactionLoadingStates, _IntervalClient_closeTransaction, _IntervalClient_createSocketConnection, _IntervalClient_createRPCHandlers, _IntervalClient_createRPCClient, _IntervalClient_initializeHost, _IntervalClient_send, _IntervalClient_sendLog, _IntervalClient_sendRedirect;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.getHttpEndpoint = exports.pageLocalStorage = exports.actionLocalStorage = void 0;
const zod_1 = require("zod");
const uuid_1 = require("uuid");
const ws_1 = require("ws");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const superjson_1 = __importDefault(require("../utils/superjson"));
const ISocket_1 = __importStar(require("./ISocket"));
const DuplexRPCClient_1 = require("./DuplexRPCClient");
const IOError_1 = __importDefault(require("./IOError"));
const Logger_1 = __importDefault(require("./Logger"));
const internalRpcSchema_1 = require("../internalRpcSchema");
const ioSchema_1 = require("../ioSchema");
const IOClient_1 = require("./IOClient");
const pkg = __importStar(require("../../package.json"));
const deserialize_1 = require("../utils/deserialize");
const TransactionLoadingState_1 = __importDefault(require("./TransactionLoadingState"));
const __1 = require("..");
const Page_1 = __importDefault(require("./Page"));
const Action_1 = __importDefault(require("./Action"));
const Layout_1 = require("./Layout");
let actionLocalStorage;
exports.actionLocalStorage = actionLocalStorage;
let pageLocalStorage;
exports.pageLocalStorage = pageLocalStorage;
async function initAsyncLocalStorage() {
    try {
        if (typeof window === 'undefined') {
            const { default: { AsyncLocalStorage }, } = await Promise.resolve().then(() => __importStar(require('async_hooks')));
            exports.actionLocalStorage = actionLocalStorage = new AsyncLocalStorage();
            exports.pageLocalStorage = pageLocalStorage = new AsyncLocalStorage();
        }
    }
    catch (err) {
        console.error('Failed initializing AsyncLocalStorage stores');
    }
}
initAsyncLocalStorage();
function getHttpEndpoint(wsEndpoint) {
    const url = new URL(wsEndpoint);
    url.protocol = url.protocol.replace('ws', 'http');
    url.pathname = '';
    const str = url.toString();
    return str.endsWith('/') ? str.slice(0, -1) : str;
}
exports.getHttpEndpoint = getHttpEndpoint;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.sleep = sleep;
class IntervalClient {
    constructor(interval, config) {
        _IntervalClient_instances.add(this);
        _IntervalClient_interval.set(this, void 0);
        _IntervalClient_apiKey.set(this, void 0);
        _IntervalClient_endpoint.set(this, void 0);
        _IntervalClient_httpEndpoint.set(this, void 0);
        _IntervalClient_logger.set(this, void 0);
        _IntervalClient_completeHttpRequestDelayMs.set(this, 3000);
        _IntervalClient_completeShutdownDelayMs.set(this, 3000);
        _IntervalClient_retryIntervalMs.set(this, 3000);
        _IntervalClient_maxResendAttempts.set(this, 10);
        _IntervalClient_pingIntervalMs.set(this, 30000);
        _IntervalClient_closeUnresponsiveConnectionTimeoutMs.set(this, 3 * 60 * 1000); // 3 minutes
        _IntervalClient_reinitializeBatchTimeoutMs.set(this, 200);
        _IntervalClient_pingIntervalHandle.set(this, void 0);
        _IntervalClient_intentionallyClosed.set(this, false);
        _IntervalClient_resolveShutdown.set(this, void 0);
        _IntervalClient_config.set(this, void 0);
        _IntervalClient_routes.set(this, new Map());
        _IntervalClient_actionDefinitions.set(this, []);
        _IntervalClient_pageDefinitions.set(this, []);
        _IntervalClient_actionHandlers.set(this, new Map());
        _IntervalClient_pageHandlers.set(this, new Map());
        _IntervalClient_verboseMessageLogs.set(this, false);
        _IntervalClient_onError.set(this, void 0);
        _IntervalClient_ioClients.set(this, new Map());
        _IntervalClient_ioResponseHandlers.set(this, new Map());
        _IntervalClient_pendingIOCalls.set(this, new Map());
        _IntervalClient_openPages.set(this, new Set());
        _IntervalClient_pendingPageLayouts.set(this, new Map());
        _IntervalClient_transactionLoadingStates.set(this, new Map());
        _IntervalClient_httpRequestCompleteCallbacks.set(this, new Map());
        _IntervalClient_ws.set(this, undefined);
        _IntervalClient_serverRpc.set(this, undefined);
        _IntervalClient_isInitialized.set(this, false);
        _IntervalClient_isReconnecting.set(this, false);
        _IntervalClient_reinitializeTimeout.set(this, null);
        __classPrivateFieldSet(this, _IntervalClient_interval, interval, "f");
        __classPrivateFieldSet(this, _IntervalClient_apiKey, config.apiKey, "f");
        __classPrivateFieldSet(this, _IntervalClient_logger, new Logger_1.default(config.logLevel), "f");
        __classPrivateFieldSet(this, _IntervalClient_config, config, "f");
        __classPrivateFieldSet(this, _IntervalClient_endpoint, config.endpoint, "f");
        if (config.retryIntervalMs && config.retryIntervalMs > 0) {
            __classPrivateFieldSet(this, _IntervalClient_retryIntervalMs, config.retryIntervalMs, "f");
        }
        if (config.pingIntervalMs && config.pingIntervalMs > 0) {
            __classPrivateFieldSet(this, _IntervalClient_pingIntervalMs, config.pingIntervalMs, "f");
        }
        if (config.closeUnresponsiveConnectionTimeoutMs &&
            config.closeUnresponsiveConnectionTimeoutMs > 0) {
            __classPrivateFieldSet(this, _IntervalClient_closeUnresponsiveConnectionTimeoutMs, config.closeUnresponsiveConnectionTimeoutMs, "f");
        }
        if (config.reinitializeBatchTimeoutMs &&
            config.reinitializeBatchTimeoutMs > 0) {
            __classPrivateFieldSet(this, _IntervalClient_reinitializeBatchTimeoutMs, config.reinitializeBatchTimeoutMs, "f");
        }
        if (config.completeHttpRequestDelayMs &&
            config.completeHttpRequestDelayMs > 0) {
            __classPrivateFieldSet(this, _IntervalClient_completeHttpRequestDelayMs, config.completeHttpRequestDelayMs, "f");
        }
        if (config.maxResendAttempts && config.maxResendAttempts > 0) {
            __classPrivateFieldSet(this, _IntervalClient_maxResendAttempts, config.maxResendAttempts, "f");
        }
        __classPrivateFieldSet(this, _IntervalClient_httpEndpoint, getHttpEndpoint(__classPrivateFieldGet(this, _IntervalClient_endpoint, "f")), "f");
        if (config.setHostHandlers) {
            config.setHostHandlers(__classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_createRPCHandlers).call(this));
        }
        if (config.onError) {
            __classPrivateFieldSet(this, _IntervalClient_onError, config.onError, "f");
        }
        if (config.verboseMessageLogs) {
            __classPrivateFieldSet(this, _IntervalClient_verboseMessageLogs, config.verboseMessageLogs, "f");
        }
    }
    get isConnected() {
        var _a, _b;
        return (_b = (_a = __classPrivateFieldGet(this, _IntervalClient_ws, "f")) === null || _a === void 0 ? void 0 : _a.isOpen) !== null && _b !== void 0 ? _b : false;
    }
    handleActionsChange(config) {
        if (config !== undefined) {
            __classPrivateFieldSet(this, _IntervalClient_config, config, "f");
        }
        if (__classPrivateFieldGet(this, _IntervalClient_isInitialized, "f") && !__classPrivateFieldGet(this, _IntervalClient_reinitializeTimeout, "f")) {
            __classPrivateFieldSet(this, _IntervalClient_reinitializeTimeout, setTimeout(async () => {
                try {
                    await __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_initializeHost).call(this);
                }
                catch (err) {
                    __classPrivateFieldGet(this, _IntervalClient_logger, "f").error('Failed to reinitialize on routes change', err);
                }
                finally {
                    __classPrivateFieldSet(this, _IntervalClient_reinitializeTimeout, null, "f");
                }
            }, __classPrivateFieldGet(this, _IntervalClient_reinitializeBatchTimeoutMs, "f")), "f");
        }
    }
    async listen() {
        if (__classPrivateFieldGet(this, _IntervalClient_config, "f").setHostHandlers && __classPrivateFieldGet(this, _IntervalClient_config, "f").getClientHandlers) {
            // in browser demo mode, we don't need to initialize the connection
            this.organization = {
                name: 'Demo Organization',
                slug: 'demo',
            };
            this.environment = 'development';
            await __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_walkRoutes).call(this);
            const isInitialInitialization = !__classPrivateFieldGet(this, _IntervalClient_isInitialized, "f");
            __classPrivateFieldSet(this, _IntervalClient_isInitialized, true, "f");
            if (isInitialInitialization) {
                __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).prod(`🔗 Connected! Access your actions within the demo dashboard nearby.`);
            }
        }
        else {
            await this.initializeConnection();
            await __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_initializeHost).call(this);
        }
    }
    async initializeConnection() {
        await __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_createSocketConnection).call(this);
        __classPrivateFieldSet(this, _IntervalClient_serverRpc, __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_createRPCClient).call(this, {
            canCall: internalRpcSchema_1.wsServerSchema,
        }), "f");
    }
    async respondToRequest(requestId) {
        if (!requestId) {
            throw new Error('Missing request ID');
        }
        if (!__classPrivateFieldGet(this, _IntervalClient_ws, "f")) {
            await __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_createSocketConnection).call(this);
        }
        if (!__classPrivateFieldGet(this, _IntervalClient_serverRpc, "f")) {
            __classPrivateFieldSet(this, _IntervalClient_serverRpc, __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_createRPCClient).call(this, {
                requestId,
                canCall: internalRpcSchema_1.wsServerSchema,
            }), "f");
        }
        const result = new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _IntervalClient_httpRequestCompleteCallbacks, "f").set(requestId, [resolve, reject]);
        });
        if (!__classPrivateFieldGet(this, _IntervalClient_isInitialized, "f")) {
            await __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_initializeHost).call(this, requestId);
        }
        return await result;
    }
    immediatelyClose() {
        __classPrivateFieldSet(this, _IntervalClient_resolveShutdown, undefined, "f");
        __classPrivateFieldSet(this, _IntervalClient_intentionallyClosed, true, "f");
        if (__classPrivateFieldGet(this, _IntervalClient_serverRpc, "f")) {
            __classPrivateFieldSet(this, _IntervalClient_serverRpc, undefined, "f");
        }
        if (__classPrivateFieldGet(this, _IntervalClient_ws, "f")) {
            __classPrivateFieldGet(this, _IntervalClient_ws, "f").close();
            __classPrivateFieldSet(this, _IntervalClient_ws, undefined, "f");
        }
    }
    async safelyClose() {
        var _a;
        const response = await __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_send).call(this, 'BEGIN_HOST_SHUTDOWN', {});
        if (response.type === 'error') {
            throw new __1.IntervalError((_a = response.message) !== null && _a !== void 0 ? _a : 'Unknown error sending shutdown request.');
        }
        if (__classPrivateFieldGet(this, _IntervalClient_ioResponseHandlers, "f").size === 0) {
            this.immediatelyClose();
            return;
        }
        return new Promise(resolve => {
            __classPrivateFieldSet(this, _IntervalClient_resolveShutdown, resolve, "f");
        }).then(() => {
            // doing this here and in #close just to be extra sure
            // it's not missed in any future code paths
            __classPrivateFieldSet(this, _IntervalClient_resolveShutdown, undefined, "f");
            this.immediatelyClose();
        });
    }
    async declareHost(httpHostId) {
        await __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_walkRoutes).call(this);
        const body = {
            httpHostId,
            actions: __classPrivateFieldGet(this, _IntervalClient_actionDefinitions, "f"),
            groups: __classPrivateFieldGet(this, _IntervalClient_pageDefinitions, "f"),
            sdkName: pkg.name,
            sdkVersion: pkg.version,
        };
        const response = await (0, cross_fetch_1.default)(`${__classPrivateFieldGet(this, _IntervalClient_httpEndpoint, "f")}/api/hosts/declare`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${__classPrivateFieldGet(this, _IntervalClient_apiKey, "f")}`,
            },
            body: JSON.stringify(body),
        })
            .then(r => r.json())
            .then(r => internalRpcSchema_1.DECLARE_HOST.returns.parseAsync(r))
            .catch(err => {
            __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug(err);
            throw new __1.IntervalError('Received invalid API response.');
        });
        if (response.type === 'error') {
            throw new __1.IntervalError(`There was a problem declaring the host: ${response.message}`);
        }
        if (response.sdkAlert) {
            __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).handleSdkAlert(response.sdkAlert);
        }
        if (response.warnings.length) {
            for (const warning of response.warnings) {
                __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).warn(warning);
            }
        }
        if (response.invalidSlugs.length > 0) {
            __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).warn('[Interval]', '⚠ Invalid slugs detected:\n');
            for (const slug of response.invalidSlugs) {
                __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).warn(`  - ${slug}`);
            }
            __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).warn('\nAction slugs must contain only letters, numbers, underscores, periods, and hyphens.');
            if (response.invalidSlugs.length === __classPrivateFieldGet(this, _IntervalClient_actionDefinitions, "f").length) {
                throw new __1.IntervalError('No valid slugs provided');
            }
        }
    }
    async ping() {
        if (!__classPrivateFieldGet(this, _IntervalClient_ws, "f"))
            throw new ISocket_1.NotConnectedError();
        await __classPrivateFieldGet(this, _IntervalClient_ws, "f").ping();
        return true;
    }
    /**
     * This is used for testing and intentionally non-private.
     * Do not use unless you're absolutely sure what you're doing.
     */
    async __dangerousInternalSend(methodName, inputs) {
        if (!__classPrivateFieldGet(this, _IntervalClient_serverRpc, "f"))
            throw new __1.IntervalError('serverRpc not initialized');
        return await __classPrivateFieldGet(this, _IntervalClient_serverRpc, "f").send(methodName, inputs);
    }
}
exports.default = IntervalClient;
_IntervalClient_interval = new WeakMap(), _IntervalClient_apiKey = new WeakMap(), _IntervalClient_endpoint = new WeakMap(), _IntervalClient_httpEndpoint = new WeakMap(), _IntervalClient_logger = new WeakMap(), _IntervalClient_completeHttpRequestDelayMs = new WeakMap(), _IntervalClient_completeShutdownDelayMs = new WeakMap(), _IntervalClient_retryIntervalMs = new WeakMap(), _IntervalClient_maxResendAttempts = new WeakMap(), _IntervalClient_pingIntervalMs = new WeakMap(), _IntervalClient_closeUnresponsiveConnectionTimeoutMs = new WeakMap(), _IntervalClient_reinitializeBatchTimeoutMs = new WeakMap(), _IntervalClient_pingIntervalHandle = new WeakMap(), _IntervalClient_intentionallyClosed = new WeakMap(), _IntervalClient_resolveShutdown = new WeakMap(), _IntervalClient_config = new WeakMap(), _IntervalClient_routes = new WeakMap(), _IntervalClient_actionDefinitions = new WeakMap(), _IntervalClient_pageDefinitions = new WeakMap(), _IntervalClient_actionHandlers = new WeakMap(), _IntervalClient_pageHandlers = new WeakMap(), _IntervalClient_verboseMessageLogs = new WeakMap(), _IntervalClient_onError = new WeakMap(), _IntervalClient_ioClients = new WeakMap(), _IntervalClient_ioResponseHandlers = new WeakMap(), _IntervalClient_pendingIOCalls = new WeakMap(), _IntervalClient_openPages = new WeakMap(), _IntervalClient_pendingPageLayouts = new WeakMap(), _IntervalClient_transactionLoadingStates = new WeakMap(), _IntervalClient_httpRequestCompleteCallbacks = new WeakMap(), _IntervalClient_ws = new WeakMap(), _IntervalClient_serverRpc = new WeakMap(), _IntervalClient_isInitialized = new WeakMap(), _IntervalClient_isReconnecting = new WeakMap(), _IntervalClient_reinitializeTimeout = new WeakMap(), _IntervalClient_instances = new WeakSet(), _IntervalClient_walkRoutes = async function _IntervalClient_walkRoutes() {
    const routes = new Map();
    const pageDefinitions = [];
    const actionDefinitions = [];
    const actionHandlers = new Map();
    const pageHandlers = new Map();
    function walkRouter(groupSlug, page) {
        routes.set(groupSlug, page);
        pageDefinitions.push({
            slug: groupSlug,
            name: page.name,
            description: page.description,
            hasHandler: !!page.handler,
            unlisted: page.unlisted,
            access: page.access,
        });
        if (page.handler) {
            pageHandlers.set(groupSlug, page.handler);
        }
        for (let [slug, def] of Object.entries(page.routes)) {
            if (def instanceof Page_1.default) {
                walkRouter(`${groupSlug}/${slug}`, def);
            }
            else {
                const fullSlug = `${groupSlug}/${slug}`;
                if (!(def instanceof Action_1.default)) {
                    def = new Action_1.default(def);
                    routes.set(fullSlug, def);
                }
                actionDefinitions.push({
                    groupSlug,
                    slug,
                    ...def,
                    handler: undefined,
                });
                actionHandlers.set(fullSlug, def.handler);
            }
        }
    }
    let fileSystemRoutes;
    if (typeof window === 'undefined' && __classPrivateFieldGet(this, _IntervalClient_config, "f").routesDirectory) {
        try {
            const { loadRoutesFromFileSystem } = await Promise.resolve().then(() => __importStar(require('../utils/fileActionLoader')));
            fileSystemRoutes = await loadRoutesFromFileSystem(__classPrivateFieldGet(this, _IntervalClient_config, "f").routesDirectory, __classPrivateFieldGet(this, _IntervalClient_logger, "f"));
        }
        catch (err) {
            __classPrivateFieldGet(this, _IntervalClient_logger, "f").error(`Failed loading routes from filesystem at ${__classPrivateFieldGet(this, _IntervalClient_config, "f").routesDirectory}`, err);
        }
    }
    const allRoutes = {
        ...__classPrivateFieldGet(this, _IntervalClient_config, "f").actions,
        ...__classPrivateFieldGet(this, _IntervalClient_config, "f").groups,
        ...fileSystemRoutes,
        ...__classPrivateFieldGet(this, _IntervalClient_config, "f").routes,
    };
    for (let [slug, def] of Object.entries(allRoutes)) {
        if (def instanceof Page_1.default) {
            walkRouter(slug, def);
        }
        else {
            if (!(def instanceof Action_1.default)) {
                def = new Action_1.default(def);
            }
            actionDefinitions.push({
                slug,
                ...def,
                handler: undefined,
            });
            routes.set(slug, def);
            actionHandlers.set(slug, def.handler);
        }
    }
    __classPrivateFieldSet(this, _IntervalClient_routes, routes, "f");
    __classPrivateFieldSet(this, _IntervalClient_pageDefinitions, pageDefinitions, "f");
    __classPrivateFieldSet(this, _IntervalClient_actionDefinitions, actionDefinitions, "f");
    __classPrivateFieldSet(this, _IntervalClient_actionHandlers, actionHandlers, "f");
    __classPrivateFieldSet(this, _IntervalClient_pageHandlers, pageHandlers, "f");
}, _IntervalClient_log_get = function _IntervalClient_log_get() {
    return __classPrivateFieldGet(this, _IntervalClient_logger, "f");
}, _IntervalClient_resendPendingIOCalls = 
/**
 * Resends pending IO calls upon reconnection.
 */
async function _IntervalClient_resendPendingIOCalls(resendToTransactionIds) {
    if (!this.isConnected)
        return;
    const toResend = resendToTransactionIds
        ? new Map(resendToTransactionIds
            .map(id => [id, __classPrivateFieldGet(this, _IntervalClient_pendingIOCalls, "f").get(id)])
            .filter(([, state]) => !!state))
        : new Map(__classPrivateFieldGet(this, _IntervalClient_pendingIOCalls, "f"));
    let attemptNumber = 1;
    while (toResend.size > 0 && attemptNumber <= __classPrivateFieldGet(this, _IntervalClient_maxResendAttempts, "f")) {
        await Promise.allSettled(Array.from(toResend.entries()).map(([transactionId, ioCall]) => __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_send).call(this, 'SEND_IO_CALL', {
            transactionId,
            ioCall,
        })
            .then(response => {
            toResend.delete(transactionId);
            if (!response ||
                (typeof response === 'object' && response.type === 'ERROR')) {
                // Unsuccessful response, don't try again
                __classPrivateFieldGet(this, _IntervalClient_pendingIOCalls, "f").delete(transactionId);
            }
        })
            .catch(async (err) => {
            if (err instanceof IOError_1.default) {
                __classPrivateFieldGet(this, _IntervalClient_logger, "f").warn('Failed resending pending IO call: ', err.kind);
                if (err.kind === 'CANCELED' ||
                    err.kind === 'TRANSACTION_CLOSED') {
                    __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug('Aborting resending pending IO call');
                    toResend.delete(transactionId);
                    __classPrivateFieldGet(this, _IntervalClient_pendingIOCalls, "f").delete(transactionId);
                    return;
                }
            }
            else {
                __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug('Failed resending pending IO call:', err);
            }
            const retrySleepMs = __classPrivateFieldGet(this, _IntervalClient_retryIntervalMs, "f") * attemptNumber;
            __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug(`Trying again in ${Math.round(retrySleepMs / 1000)}s...`);
            await (0, exports.sleep)(retrySleepMs);
        })));
        attemptNumber++;
    }
}, _IntervalClient_resendPendingPageLayouts = 
/**
 * Resends pending IO calls upon reconnection.
 */
async function _IntervalClient_resendPendingPageLayouts(resendToPageKeys) {
    if (!this.isConnected)
        return;
    const toResend = resendToPageKeys
        ? new Map(resendToPageKeys
            .map(id => [id, __classPrivateFieldGet(this, _IntervalClient_pendingPageLayouts, "f").get(id)])
            .filter(([, state]) => !!state))
        : new Map(__classPrivateFieldGet(this, _IntervalClient_pendingPageLayouts, "f"));
    let attemptNumber = 1;
    while (toResend.size > 0 && attemptNumber <= __classPrivateFieldGet(this, _IntervalClient_maxResendAttempts, "f")) {
        await Promise.allSettled(Array.from(toResend.entries()).map(([pageKey, page]) => __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_send).call(this, 'SEND_PAGE', {
            pageKey,
            page,
        })
            .then(response => {
            toResend.delete(pageKey);
            if (!response) {
                // Unsuccessful response, don't try again
                __classPrivateFieldGet(this, _IntervalClient_pendingPageLayouts, "f").delete(pageKey);
            }
        })
            .catch(async (err) => {
            if (err instanceof IOError_1.default) {
                __classPrivateFieldGet(this, _IntervalClient_logger, "f").warn('Failed resending pending IO call: ', err.kind);
                if (err.kind === 'CANCELED' ||
                    err.kind === 'TRANSACTION_CLOSED') {
                    __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug('Aborting resending pending page layout');
                    toResend.delete(pageKey);
                    __classPrivateFieldGet(this, _IntervalClient_pendingPageLayouts, "f").delete(pageKey);
                    return;
                }
            }
            else {
                __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug('Failed resending pending page layout:', err);
            }
            const retrySleepMs = __classPrivateFieldGet(this, _IntervalClient_retryIntervalMs, "f") * attemptNumber;
            __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug(`Trying again in ${Math.round(retrySleepMs / 1000)}s...`);
            await (0, exports.sleep)(retrySleepMs);
        })));
        attemptNumber++;
    }
}, _IntervalClient_resendTransactionLoadingStates = 
/**
 * Resends pending transaction loading states upon reconnection.
 */
async function _IntervalClient_resendTransactionLoadingStates(resendToTransactionIds) {
    if (!this.isConnected)
        return;
    const toResend = resendToTransactionIds
        ? new Map(resendToTransactionIds
            .map(id => [id, __classPrivateFieldGet(this, _IntervalClient_transactionLoadingStates, "f").get(id)])
            .filter(([, state]) => !!state))
        : new Map(__classPrivateFieldGet(this, _IntervalClient_transactionLoadingStates, "f"));
    let attemptNumber = 0;
    while (toResend.size > 0 && attemptNumber <= __classPrivateFieldGet(this, _IntervalClient_maxResendAttempts, "f")) {
        await Promise.allSettled(Array.from(toResend.entries()).map(([transactionId, loadingState]) => __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_send).call(this, 'SEND_LOADING_CALL', {
            transactionId,
            ...loadingState,
        })
            .then(response => {
            toResend.delete(transactionId);
            if (!response) {
                // Unsuccessful response, don't try again
                __classPrivateFieldGet(this, _IntervalClient_transactionLoadingStates, "f").delete(transactionId);
            }
        })
            .catch(async (err) => {
            if (err instanceof IOError_1.default) {
                __classPrivateFieldGet(this, _IntervalClient_logger, "f").warn('Failed resending transaction loading state: ', err.kind);
                if (err.kind === 'CANCELED' ||
                    err.kind === 'TRANSACTION_CLOSED') {
                    __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug('Aborting resending transaction loading state');
                    __classPrivateFieldGet(this, _IntervalClient_transactionLoadingStates, "f").delete(transactionId);
                    return;
                }
            }
            else {
                __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug('Failed resending pending IO call:', err);
            }
            const retrySleepMs = __classPrivateFieldGet(this, _IntervalClient_retryIntervalMs, "f") * attemptNumber;
            __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug(`Trying again in ${Math.round(retrySleepMs / 1000)}s...`);
            await (0, exports.sleep)(retrySleepMs);
        })));
        attemptNumber++;
    }
}, _IntervalClient_closeTransaction = function _IntervalClient_closeTransaction(transactionId) {
    __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).debug('Closing transaction', transactionId);
    __classPrivateFieldGet(this, _IntervalClient_pendingIOCalls, "f").delete(transactionId);
    __classPrivateFieldGet(this, _IntervalClient_transactionLoadingStates, "f").delete(transactionId);
    __classPrivateFieldGet(this, _IntervalClient_ioResponseHandlers, "f").delete(transactionId);
    const client = __classPrivateFieldGet(this, _IntervalClient_ioClients, "f").get(transactionId);
    if (client) {
        __classPrivateFieldGet(this, _IntervalClient_ioClients, "f").delete(transactionId);
        for (const key of client.inlineActionKeys.values()) {
            __classPrivateFieldGet(this, _IntervalClient_actionHandlers, "f").delete(key);
        }
    }
    if (__classPrivateFieldGet(this, _IntervalClient_resolveShutdown, "f") && __classPrivateFieldGet(this, _IntervalClient_ioResponseHandlers, "f").size === 0) {
        setTimeout(() => {
            var _a;
            (_a = __classPrivateFieldGet(this, _IntervalClient_resolveShutdown, "f")) === null || _a === void 0 ? void 0 : _a.call(this);
        }, __classPrivateFieldGet(this, _IntervalClient_completeShutdownDelayMs, "f"));
    }
}, _IntervalClient_createSocketConnection = 
/**
 * Establishes the underlying ISocket connection to Interval.
 */
async function _IntervalClient_createSocketConnection(connectConfig) {
    var _a;
    const id = (_a = connectConfig === null || connectConfig === void 0 ? void 0 : connectConfig.instanceId) !== null && _a !== void 0 ? _a : (0, uuid_1.v4)();
    const headers = { 'x-instance-id': id };
    if (__classPrivateFieldGet(this, _IntervalClient_apiKey, "f")) {
        headers['x-api-key'] = __classPrivateFieldGet(this, _IntervalClient_apiKey, "f");
    }
    const ws = new ISocket_1.default(new ws_1.WebSocket(__classPrivateFieldGet(this, _IntervalClient_endpoint, "f"), {
        headers,
        followRedirects: true,
    }), {
        id,
        connectTimeout: __classPrivateFieldGet(this, _IntervalClient_config, "f").connectTimeoutMs,
        sendTimeout: __classPrivateFieldGet(this, _IntervalClient_config, "f").sendTimeoutMs,
        pingTimeout: __classPrivateFieldGet(this, _IntervalClient_config, "f").pingTimeoutMs,
    });
    if (__classPrivateFieldGet(this, _IntervalClient_verboseMessageLogs, "f")) {
        ws.onMessage.attach(message => {
            __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug('Message received:', message);
        });
    }
    ws.onClose.attach(async ([code, reason]) => {
        if (__classPrivateFieldGet(this, _IntervalClient_intentionallyClosed, "f")) {
            __classPrivateFieldSet(this, _IntervalClient_intentionallyClosed, false, "f");
            return;
        }
        if (__classPrivateFieldGet(this, _IntervalClient_pingIntervalHandle, "f")) {
            clearInterval(__classPrivateFieldGet(this, _IntervalClient_pingIntervalHandle, "f"));
            __classPrivateFieldSet(this, _IntervalClient_pingIntervalHandle, undefined, "f");
        }
        // don't initialize retry process again if already started
        if (__classPrivateFieldGet(this, _IntervalClient_isReconnecting, "f"))
            return;
        __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).error(`❗ Connection to Interval closed (code ${code})`);
        if (reason) {
            __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).error('Reason:', reason);
        }
        // don't reconnect if the initial connection failed, likely a config problem
        // and maintains previous behavior
        if (!__classPrivateFieldGet(this, _IntervalClient_isInitialized, "f"))
            return;
        __classPrivateFieldSet(this, _IntervalClient_isReconnecting, true, "f");
        __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).prod('🔌 Reconnecting...');
        while (!this.isConnected) {
            __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_createSocketConnection).call(this, { instanceId: ws.id })
                .then(() => {
                __classPrivateFieldSet(this, _IntervalClient_isReconnecting, false, "f");
                __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).prod('⚡ Reconnection successful');
                __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_resendPendingIOCalls).call(this);
                __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_resendTransactionLoadingStates).call(this);
                __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_resendPendingPageLayouts).call(this);
            })
                .catch(err => {
                __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug('Failed reestablishing connection', err);
            });
            __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).prod(`Unable to reconnect. Retrying in ${Math.round(__classPrivateFieldGet(this, _IntervalClient_retryIntervalMs, "f") / 1000)}s...`);
            await (0, exports.sleep)(__classPrivateFieldGet(this, _IntervalClient_retryIntervalMs, "f"));
        }
    });
    await ws.connect();
    __classPrivateFieldSet(this, _IntervalClient_ws, ws, "f");
    let lastSuccessfulPing = new Date();
    __classPrivateFieldSet(this, _IntervalClient_pingIntervalHandle, setInterval(async () => {
        if (!this.isConnected) {
            if (__classPrivateFieldGet(this, _IntervalClient_pingIntervalHandle, "f")) {
                clearInterval(__classPrivateFieldGet(this, _IntervalClient_pingIntervalHandle, "f"));
                __classPrivateFieldSet(this, _IntervalClient_pingIntervalHandle, undefined, "f");
            }
            return;
        }
        try {
            await ws.ping();
            lastSuccessfulPing = new Date();
        }
        catch (err) {
            __classPrivateFieldGet(this, _IntervalClient_logger, "f").warn('Pong not received in time');
            if (!(err instanceof ISocket_1.TimeoutError)) {
                __classPrivateFieldGet(this, _IntervalClient_logger, "f").warn(err);
            }
            if (lastSuccessfulPing.getTime() <
                new Date().getTime() - __classPrivateFieldGet(this, _IntervalClient_closeUnresponsiveConnectionTimeoutMs, "f")) {
                __classPrivateFieldGet(this, _IntervalClient_logger, "f").warn(`No pong received in last ${__classPrivateFieldGet(this, _IntervalClient_closeUnresponsiveConnectionTimeoutMs, "f")}ms, closing connection to Interval and retrying...`);
                if (__classPrivateFieldGet(this, _IntervalClient_pingIntervalHandle, "f")) {
                    clearInterval(__classPrivateFieldGet(this, _IntervalClient_pingIntervalHandle, "f"));
                    __classPrivateFieldSet(this, _IntervalClient_pingIntervalHandle, undefined, "f");
                }
                ws.close();
            }
        }
    }, __classPrivateFieldGet(this, _IntervalClient_pingIntervalMs, "f")), "f");
    if (!__classPrivateFieldGet(this, _IntervalClient_serverRpc, "f"))
        return;
    __classPrivateFieldGet(this, _IntervalClient_serverRpc, "f").setCommunicator(ws);
    await __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_initializeHost).call(this);
}, _IntervalClient_createRPCHandlers = function _IntervalClient_createRPCHandlers(requestId) {
    const intervalClient = this;
    return {
        START_TRANSACTION: async (inputs) => {
            if (__classPrivateFieldGet(this, _IntervalClient_resolveShutdown, "f")) {
                __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug('In process of closing, refusing to start transaction');
                return;
            }
            if (!intervalClient.organization) {
                __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "a", _IntervalClient_log_get).error('No organization defined');
                return;
            }
            const { action, transactionId } = inputs;
            if (__classPrivateFieldGet(this, _IntervalClient_ioResponseHandlers, "f").has(transactionId)) {
                __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug('Transaction already started, not starting again');
                return;
            }
            const actionHandler = __classPrivateFieldGet(intervalClient, _IntervalClient_actionHandlers, "f").get(action.slug);
            __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "a", _IntervalClient_log_get).debug(actionHandler);
            if (!actionHandler) {
                __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "a", _IntervalClient_log_get).debug('No actionHandler called', action.slug);
                return;
            }
            const client = new IOClient_1.IOClient({
                logger: __classPrivateFieldGet(intervalClient, _IntervalClient_logger, "f"),
                send: async (ioRenderInstruction) => {
                    var _a;
                    const ioCall = JSON.stringify(ioRenderInstruction);
                    __classPrivateFieldGet(intervalClient, _IntervalClient_pendingIOCalls, "f").set(transactionId, ioCall);
                    if (__classPrivateFieldGet(this, _IntervalClient_config, "f").getClientHandlers) {
                        await ((_a = __classPrivateFieldGet(this, _IntervalClient_config, "f").getClientHandlers()) === null || _a === void 0 ? void 0 : _a.RENDER({
                            transactionId,
                            toRender: ioCall,
                        }));
                    }
                    else {
                        const response = await __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "m", _IntervalClient_send).call(intervalClient, 'SEND_IO_CALL', {
                            transactionId,
                            ioCall,
                        });
                        if (!response ||
                            (typeof response === 'object' && response.type === 'ERROR')) {
                            let message = 'Error sending IO call.';
                            if (typeof response === 'object' &&
                                response.type === 'ERROR' &&
                                response.message) {
                                message = response.message;
                            }
                            throw new IOError_1.default('RENDER_ERROR', message);
                        }
                    }
                    __classPrivateFieldGet(intervalClient, _IntervalClient_transactionLoadingStates, "f").delete(transactionId);
                },
                isDemo: !!__classPrivateFieldGet(this, _IntervalClient_config, "f").getClientHandlers,
                displayResolvesImmediately: inputs.displayResolvesImmediately,
                // onAddInlineAction: handler => {
                //   const key = v4()
                //   intervalClient.#actionHandlers.set(key, handler)
                //   return key
                // },
            });
            __classPrivateFieldGet(intervalClient, _IntervalClient_ioResponseHandlers, "f").set(transactionId, client.onResponse.bind(client));
            // To maintain consistent ordering for logs despite network race conditions
            let logIndex = 0;
            let { params, paramsMeta } = inputs;
            if (params && paramsMeta) {
                params = superjson_1.default.deserialize({
                    json: params,
                    meta: paramsMeta,
                });
            }
            const ctx = {
                user: inputs.user,
                // TODO: Remove this when all active SDKs support superjson
                params: (0, deserialize_1.deserializeDates)(params),
                environment: inputs.environment,
                organization: intervalClient.organization,
                action,
                log: (...args) => __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "m", _IntervalClient_sendLog).call(intervalClient, transactionId, logIndex++, ...args),
                notify: async (config) => {
                    await __classPrivateFieldGet(intervalClient, _IntervalClient_interval, "f").notify({
                        ...config,
                        transactionId: inputs.transactionId,
                    });
                },
                loading: new TransactionLoadingState_1.default({
                    logger: __classPrivateFieldGet(intervalClient, _IntervalClient_logger, "f"),
                    send: async (loadingState) => {
                        var _a;
                        __classPrivateFieldGet(intervalClient, _IntervalClient_transactionLoadingStates, "f").set(transactionId, loadingState);
                        if (__classPrivateFieldGet(this, _IntervalClient_config, "f").getClientHandlers) {
                            await ((_a = __classPrivateFieldGet(this, _IntervalClient_config, "f").getClientHandlers()) === null || _a === void 0 ? void 0 : _a.LOADING_STATE({
                                transactionId,
                                ...loadingState,
                            }));
                        }
                        else {
                            await __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "m", _IntervalClient_send).call(intervalClient, 'SEND_LOADING_CALL', {
                                transactionId,
                                ...loadingState,
                            });
                        }
                    },
                }),
                redirect: (props) => __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "m", _IntervalClient_sendRedirect).call(intervalClient, transactionId, props),
            };
            __classPrivateFieldGet(this, _IntervalClient_ioClients, "f").set(transactionId, client);
            const { io } = client;
            const handleAction = () => {
                actionHandler(client.io, ctx)
                    .then(res => {
                    // Allow actions to return data even after being canceled
                    var _a;
                    const { json, meta } = superjson_1.default.serialize(res);
                    const result = {
                        schemaVersion: internalRpcSchema_1.TRANSACTION_RESULT_SCHEMA_VERSION,
                        status: 'SUCCESS',
                        data: (_a = json) !== null && _a !== void 0 ? _a : null,
                        meta,
                    };
                    return result;
                })
                    .catch(err => {
                    var _a;
                    // Action did not catch the cancellation error
                    if (err instanceof IOError_1.default && err.kind === 'CANCELED')
                        throw err;
                    __classPrivateFieldGet(intervalClient, _IntervalClient_logger, "f").error(err);
                    let data = null;
                    if (err instanceof IOError_1.default && err.cause) {
                        err = err.cause;
                    }
                    if (err instanceof Error) {
                        data = {
                            error: err.name,
                            message: err.message,
                            cause: err.cause && err.cause instanceof Error
                                ? `${err.cause.name}: ${err.cause.message}`
                                : undefined,
                            // TODO: Maybe show stack traces in the future?
                            // stack: err.stack,
                        };
                    }
                    (_a = __classPrivateFieldGet(this, _IntervalClient_onError, "f")) === null || _a === void 0 ? void 0 : _a.call(this, {
                        error: err,
                        route: action.slug,
                        routeDefinition: __classPrivateFieldGet(this, _IntervalClient_routes, "f").get(action.slug),
                        params: ctx.params,
                        environment: ctx.environment,
                        user: ctx.user,
                        organization: ctx.organization,
                    });
                    const result = {
                        schemaVersion: internalRpcSchema_1.TRANSACTION_RESULT_SCHEMA_VERSION,
                        status: 'FAILURE',
                        data,
                    };
                    return result;
                })
                    .then(async (res) => {
                    var _a;
                    if (__classPrivateFieldGet(this, _IntervalClient_config, "f").getClientHandlers) {
                        (_a = __classPrivateFieldGet(this, _IntervalClient_config, "f").getClientHandlers()) === null || _a === void 0 ? void 0 : _a.TRANSACTION_COMPLETED({
                            transactionId,
                            resultStatus: res.status,
                            result: JSON.stringify(res),
                        });
                    }
                    else {
                        await __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "m", _IntervalClient_send).call(intervalClient, 'MARK_TRANSACTION_COMPLETE', {
                            transactionId,
                            resultStatus: res.status,
                            result: JSON.stringify(res),
                        });
                    }
                    if (requestId) {
                        setTimeout(() => {
                            const callbacks = __classPrivateFieldGet(intervalClient, _IntervalClient_httpRequestCompleteCallbacks, "f").get(requestId);
                            if (callbacks) {
                                const [resolve] = callbacks;
                                resolve();
                            }
                            else {
                                __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "a", _IntervalClient_log_get).debug('No HTTP request complete callbacks found for requestId', requestId);
                            }
                        }, __classPrivateFieldGet(this, _IntervalClient_completeHttpRequestDelayMs, "f"));
                    }
                })
                    .catch(err => {
                    if (err instanceof IOError_1.default) {
                        switch (err.kind) {
                            case 'CANCELED':
                                __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "a", _IntervalClient_log_get).debug('Transaction canceled for action', action.slug);
                                break;
                            case 'TRANSACTION_CLOSED':
                                __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "a", _IntervalClient_log_get).debug('Attempted to make IO call after transaction already closed in action', action.slug);
                                break;
                        }
                    }
                    else {
                        __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "a", _IntervalClient_log_get).error('Error sending action response', err);
                    }
                    if (requestId) {
                        setTimeout(() => {
                            const callbacks = __classPrivateFieldGet(intervalClient, _IntervalClient_httpRequestCompleteCallbacks, "f").get(requestId);
                            if (callbacks) {
                                const [_, reject] = callbacks;
                                reject(err);
                            }
                            else {
                                __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "a", _IntervalClient_log_get).debug('No HTTP request complete callbacks found for requestId', requestId);
                            }
                        }, __classPrivateFieldGet(this, _IntervalClient_completeHttpRequestDelayMs, "f"));
                    }
                })
                    .finally(() => {
                    if (!inputs.displayResolvesImmediately) {
                        __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_closeTransaction).call(this, transactionId);
                    }
                });
            };
            if (actionLocalStorage) {
                actionLocalStorage.run({ io, ctx }, () => {
                    handleAction();
                });
            }
            else {
                handleAction();
            }
            return;
        },
        IO_RESPONSE: async (inputs) => {
            __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).debug('Got io response', inputs);
            try {
                const ioResp = ioSchema_1.IO_RESPONSE.parse(JSON.parse(inputs.value));
                const responseHandler = __classPrivateFieldGet(this, _IntervalClient_ioResponseHandlers, "f").get(ioResp.transactionId);
                if (!responseHandler) {
                    __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).debug('Missing response handler for transaction ID', inputs.transactionId);
                    return;
                }
                responseHandler(ioResp);
            }
            catch (err) {
                if (err instanceof zod_1.ZodError) {
                    __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).error('Received invalid IO response:', inputs);
                    __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).debug(err);
                }
                else {
                    __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).error('Failed handling IO response:', err);
                }
            }
        },
        CLOSE_TRANSACTION: async ({ transactionId }) => {
            __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_closeTransaction).call(this, transactionId);
        },
        OPEN_PAGE: async (inputs) => {
            if (__classPrivateFieldGet(this, _IntervalClient_resolveShutdown, "f")) {
                return { type: 'ERROR', message: 'Host shutting down.' };
            }
            if (!this.organization) {
                __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).error('No organization defined');
                const error = new __1.IntervalError('No organization defined.');
                if (requestId) {
                    setTimeout(() => {
                        const callbacks = __classPrivateFieldGet(intervalClient, _IntervalClient_httpRequestCompleteCallbacks, "f").get(requestId);
                        if (callbacks) {
                            const [_, reject] = callbacks;
                            reject(error);
                        }
                        else {
                            __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "a", _IntervalClient_log_get).debug('No HTTP request complete callbacks found for requestId', requestId);
                        }
                    }, __classPrivateFieldGet(this, _IntervalClient_completeHttpRequestDelayMs, "f"));
                }
                return { type: 'ERROR', message: error.message };
            }
            const { pageKey } = inputs;
            const pageHandler = __classPrivateFieldGet(this, _IntervalClient_pageHandlers, "f").get(inputs.page.slug);
            if (!pageHandler) {
                __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).debug('No page handler found', inputs.page.slug);
                const error = new __1.IntervalError('No page handler found.');
                if (requestId) {
                    setTimeout(() => {
                        const callbacks = __classPrivateFieldGet(intervalClient, _IntervalClient_httpRequestCompleteCallbacks, "f").get(requestId);
                        if (callbacks) {
                            const [_, reject] = callbacks;
                            reject(error);
                        }
                        else {
                            __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "a", _IntervalClient_log_get).debug('No HTTP request complete callbacks found for requestId', requestId);
                        }
                    }, __classPrivateFieldGet(this, _IntervalClient_completeHttpRequestDelayMs, "f"));
                }
                return { type: 'ERROR', message: error.message };
            }
            __classPrivateFieldGet(this, _IntervalClient_openPages, "f").add(pageKey);
            let { params, paramsMeta } = inputs;
            if (params && paramsMeta) {
                params = superjson_1.default.deserialize({
                    json: params,
                    meta: paramsMeta,
                });
            }
            const ctx = {
                user: inputs.user,
                params: (0, deserialize_1.deserializeDates)(params),
                environment: inputs.environment,
                organization: this.organization,
                page: inputs.page,
                redirect: (props) => __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "m", _IntervalClient_sendRedirect).call(intervalClient, pageKey, props),
                loading: new TransactionLoadingState_1.default({
                    logger: __classPrivateFieldGet(intervalClient, _IntervalClient_logger, "f"),
                    send: async (loadingState) => {
                        var _a;
                        if (!__classPrivateFieldGet(this, _IntervalClient_openPages, "f").has(pageKey))
                            return;
                        __classPrivateFieldGet(intervalClient, _IntervalClient_transactionLoadingStates, "f").set(pageKey, loadingState);
                        if (__classPrivateFieldGet(this, _IntervalClient_config, "f").getClientHandlers) {
                            await ((_a = __classPrivateFieldGet(this, _IntervalClient_config, "f").getClientHandlers()) === null || _a === void 0 ? void 0 : _a.LOADING_STATE({
                                transactionId: pageKey,
                                ...loadingState,
                            }));
                        }
                        else {
                            await __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "m", _IntervalClient_send).call(intervalClient, 'SEND_LOADING_CALL', {
                                transactionId: pageKey,
                                ...loadingState,
                            });
                        }
                    },
                }),
            };
            let page = undefined;
            let menuItems = undefined;
            let renderInstruction = undefined;
            let errors = [];
            const MAX_PAGE_RETRIES = 5;
            const sendPage = async () => {
                var _a;
                if (!__classPrivateFieldGet(this, _IntervalClient_openPages, "f").has(pageKey))
                    return;
                let pageLayout;
                if (page instanceof Layout_1.BasicLayout) {
                    pageLayout = {
                        kind: 'BASIC',
                        title: page.title === undefined
                            ? undefined
                            : typeof page.title === 'string'
                                ? page.title
                                : null,
                        description: page.description === undefined
                            ? undefined
                            : typeof page.description === 'string'
                                ? page.description
                                : null,
                        menuItems,
                        children: renderInstruction,
                        errors,
                    };
                    if ('metadata' in page) {
                        __classPrivateFieldGet(this, _IntervalClient_logger, "f").warn('The `metadata` property on `Layout` is deprecated. Please use `io.display.metadata` in the `children` array instead.');
                    }
                }
                if (__classPrivateFieldGet(this, _IntervalClient_config, "f").getClientHandlers) {
                    await ((_a = __classPrivateFieldGet(this, _IntervalClient_config, "f").getClientHandlers()) === null || _a === void 0 ? void 0 : _a.RENDER_PAGE({
                        pageKey,
                        page: pageLayout ? JSON.stringify(pageLayout) : undefined,
                        hostInstanceId: 'demo',
                    }));
                }
                else {
                    for (let i = 0; i < MAX_PAGE_RETRIES; i++) {
                        try {
                            const page = pageLayout ? JSON.stringify(pageLayout) : undefined;
                            if (page) {
                                __classPrivateFieldGet(this, _IntervalClient_pendingPageLayouts, "f").set(pageKey, page);
                            }
                            await __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_send).call(this, 'SEND_PAGE', {
                                pageKey,
                                page,
                            });
                            return;
                        }
                        catch (err) {
                            __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug('Failed sending page', err);
                            __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug('Retrying in', __classPrivateFieldGet(this, _IntervalClient_retryIntervalMs, "f"));
                            await (0, exports.sleep)(__classPrivateFieldGet(this, _IntervalClient_retryIntervalMs, "f"));
                        }
                    }
                    throw new __1.IntervalError('Unsuccessful sending page, max retries exceeded.');
                }
            };
            // What follows is a pretty convoluted way to coalesce
            // `scheduleSendPage` calls into non-clobbering/overlapping
            // `sendPage `calls. This can probably be simplified but I
            // can't think of a better way at the moment.
            // Tracks whether a send is currently in progress
            let sendPagePromise = null;
            // Keeps track of a brief timeout to coalesce rapid send calls
            let pageSendTimeout = null;
            // Tracks whether a new send needs to happen after the current one
            let newPageScheduled = false;
            const processSendPage = () => {
                if (!__classPrivateFieldGet(this, _IntervalClient_openPages, "f").has(pageKey))
                    return;
                newPageScheduled = false;
                pageSendTimeout = null;
                sendPagePromise = sendPage()
                    .catch(err => {
                    __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug(`Failed sending page with key ${pageKey}`, err);
                })
                    .finally(() => {
                    sendPagePromise = null;
                    if (newPageScheduled) {
                        scheduleSendPage();
                    }
                });
            };
            const scheduleSendPage = () => {
                if (!__classPrivateFieldGet(this, _IntervalClient_openPages, "f").has(pageKey))
                    return;
                newPageScheduled = true;
                if (sendPagePromise)
                    return;
                if (pageSendTimeout)
                    return;
                pageSendTimeout = setTimeout(processSendPage, 0);
            };
            const client = new IOClient_1.IOClient({
                logger: __classPrivateFieldGet(this, _IntervalClient_logger, "f"),
                send: async (instruction) => {
                    if (!__classPrivateFieldGet(this, _IntervalClient_openPages, "f").has(pageKey))
                        return;
                    renderInstruction = instruction;
                    scheduleSendPage();
                },
                isDemo: !!__classPrivateFieldGet(this, _IntervalClient_config, "f").getClientHandlers,
                // onAddInlineAction: () => {
                //   const key = v4()
                //   this.#actionHandlers.set(key, handler)
                //   return key
                // },
            });
            const { io: { group, display }, } = client;
            if (__classPrivateFieldGet(this, _IntervalClient_openPages, "f").has(pageKey)) {
                __classPrivateFieldGet(this, _IntervalClient_ioClients, "f").set(pageKey, client);
                __classPrivateFieldGet(this, _IntervalClient_ioResponseHandlers, "f").set(pageKey, client.onResponse.bind(client));
            }
            const pageError = (error, layoutKey) => {
                if (error instanceof Error) {
                    return {
                        layoutKey,
                        error: error.name,
                        message: error.message,
                        cause: error.cause && error.cause instanceof Error
                            ? `${error.cause.name}: ${error.cause.message}`
                            : undefined,
                        // TODO: Maybe show stack traces in the future?
                        // stack: error.stack,
                    };
                }
                else {
                    return {
                        layoutKey,
                        error: 'Unknown error',
                        message: String(error),
                    };
                }
            };
            const handlePage = () => {
                pageHandler(display, ctx)
                    .then(res => {
                    var _a, _b, _c;
                    page = res;
                    if (!page) {
                        scheduleSendPage();
                        return;
                    }
                    if (typeof page.title === 'function') {
                        try {
                            page.title = page.title();
                        }
                        catch (err) {
                            __classPrivateFieldGet(this, _IntervalClient_logger, "f").error(err);
                            (_a = __classPrivateFieldGet(this, _IntervalClient_onError, "f")) === null || _a === void 0 ? void 0 : _a.call(this, {
                                error: err,
                                route: ctx.page.slug,
                                routeDefinition: __classPrivateFieldGet(this, _IntervalClient_routes, "f").get(ctx.page.slug),
                                params: ctx.params,
                                environment: ctx.environment,
                                user: ctx.user,
                                organization: ctx.organization,
                            });
                            errors.push(pageError(err, 'title'));
                        }
                    }
                    if (page.title instanceof Promise) {
                        page.title
                            .then(title => {
                            if (page) {
                                page.title = title;
                                scheduleSendPage();
                            }
                        })
                            .catch(err => {
                            var _a;
                            __classPrivateFieldGet(this, _IntervalClient_logger, "f").error(err);
                            (_a = __classPrivateFieldGet(this, _IntervalClient_onError, "f")) === null || _a === void 0 ? void 0 : _a.call(this, {
                                error: err,
                                route: ctx.page.slug,
                                routeDefinition: __classPrivateFieldGet(this, _IntervalClient_routes, "f").get(ctx.page.slug),
                                params: ctx.params,
                                environment: ctx.environment,
                                user: ctx.user,
                                organization: ctx.organization,
                            });
                            errors.push(pageError(err, 'title'));
                            scheduleSendPage();
                        });
                    }
                    if (page.description) {
                        if (typeof page.description === 'function') {
                            try {
                                page.description = page.description();
                            }
                            catch (err) {
                                __classPrivateFieldGet(this, _IntervalClient_logger, "f").error(err);
                                (_b = __classPrivateFieldGet(this, _IntervalClient_onError, "f")) === null || _b === void 0 ? void 0 : _b.call(this, {
                                    error: err,
                                    route: ctx.page.slug,
                                    routeDefinition: __classPrivateFieldGet(this, _IntervalClient_routes, "f").get(ctx.page.slug),
                                    params: ctx.params,
                                    environment: ctx.environment,
                                    user: ctx.user,
                                    organization: ctx.organization,
                                });
                                errors.push(pageError(err, 'description'));
                            }
                        }
                        if (page.description instanceof Promise) {
                            page.description
                                .then(description => {
                                if (page) {
                                    page.description = description;
                                    scheduleSendPage();
                                }
                            })
                                .catch(err => {
                                var _a;
                                __classPrivateFieldGet(this, _IntervalClient_logger, "f").error(err);
                                (_a = __classPrivateFieldGet(this, _IntervalClient_onError, "f")) === null || _a === void 0 ? void 0 : _a.call(this, {
                                    error: err,
                                    route: ctx.page.slug,
                                    routeDefinition: __classPrivateFieldGet(this, _IntervalClient_routes, "f").get(ctx.page.slug),
                                    params: ctx.params,
                                    environment: ctx.environment,
                                    user: ctx.user,
                                    organization: ctx.organization,
                                });
                                errors.push(pageError(err, 'description'));
                                scheduleSendPage();
                            });
                        }
                    }
                    if (page.menuItems) {
                        menuItems = page.menuItems;
                        // menuItems = page.menuItems.map(menuItem => {
                        //   if (
                        //     'action' in menuItem &&
                        //     typeof menuItem['action'] === 'function'
                        //   ) {
                        //     const inlineAction = client.addInlineAction(menuItem.action)
                        //     return {
                        //       ...menuItem,
                        //       inlineAction,
                        //     }
                        //   }
                        //
                        //   return menuItem
                        // })
                    }
                    if ('metadata' in page) {
                        __classPrivateFieldGet(this, _IntervalClient_logger, "f").warn('The `metadata` property on `Layout` is deprecated. Please use `io.display.metadata` in the `children` array instead.');
                    }
                    if ((_c = page.children) === null || _c === void 0 ? void 0 : _c.length) {
                        group(page.children).then(() => {
                            __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug('Initial children render complete for pageKey', pageKey);
                        }, 
                        // We use the reject callback form because it's an IOGroupPromise,
                        // not a real Promise and we don't currently implement `.catch()`
                        // (I don't know how or if it's possbile right now, thenable objects aren't documented well)
                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#thenables
                        err => {
                            var _a;
                            __classPrivateFieldGet(this, _IntervalClient_logger, "f").error(err);
                            (_a = __classPrivateFieldGet(this, _IntervalClient_onError, "f")) === null || _a === void 0 ? void 0 : _a.call(this, {
                                error: err,
                                route: ctx.page.slug,
                                routeDefinition: __classPrivateFieldGet(this, _IntervalClient_routes, "f").get(ctx.page.slug),
                                params: ctx.params,
                                environment: ctx.environment,
                                user: ctx.user,
                                organization: ctx.organization,
                            });
                            if (err instanceof IOError_1.default && err.cause) {
                                errors.push(pageError(err.cause, 'children'));
                            }
                            else {
                                errors.push(pageError(err, 'children'));
                            }
                            scheduleSendPage();
                        });
                    }
                    else {
                        scheduleSendPage();
                    }
                })
                    .catch(async (err) => {
                    var _a;
                    __classPrivateFieldGet(this, _IntervalClient_logger, "f").error('Error in page:', err);
                    errors.push(pageError(err));
                    (_a = __classPrivateFieldGet(this, _IntervalClient_onError, "f")) === null || _a === void 0 ? void 0 : _a.call(this, {
                        error: err,
                        route: ctx.page.slug,
                        routeDefinition: __classPrivateFieldGet(this, _IntervalClient_routes, "f").get(ctx.page.slug),
                        params: ctx.params,
                        environment: ctx.environment,
                        user: ctx.user,
                        organization: ctx.organization,
                    });
                    if (!__classPrivateFieldGet(this, _IntervalClient_openPages, "f").has(pageKey))
                        return;
                    const pageLayout = {
                        kind: 'BASIC',
                        errors,
                    };
                    await __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_send).call(this, 'SEND_PAGE', {
                        pageKey,
                        page: JSON.stringify(pageLayout),
                    });
                });
            };
            if (__classPrivateFieldGet(this, _IntervalClient_openPages, "f").has(pageKey)) {
                if (pageLocalStorage) {
                    pageLocalStorage.run({ display, ctx }, () => {
                        handlePage();
                    });
                }
                else {
                    handlePage();
                }
            }
            return {
                type: 'SUCCESS',
                pageKey,
            };
        },
        CLOSE_PAGE: async (inputs) => {
            __classPrivateFieldGet(this, _IntervalClient_openPages, "f").delete(inputs.pageKey);
            const client = __classPrivateFieldGet(this, _IntervalClient_ioClients, "f").get(inputs.pageKey);
            if (client) {
                for (const key of client.inlineActionKeys.values()) {
                    __classPrivateFieldGet(this, _IntervalClient_actionHandlers, "f").delete(key);
                }
                client.inlineActionKeys.clear();
                __classPrivateFieldGet(this, _IntervalClient_ioClients, "f").delete(inputs.pageKey);
            }
            __classPrivateFieldGet(this, _IntervalClient_pendingPageLayouts, "f").delete(inputs.pageKey);
            __classPrivateFieldGet(this, _IntervalClient_ioResponseHandlers, "f").delete(inputs.pageKey);
            __classPrivateFieldGet(this, _IntervalClient_transactionLoadingStates, "f").delete(inputs.pageKey);
            // Do this after a small delay so that this function can return before shutdown
            if (requestId) {
                setTimeout(() => {
                    const callbacks = __classPrivateFieldGet(intervalClient, _IntervalClient_httpRequestCompleteCallbacks, "f").get(requestId);
                    if (callbacks) {
                        const [resolve] = callbacks;
                        resolve();
                    }
                    else {
                        __classPrivateFieldGet(intervalClient, _IntervalClient_instances, "a", _IntervalClient_log_get).debug('No HTTP request complete callbacks found for requestId', requestId);
                    }
                }, __classPrivateFieldGet(this, _IntervalClient_completeHttpRequestDelayMs, "f"));
            }
            if (__classPrivateFieldGet(this, _IntervalClient_resolveShutdown, "f") && __classPrivateFieldGet(this, _IntervalClient_ioResponseHandlers, "f").size === 0) {
                setTimeout(() => {
                    var _a;
                    (_a = __classPrivateFieldGet(this, _IntervalClient_resolveShutdown, "f")) === null || _a === void 0 ? void 0 : _a.call(this);
                }, __classPrivateFieldGet(this, _IntervalClient_completeShutdownDelayMs, "f"));
            }
        },
    };
}, _IntervalClient_createRPCClient = function _IntervalClient_createRPCClient({ communicator = __classPrivateFieldGet(this, _IntervalClient_ws, "f"), requestId, canCall, }) {
    if (!communicator) {
        throw new Error('Communicator not initialized');
    }
    return new DuplexRPCClient_1.DuplexRPCClient({
        communicator,
        canCall,
        canRespondTo: internalRpcSchema_1.hostSchema,
        handlers: __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_createRPCHandlers).call(this, requestId),
        retryChunkIntervalMs: __classPrivateFieldGet(this, _IntervalClient_config, "f").retryChunkIntervalMs,
    });
}, _IntervalClient_initializeHost = 
/**
 * Sends the `INITIALIZE_HOST` RPC call to Interval,
 * declaring the actions that this host is responsible for handling.
 */
async function _IntervalClient_initializeHost(requestId) {
    if (!__classPrivateFieldGet(this, _IntervalClient_ws, "f")) {
        throw new __1.IntervalError('ISocket not initialized');
    }
    if (!__classPrivateFieldGet(this, _IntervalClient_serverRpc, "f")) {
        throw new __1.IntervalError('serverRpc not initialized');
    }
    const isInitialInitialization = !__classPrivateFieldGet(this, _IntervalClient_isInitialized, "f");
    __classPrivateFieldSet(this, _IntervalClient_isInitialized, true, "f");
    await __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_walkRoutes).call(this);
    const response = await __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_send).call(this, 'INITIALIZE_HOST', {
        actions: __classPrivateFieldGet(this, _IntervalClient_actionDefinitions, "f"),
        groups: __classPrivateFieldGet(this, _IntervalClient_pageDefinitions, "f"),
        sdkName: pkg.name,
        sdkVersion: pkg.version,
        requestId,
        timestamp: new Date().valueOf(),
    });
    if (!response) {
        throw new __1.IntervalError('Unknown error');
    }
    if (response.sdkAlert) {
        __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).handleSdkAlert(response.sdkAlert);
    }
    if (response.type === 'error') {
        throw new __1.IntervalError(response.message);
    }
    else {
        if (response.invalidSlugs.length > 0) {
            __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).warn('[Interval]', '⚠ Invalid slugs detected:\n');
            for (const slug of response.invalidSlugs) {
                __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).warn(`  - ${slug}`);
            }
            __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).warn('\nAction slugs must contain only letters, numbers, underscores, periods, and hyphens.');
        }
        if (response.warnings.length) {
            for (const warning of response.warnings) {
                __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).warn(warning);
            }
        }
        this.organization = response.organization;
        this.environment = response.environment;
        if (isInitialInitialization) {
            __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).prod(`🔗 Connected! Access your actions at: ${response.dashboardUrl}`);
            __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).debug('Host ID:', __classPrivateFieldGet(this, _IntervalClient_ws, "f").id);
        }
    }
    return response;
}, _IntervalClient_send = async function _IntervalClient_send(methodName, inputs) {
    if (!__classPrivateFieldGet(this, _IntervalClient_serverRpc, "f"))
        throw new __1.IntervalError('serverRpc not initialized');
    for (let attemptNumber = 1; attemptNumber <= __classPrivateFieldGet(this, _IntervalClient_maxResendAttempts, "f"); attemptNumber++) {
        try {
            __classPrivateFieldGet(this, _IntervalClient_logger, "f").debug('Sending via server', methodName, inputs);
            return await __classPrivateFieldGet(this, _IntervalClient_serverRpc, "f").send(methodName, inputs, {
                timeoutFactor: attemptNumber,
            });
        }
        catch (err) {
            const sleepTimeBeforeRetrying = __classPrivateFieldGet(this, _IntervalClient_retryIntervalMs, "f") * attemptNumber;
            if (err instanceof ISocket_1.TimeoutError) {
                __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).debug(`RPC call timed out, retrying in ${Math.round(sleepTimeBeforeRetrying / 1000)}s...`);
                __classPrivateFieldGet(this, _IntervalClient_instances, "a", _IntervalClient_log_get).debug(err);
                (0, exports.sleep)(sleepTimeBeforeRetrying);
            }
            else {
                throw err;
            }
        }
    }
    throw new __1.IntervalError('Maximum failed resend attempts reached, aborting.');
}, _IntervalClient_sendLog = async function _IntervalClient_sendLog(transactionId, index, ...args) {
    var _a;
    if (!args.length)
        return;
    let data = args
        .map(arg => {
        if (arg === undefined)
            return 'undefined';
        if (typeof arg === 'string')
            return arg;
        return JSON.stringify(arg, undefined, 2);
    })
        .join(' ');
    if (data.length > 10000) {
        data =
            data.slice(0, 10000) +
                '...' +
                '\n^ Warning: 10k logline character limit reached.\nTo avoid this error, try separating your data into multiple ctx.log() calls.';
    }
    if (__classPrivateFieldGet(this, _IntervalClient_config, "f").getClientHandlers) {
        await ((_a = __classPrivateFieldGet(this, _IntervalClient_config, "f").getClientHandlers()) === null || _a === void 0 ? void 0 : _a.LOG({
            transactionId,
            data,
            timestamp: new Date().valueOf(),
            index,
        }));
    }
    else {
        await __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_send).call(this, 'SEND_LOG', {
            transactionId,
            data,
            index,
            timestamp: new Date().valueOf(),
        }).catch(err => {
            __classPrivateFieldGet(this, _IntervalClient_logger, "f").error('Failed sending log to Interval', err);
        });
    }
}, _IntervalClient_sendRedirect = async function _IntervalClient_sendRedirect(transactionId, props) {
    if (__classPrivateFieldGet(this, _IntervalClient_config, "f").getClientHandlers) {
        throw new __1.IntervalError(`The ctx.redirect method isn't supported in demo mode`);
    }
    const response = await __classPrivateFieldGet(this, _IntervalClient_instances, "m", _IntervalClient_send).call(this, 'SEND_REDIRECT', {
        transactionId,
        ...props,
    });
    if (!response) {
        throw new __1.IntervalError('Failed sending redirect');
    }
};
