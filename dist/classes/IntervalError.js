"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IntervalError extends Error {
    constructor(message) {
        super(message);
        this.name = 'IntervalError';
    }
}
exports.default = IntervalError;
