"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function urlInput() {
    return {
        getValue(response) {
            // The client also validates URLs using the URL interface.
            return new URL(response);
        },
    };
}
exports.default = urlInput;
