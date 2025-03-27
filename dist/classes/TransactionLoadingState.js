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
var _TransactionLoadingState_instances, _TransactionLoadingState_logger, _TransactionLoadingState_sender, _TransactionLoadingState_state, _TransactionLoadingState_sendTimeout, _TransactionLoadingState_sendTimeoutMs, _TransactionLoadingState_sendState;
Object.defineProperty(exports, "__esModule", { value: true });
class TransactionLoadingState {
    constructor(config) {
        _TransactionLoadingState_instances.add(this);
        _TransactionLoadingState_logger.set(this, void 0);
        _TransactionLoadingState_sender.set(this, void 0);
        _TransactionLoadingState_state.set(this, void 0);
        _TransactionLoadingState_sendTimeout.set(this, null);
        _TransactionLoadingState_sendTimeoutMs.set(this, 100);
        __classPrivateFieldSet(this, _TransactionLoadingState_sender, config.send, "f");
        __classPrivateFieldSet(this, _TransactionLoadingState_logger, config.logger, "f");
    }
    get state() {
        return { ...__classPrivateFieldGet(this, _TransactionLoadingState_state, "f") };
    }
    /**
     * Kicks off a loading spinner to provide context during any long-running action work. Can also be called with a single string argument as the label, or with no arguments to display only a spinner.
     *
     * **Usage:**
     *
     *```typescript
     * await ctx.loading.start({
     *   label: "Reticulating splines...",
     * });
     *
     * await ctx.loading.start("Label only shorthand");
     *```
     */
    async start(options) {
        if (typeof options === 'string') {
            options = { label: options };
        }
        else if (options === undefined) {
            options = {};
        }
        __classPrivateFieldSet(this, _TransactionLoadingState_state, { ...options }, "f");
        if (__classPrivateFieldGet(this, _TransactionLoadingState_state, "f").itemsInQueue) {
            __classPrivateFieldGet(this, _TransactionLoadingState_state, "f").itemsCompleted = 0;
        }
        return __classPrivateFieldGet(this, _TransactionLoadingState_instances, "m", _TransactionLoadingState_sendState).call(this);
    }
    /**
     * Updates any existing loading spinner initated with `ctx.loading.start` to dynamically provide new loading information to the action runner.
     *
     * **Usage:**
     *
     *```typescript
     * await ctx.loading.start({
     *   label: "Something is loading",
     *   description: "Mapping all the things",
     * });
     *
     * await ctx.loading.update({
     *   label: "Something is loading",
     *   description: "Now reducing all the things",
     * });
     *```
     */
    async update(options) {
        var _a;
        if (!__classPrivateFieldGet(this, _TransactionLoadingState_state, "f")) {
            __classPrivateFieldGet(this, _TransactionLoadingState_logger, "f").warn('Please call `loading.start` before `loading.update`');
            return this.start(options);
        }
        if (typeof options === 'string') {
            options = { label: options };
        }
        else if (options === undefined) {
            options = {};
        }
        Object.assign(__classPrivateFieldGet(this, _TransactionLoadingState_state, "f"), options);
        if (((_a = __classPrivateFieldGet(this, _TransactionLoadingState_state, "f")) === null || _a === void 0 ? void 0 : _a.itemsInQueue) && __classPrivateFieldGet(this, _TransactionLoadingState_state, "f").itemsCompleted === undefined) {
            __classPrivateFieldGet(this, _TransactionLoadingState_state, "f").itemsCompleted = 0;
        }
        return __classPrivateFieldGet(this, _TransactionLoadingState_instances, "m", _TransactionLoadingState_sendState).call(this);
    }
    /**
     * Marks a chunk of work as completed to dynamically provide granular loading progress. Can only be used after `ctx.loading.start` was called with `itemsInQueue`.
     *
     * **Usage:**
     *
     *```typescript
     * await ctx.loading.start({
     *   label: "Migrating users",
     *   description: "Enabling edit button for selected users",
     *   itemsInQueue: 100,
     * });
     *
     * for (const user of users) {
     *   migrateUser(user);
     *   await ctx.loading.completeOne();
     * }
     *```
     */
    async completeOne() {
        if (!__classPrivateFieldGet(this, _TransactionLoadingState_state, "f") || !__classPrivateFieldGet(this, _TransactionLoadingState_state, "f").itemsInQueue) {
            __classPrivateFieldGet(this, _TransactionLoadingState_logger, "f").warn('Please call `loading.start` with `itemsInQueue` before `loading.completeOne`, nothing to complete.');
            return;
        }
        if (__classPrivateFieldGet(this, _TransactionLoadingState_state, "f").itemsCompleted === undefined) {
            __classPrivateFieldGet(this, _TransactionLoadingState_state, "f").itemsCompleted = 0;
        }
        __classPrivateFieldGet(this, _TransactionLoadingState_state, "f").itemsCompleted++;
        return __classPrivateFieldGet(this, _TransactionLoadingState_instances, "m", _TransactionLoadingState_sendState).call(this);
    }
}
exports.default = TransactionLoadingState;
_TransactionLoadingState_logger = new WeakMap(), _TransactionLoadingState_sender = new WeakMap(), _TransactionLoadingState_state = new WeakMap(), _TransactionLoadingState_sendTimeout = new WeakMap(), _TransactionLoadingState_sendTimeoutMs = new WeakMap(), _TransactionLoadingState_instances = new WeakSet(), _TransactionLoadingState_sendState = async function _TransactionLoadingState_sendState() {
    if (!__classPrivateFieldGet(this, _TransactionLoadingState_sendTimeout, "f")) {
        // Buffer send calls for 100ms to prevent accidental DoSing with
        // many loading calls
        __classPrivateFieldSet(this, _TransactionLoadingState_sendTimeout, setTimeout(() => {
            var _a;
            __classPrivateFieldGet(this, _TransactionLoadingState_sender, "f").call(this, (_a = __classPrivateFieldGet(this, _TransactionLoadingState_state, "f")) !== null && _a !== void 0 ? _a : {}).catch(err => {
                __classPrivateFieldGet(this, _TransactionLoadingState_logger, "f").error('Failed sending loading state to Interval');
                __classPrivateFieldGet(this, _TransactionLoadingState_logger, "f").debug(err);
            });
            __classPrivateFieldSet(this, _TransactionLoadingState_sendTimeout, null, "f");
        }, __classPrivateFieldGet(this, _TransactionLoadingState_sendTimeoutMs, "f")), "f");
    }
};
