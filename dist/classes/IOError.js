"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IOError extends Error {
    constructor(kind, message, options) {
        super(message, options);
        this.kind = kind;
        this.name = 'IOError';
    }
}
exports.default = IOError;
