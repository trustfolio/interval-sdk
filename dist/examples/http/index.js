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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const experimental_1 = __importStar(require("../../experimental"));
const ioMethodWrappers_1 = require("../utils/ioMethodWrappers");
const env_1 = __importDefault(require("../../env"));
const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
const interval = new experimental_1.default({
    apiKey: env_1.default.DEMO_PROD_API_KEY,
    logLevel: 'debug',
    endpoint: 'ws://localhost:3000/websocket',
    routes: {
        hello_http: async (io) => {
            const message = await io.input.text('Enter a message');
            return `"${message}", from HTTP!`;
        },
        hello_http_pages: new experimental_1.Page({
            name: 'Hello, HTTP pages!',
            handler: async () => {
                return new experimental_1.Layout({
                    title: 'Inside a page via HTTP',
                    children: [(0, ioMethodWrappers_1.asyncTable)(500)],
                });
            },
            routes: {
                sub_action: async () => {
                    return 'Hello, from a sub action!';
                },
            },
        }),
    },
});
const port = process.env.PORT ? Number(process.env.PORT) : 5000;
const server = http_1.default.createServer(async (req, res) => {
    // Simulate a slow cold-start time for a serverless function
    await sleep(2000);
    return interval.httpRequestHandler(req, res);
});
server.listen(port);
console.log(`Listening on http://localhost:${port}`);
