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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ExperimentalInterval_instances, _ExperimentalInterval_respondToRequest, _ExperimentalInterval_declareHost;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = exports.Interval = exports.IntervalError = exports.ctx = exports.io = exports.Action = exports.Router = exports.ActionGroup = exports.Page = void 0;
const _1 = __importStar(require("."));
Object.defineProperty(exports, "io", { enumerable: true, get: function () { return _1.io; } });
Object.defineProperty(exports, "ctx", { enumerable: true, get: function () { return _1.ctx; } });
Object.defineProperty(exports, "IntervalError", { enumerable: true, get: function () { return _1.IntervalError; } });
const IntervalClient_1 = __importDefault(require("./classes/IntervalClient"));
const Page_1 = __importDefault(require("./classes/Page"));
exports.Page = Page_1.default;
exports.ActionGroup = Page_1.default;
exports.Router = Page_1.default;
const http_1 = require("./utils/http");
const Action_1 = __importDefault(require("./classes/Action"));
exports.Action = Action_1.default;
const Layout_1 = require("./classes/Layout");
Object.defineProperty(exports, "Layout", { enumerable: true, get: function () { return Layout_1.BasicLayout; } });
class ExperimentalInterval extends _1.default {
    constructor() {
        super(...arguments);
        _ExperimentalInterval_instances.add(this);
    }
    /*
     * Handle a serverless host endpoint request. Receives the deserialized request body object.
     */
    async handleRequest({ requestId, httpHostId, }) {
        if (requestId) {
            await __classPrivateFieldGet(this, _ExperimentalInterval_instances, "m", _ExperimentalInterval_respondToRequest).call(this, requestId);
            return true;
        }
        else if (httpHostId) {
            await __classPrivateFieldGet(this, _ExperimentalInterval_instances, "m", _ExperimentalInterval_declareHost).call(this, httpHostId);
            return true;
        }
        else {
            return false;
        }
    }
    // A getter that returns a function instead of a method to avoid `this` binding issues.
    get httpRequestHandler() {
        const interval = this;
        return async (req, res) => {
            // TODO: Proper headers
            if (req.method === 'GET') {
                return res.writeHead(200).end('OK');
            }
            if (req.method !== 'POST') {
                return res.writeHead(405).end();
            }
            try {
                const body = await (0, http_1.getRequestBody)(req);
                if (!body || typeof body !== 'object' || Array.isArray(body)) {
                    return res.writeHead(400).end();
                }
                const successful = await interval.handleRequest(body);
                return res.writeHead(successful ? 200 : 400).end();
            }
            catch (err) {
                interval.log.error('Error in HTTP request handler:', err);
                return res.writeHead(500).end();
            }
        };
    }
    // A getter that returns a function instead of a method to avoid `this` binding issues.
    get lambdaRequestHandler() {
        const interval = this;
        return async (event) => {
            function makeResponse(statusCode, body) {
                return {
                    isBase64Encoded: false,
                    statusCode,
                    body: body
                        ? typeof body === 'string'
                            ? body
                            : JSON.stringify(body)
                        : '',
                    headers: body && typeof body !== 'string'
                        ? {
                            'content-type': 'application/json',
                        }
                        : {},
                };
            }
            if (event.requestContext.http.method === 'GET') {
                return makeResponse(200);
            }
            if (event.requestContext.http.method !== 'POST') {
                return makeResponse(405);
            }
            try {
                let body;
                if (event.body) {
                    try {
                        body = JSON.parse(event.body);
                    }
                    catch (err) {
                        this.log.error('Failed parsing input body as JSON', event.body);
                    }
                }
                if (!body) {
                    return makeResponse(400);
                }
                const successful = await interval.handleRequest(body);
                return makeResponse(successful ? 200 : 500);
            }
            catch (err) {
                this.log.error('Error in Lambda handler', err);
                return makeResponse(500);
            }
        };
    }
}
exports.Interval = ExperimentalInterval;
_ExperimentalInterval_instances = new WeakSet(), _ExperimentalInterval_respondToRequest = 
/**
 * Always creates a new host connection to Interval and uses it only for the single request.
 */
async function _ExperimentalInterval_respondToRequest(requestId) {
    if (!requestId) {
        throw new Error('Missing request ID');
    }
    const client = new IntervalClient_1.default(this, this.config);
    const response = await client.respondToRequest(requestId);
    client.immediatelyClose();
    return response;
}, _ExperimentalInterval_declareHost = async function _ExperimentalInterval_declareHost(httpHostId) {
    const client = new IntervalClient_1.default(this, this.config);
    const response = await client.declareHost(httpHostId);
    client.immediatelyClose();
    return response;
};
exports.default = ExperimentalInterval;
