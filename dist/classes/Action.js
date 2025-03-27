"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Action {
    constructor(def) {
        if (typeof def === 'function') {
            this.handler = def;
        }
        else {
            Object.assign(this, def);
            // to appease typescript
            this.handler = def.handler;
        }
    }
}
exports.default = Action;
