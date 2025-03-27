"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Page_groupChangeCtx;
Object.defineProperty(exports, "__esModule", { value: true });
const evt_1 = require("evt");
class Page {
    constructor(config) {
        _Page_groupChangeCtx.set(this, evt_1.Evt.newCtx());
        this.name = config.name;
        this.description = config.description;
        this.unlisted = config.unlisted;
        this.routes = {
            ...config.routes,
            ...config.actions,
            ...config.groups,
        };
        this.access = config.access;
        this.handler = config.handler;
        this.onChange = new evt_1.Evt();
        for (const actionOrGroup of Object.values(this.routes)) {
            if (actionOrGroup instanceof Page) {
                actionOrGroup.onChange.attach(__classPrivateFieldGet(this, _Page_groupChangeCtx, "f"), this.onChange.post);
            }
        }
    }
    add(slug, route) {
        this.routes[slug] = route;
        if (route instanceof Page) {
            route.onChange.attach(__classPrivateFieldGet(this, _Page_groupChangeCtx, "f"), this.onChange.post);
        }
        this.onChange.post();
    }
    remove(slug) {
        const route = this.routes[slug];
        if (route) {
            if (route instanceof Page) {
                route.onChange.detach(__classPrivateFieldGet(this, _Page_groupChangeCtx, "f"));
            }
            delete this.routes[slug];
            this.onChange.post();
        }
    }
}
exports.default = Page;
_Page_groupChangeCtx = new WeakMap();
