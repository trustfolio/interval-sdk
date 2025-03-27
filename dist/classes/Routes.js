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
var _Routes_logger, _Routes_apiKey, _Routes_endpoint, _Routes_groupChangeCtx;
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
/**
 * This is effectively a namespace inside of Interval with a little bit of its own state.
 */
class Routes {
    constructor(interval, endpoint, logger, ctx, apiKey) {
        _Routes_logger.set(this, void 0);
        _Routes_apiKey.set(this, void 0);
        _Routes_endpoint.set(this, void 0);
        _Routes_groupChangeCtx.set(this, void 0);
        this.interval = interval;
        __classPrivateFieldSet(this, _Routes_apiKey, apiKey, "f");
        __classPrivateFieldSet(this, _Routes_logger, logger, "f");
        __classPrivateFieldSet(this, _Routes_endpoint, endpoint + '/api/actions', "f");
        __classPrivateFieldSet(this, _Routes_groupChangeCtx, ctx, "f");
    }
    /**
     * @deprecated Use `interval.enqueue()` instead.
     */
    async enqueue(slug, args = {}) {
        return this.interval.enqueue(slug, args);
    }
    /**
     * @deprecated Use `interval.dequeue()` instead.
     */
    async dequeue(id) {
        return this.interval.dequeue(id);
    }
    add(slug, route) {
        var _a;
        if (!this.interval.config.routes) {
            this.interval.config.routes = {};
        }
        if (route instanceof __1.Page) {
            route.onChange.attach(__classPrivateFieldGet(this, _Routes_groupChangeCtx, "f"), () => {
                var _a;
                (_a = this.interval.client) === null || _a === void 0 ? void 0 : _a.handleActionsChange(this.interval.config);
            });
        }
        this.interval.config.routes[slug] = route;
        (_a = this.interval.client) === null || _a === void 0 ? void 0 : _a.handleActionsChange(this.interval.config);
    }
    remove(slug) {
        var _a;
        for (const key of ['routes', 'actions', 'groups']) {
            const routes = this.interval.config[key];
            if (!routes)
                continue;
            const route = routes[slug];
            if (!route)
                continue;
            if (route instanceof __1.Page) {
                route.onChange.detach(__classPrivateFieldGet(this, _Routes_groupChangeCtx, "f"));
            }
            delete routes[slug];
            (_a = this.interval.client) === null || _a === void 0 ? void 0 : _a.handleActionsChange(this.interval.config);
            return;
        }
    }
}
exports.default = Routes;
_Routes_logger = new WeakMap(), _Routes_apiKey = new WeakMap(), _Routes_endpoint = new WeakMap(), _Routes_groupChangeCtx = new WeakMap();
