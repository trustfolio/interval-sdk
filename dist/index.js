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
var _Interval_instances, _Interval_logger, _Interval_client, _Interval_apiKey, _Interval_httpEndpoint, _Interval_groupChangeCtx, _Interval_log_get, _Interval_getQueueAddress;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = exports.Page = exports.Action = exports.TimeoutError = exports.NotConnectedError = exports.IntervalError = exports.IOError = exports.Interval = exports.ctx = exports.io = exports.getSomeStore = exports.getPageStore = exports.getActionStore = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const Routes_1 = __importDefault(require("./classes/Routes"));
const IOError_1 = __importDefault(require("./classes/IOError"));
exports.IOError = IOError_1.default;
const Logger_1 = __importDefault(require("./classes/Logger"));
const Page_1 = __importDefault(require("./classes/Page"));
exports.Page = Page_1.default;
const internalRpcSchema_1 = require("./internalRpcSchema");
const ISocket_1 = require("./classes/ISocket");
Object.defineProperty(exports, "NotConnectedError", { enumerable: true, get: function () { return ISocket_1.NotConnectedError; } });
Object.defineProperty(exports, "TimeoutError", { enumerable: true, get: function () { return ISocket_1.TimeoutError; } });
const IntervalError_1 = __importDefault(require("./classes/IntervalError"));
exports.IntervalError = IntervalError_1.default;
const IntervalClient_1 = __importStar(require("./classes/IntervalClient"));
const Action_1 = __importDefault(require("./classes/Action"));
exports.Action = Action_1.default;
const Layout_1 = require("./classes/Layout");
Object.defineProperty(exports, "Layout", { enumerable: true, get: function () { return Layout_1.BasicLayout; } });
const evt_1 = require("evt");
const superjson_1 = __importDefault(require("./utils/superjson"));
function getActionStore() {
    if (!IntervalClient_1.actionLocalStorage) {
        throw new IntervalError_1.default('Global io and ctx objects are only available in a Node.js context.');
    }
    const store = IntervalClient_1.actionLocalStorage.getStore();
    if (!store) {
        throw new IntervalError_1.default('Global io and ctx objects can only be used inside a Page or Action.');
    }
    return store;
}
exports.getActionStore = getActionStore;
function getPageStore() {
    if (!IntervalClient_1.pageLocalStorage) {
        throw new IntervalError_1.default('Global io and ctx objects are only available in a Node.js context.');
    }
    const store = IntervalClient_1.pageLocalStorage.getStore();
    if (!store) {
        throw new IntervalError_1.default('Global io and ctx objects can only be used inside a Page or Action.');
    }
    return store;
}
exports.getPageStore = getPageStore;
function getSomeStore() {
    try {
        return getPageStore();
    }
    catch (err) {
        return getActionStore();
    }
}
exports.getSomeStore = getSomeStore;
// prettier-ignore
exports.io = {
    get group() { return getActionStore().io.group; },
    get confirm() { return getActionStore().io.confirm; },
    get confirmIdentity() { return getActionStore().io.confirmIdentity; },
    get search() { return getActionStore().io.search; },
    get input() { return getActionStore().io.input; },
    get select() { return getActionStore().io.select; },
    get display() {
        try {
            return getPageStore().display;
        }
        catch (err) {
            return getActionStore().io.display;
        }
    },
    get experimental() { return getActionStore().io.experimental; },
};
// prettier-ignore
exports.ctx = {
    get user() { return getSomeStore().ctx.user; },
    get params() { return getSomeStore().ctx.params; },
    get environment() { return getSomeStore().ctx.environment; },
    get loading() { return getSomeStore().ctx.loading; },
    get log() { return getActionStore().ctx.log; },
    get organization() { return getSomeStore().ctx.organization; },
    get action() { return getActionStore().ctx.action; },
    get page() { return getPageStore().ctx.page; },
    get notify() { return getActionStore().ctx.notify; },
    get redirect() { return getSomeStore().ctx.redirect; },
};
class Interval {
    constructor(config) {
        _Interval_instances.add(this);
        _Interval_logger.set(this, void 0);
        _Interval_client.set(this, void 0);
        _Interval_apiKey.set(this, void 0);
        _Interval_httpEndpoint.set(this, void 0);
        _Interval_groupChangeCtx.set(this, evt_1.Evt.newCtx());
        this.config = config;
        __classPrivateFieldSet(this, _Interval_apiKey, config.apiKey, "f");
        __classPrivateFieldSet(this, _Interval_logger, new Logger_1.default(config.logLevel), "f");
        __classPrivateFieldSet(this, _Interval_httpEndpoint, (0, IntervalClient_1.getHttpEndpoint)(config.endpoint), "f");
        this.routes = new Routes_1.default(this, __classPrivateFieldGet(this, _Interval_httpEndpoint, "f"), __classPrivateFieldGet(this, _Interval_logger, "f"), __classPrivateFieldGet(this, _Interval_groupChangeCtx, "f"), __classPrivateFieldGet(this, _Interval_apiKey, "f"));
        const routes = {
            ...this.config.actions,
            ...this.config.groups,
            ...this.config.routes,
        };
        if (routes) {
            for (const group of Object.values(routes)) {
                if (group instanceof Page_1.default) {
                    group.onChange.attach(__classPrivateFieldGet(this, _Interval_groupChangeCtx, "f"), () => {
                        var _a;
                        (_a = this.client) === null || _a === void 0 ? void 0 : _a.handleActionsChange(this.config);
                    });
                }
            }
        }
    }
    // TODO: Mark as deprecated soon, remove soon afterward
    get actions() {
        return this.routes;
    }
    get apiKey() {
        return __classPrivateFieldGet(this, _Interval_apiKey, "f");
    }
    get httpEndpoint() {
        return __classPrivateFieldGet(this, _Interval_httpEndpoint, "f");
    }
    get log() {
        return __classPrivateFieldGet(this, _Interval_logger, "f");
    }
    get isConnected() {
        var _a, _b;
        return (_b = (_a = __classPrivateFieldGet(this, _Interval_client, "f")) === null || _a === void 0 ? void 0 : _a.isConnected) !== null && _b !== void 0 ? _b : false;
    }
    /**
     * Establish the persistent connection to Interval.
     */
    async listen() {
        if (!__classPrivateFieldGet(this, _Interval_client, "f")) {
            __classPrivateFieldSet(this, _Interval_client, new IntervalClient_1.default(this, this.config), "f");
        }
        return __classPrivateFieldGet(this, _Interval_client, "f").listen();
    }
    async ping() {
        if (!__classPrivateFieldGet(this, _Interval_client, "f"))
            throw new ISocket_1.NotConnectedError();
        return __classPrivateFieldGet(this, _Interval_client, "f").ping();
    }
    /**
     * Immediately terminate the connection to interval, terminating any actions currently in progress.
     */
    immediatelyClose() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _Interval_client, "f")) === null || _a === void 0 ? void 0 : _a.immediatelyClose();
    }
    /**
     * Safely close the connection to Interval, preventing new actions from being launched and closing the persistent connection afterward. Resolves when the connection is successfully safely closed.
     */
    async safelyClose() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _Interval_client, "f")) === null || _a === void 0 ? void 0 : _a.safelyClose();
    }
    /* @internal */ get client() {
        return __classPrivateFieldGet(this, _Interval_client, "f");
    }
    async fetchIceConfig() {
        const response = await (0, cross_fetch_1.default)(`${__classPrivateFieldGet(this, _Interval_httpEndpoint, "f")}/api/ice-config`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${__classPrivateFieldGet(this, _Interval_apiKey, "f")}`,
            },
        }).then(r => r.json());
        const parsed = internalRpcSchema_1.ICE_CONFIG.parse(response);
        return parsed;
    }
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
    async notify(config) {
        var _a, _b, _c, _d, _e, _f;
        if (!config.transactionId &&
            (((_a = __classPrivateFieldGet(this, _Interval_client, "f")) === null || _a === void 0 ? void 0 : _a.environment) === 'development' ||
                (!((_b = __classPrivateFieldGet(this, _Interval_client, "f")) === null || _b === void 0 ? void 0 : _b.environment) && !((_c = __classPrivateFieldGet(this, _Interval_apiKey, "f")) === null || _c === void 0 ? void 0 : _c.startsWith('live_'))))) {
            __classPrivateFieldGet(this, _Interval_instances, "a", _Interval_log_get).warn('Calls to notify() outside of a transaction currently have no effect when Interval is instantiated with a development API key. Please use a live key to send notifications.');
        }
        const clientHandlers = (_e = (_d = this.config).getClientHandlers) === null || _e === void 0 ? void 0 : _e.call(_d);
        if (clientHandlers) {
            clientHandlers.NOTIFY({
                ...config,
                transactionId: (_f = config.transactionId) !== null && _f !== void 0 ? _f : 'demo',
                deliveries: config.delivery || [
                    {
                        method: 'EMAIL',
                        to: 'demo@interval.com',
                    },
                ],
            });
            return;
        }
        let body;
        try {
            body = internalRpcSchema_1.NOTIFY.inputs.parse({
                ...config,
                deliveryInstructions: config.delivery,
                createdAt: new Date().toISOString(),
            });
        }
        catch (err) {
            __classPrivateFieldGet(this, _Interval_logger, "f").debug(err);
            throw new IntervalError_1.default('Invalid input.');
        }
        const response = await (0, cross_fetch_1.default)(`${__classPrivateFieldGet(this, _Interval_httpEndpoint, "f")}/api/notify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${__classPrivateFieldGet(this, _Interval_apiKey, "f")}`,
            },
            body: JSON.stringify(body),
        })
            .then(r => r.json())
            .then(r => internalRpcSchema_1.NOTIFY.returns.parseAsync(r))
            .catch(err => {
            __classPrivateFieldGet(this, _Interval_logger, "f").debug(err);
            throw new IntervalError_1.default('Received invalid API response.');
        });
        if (response.type === 'error') {
            throw new IntervalError_1.default(`There was a problem sending the notification: ${response.message}`);
        }
    }
    /**
     * Enqueue an action to be completed, with an optional `assignee` email to assign the action to, and optional `params` which will be passed to the action as `ctx.params`. Assigned actions will be displayed in users' dashboards as a task list.
     */
    async enqueue(slug, { assignee, params } = {}) {
        let body;
        try {
            const { json, meta } = params
                ? superjson_1.default.serialize(params)
                : { json: undefined, meta: undefined };
            body = internalRpcSchema_1.ENQUEUE_ACTION.inputs.parse({
                assignee,
                slug,
                params: json,
                paramsMeta: meta,
            });
        }
        catch (err) {
            __classPrivateFieldGet(this, _Interval_logger, "f").debug(err);
            throw new IntervalError_1.default('Invalid input.');
        }
        const response = await (0, cross_fetch_1.default)(__classPrivateFieldGet(this, _Interval_instances, "m", _Interval_getQueueAddress).call(this, 'enqueue'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${__classPrivateFieldGet(this, _Interval_apiKey, "f")}`,
            },
            body: JSON.stringify(body),
        })
            .then(r => r.json())
            .then(r => internalRpcSchema_1.ENQUEUE_ACTION.returns.parseAsync(r))
            .catch(err => {
            __classPrivateFieldGet(this, _Interval_logger, "f").debug(err);
            throw new IntervalError_1.default('Received invalid API response.');
        });
        if (response.type === 'error') {
            throw new IntervalError_1.default(`There was a problem enqueuing the action: ${response.message}`);
        }
        return {
            id: response.id,
            assignee,
            params,
        };
    }
    /**
     * Dequeue a previously assigned action which was created with `interval.enqueue()`.
     */
    async dequeue(id) {
        let body;
        try {
            body = internalRpcSchema_1.DEQUEUE_ACTION.inputs.parse({
                id,
            });
        }
        catch (err) {
            __classPrivateFieldGet(this, _Interval_logger, "f").debug(err);
            throw new IntervalError_1.default('Invalid input.');
        }
        const response = await (0, cross_fetch_1.default)(__classPrivateFieldGet(this, _Interval_instances, "m", _Interval_getQueueAddress).call(this, 'dequeue'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${__classPrivateFieldGet(this, _Interval_apiKey, "f")}`,
            },
            body: JSON.stringify(body),
        })
            .then(r => r.json())
            .then(r => internalRpcSchema_1.DEQUEUE_ACTION.returns.parseAsync(r))
            .catch(err => {
            __classPrivateFieldGet(this, _Interval_logger, "f").debug(err);
            throw new IntervalError_1.default('Received invalid API response.');
        });
        if (response.type === 'error') {
            throw new IntervalError_1.default(`There was a problem enqueuing the action: ${response.message}`);
        }
        let { type, params, paramsMeta, ...rest } = response;
        if (paramsMeta && params) {
            params = superjson_1.default.deserialize({ json: params, meta: paramsMeta });
        }
        return {
            ...rest,
            params,
        };
    }
}
exports.default = Interval;
exports.Interval = Interval;
_Interval_logger = new WeakMap(), _Interval_client = new WeakMap(), _Interval_apiKey = new WeakMap(), _Interval_httpEndpoint = new WeakMap(), _Interval_groupChangeCtx = new WeakMap(), _Interval_instances = new WeakSet(), _Interval_log_get = function _Interval_log_get() {
    return __classPrivateFieldGet(this, _Interval_logger, "f");
}, _Interval_getQueueAddress = function _Interval_getQueueAddress(path) {
    if (path.startsWith('/')) {
        path = path.substring(1);
    }
    return `${__classPrivateFieldGet(this, _Interval_httpEndpoint, "f")}/api/actions/${path}`;
};
