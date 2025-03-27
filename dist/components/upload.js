"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
const path_1 = __importDefault(require("path"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const __1 = require("..");
const MAX_RETRIES = 3;
async function retryFetch(url) {
    for (let i = 1; i <= MAX_RETRIES; i++) {
        try {
            const r = await (0, cross_fetch_1.default)(url);
            return r;
        }
        catch (err) {
            if (i === MAX_RETRIES) {
                throw err;
            }
        }
    }
    // This should never happen, final failing response err would be thrown above
    throw new __1.IntervalError('Failed to fetch file.');
}
function file(logger) {
    return function ({ generatePresignedUrls, ...props }) {
        const isProvidingUrls = !!generatePresignedUrls;
        return {
            props: {
                ...props,
                fileUrls: isProvidingUrls ? null : undefined,
            },
            getValue({ url, ...response }) {
                return {
                    ...response,
                    lastModified: new Date(response.lastModified),
                    get extension() {
                        return path_1.default.extname(response.name);
                    },
                    async url() {
                        return url;
                    },
                    async text() {
                        return retryFetch(url).then(r => r.text());
                    },
                    async json() {
                        return retryFetch(url).then(r => r.json());
                    },
                    async buffer() {
                        return retryFetch(url)
                            .then(r => r.arrayBuffer())
                            .then(arrayBuffer => Buffer.from(arrayBuffer));
                    },
                };
            },
            async onStateChange(newState) {
                if (!generatePresignedUrls || !newState.files) {
                    return { fileUrls: undefined };
                }
                return {
                    fileUrls: await Promise.all(newState.files.map(fileState => generatePresignedUrls(fileState))),
                };
            },
        };
    };
}
exports.file = file;
