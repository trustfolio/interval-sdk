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
const index_1 = __importStar(require("../../index"));
const env_1 = __importDefault(require("../../env"));
const interval = new index_1.default({
    apiKey: env_1.default.DEMO_PROD_API_KEY,
    logLevel: 'debug',
    endpoint: 'ws://localhost:3000/websocket',
    routes: {
        page: new index_1.Page({
            name: 'IO Example',
            description: 'This is an example of the Interval SDK',
            handler: async () => {
                return new index_1.Layout({
                    children: [index_1.io.display.markdown('Hello world')],
                });
            },
        }),
        identity: async () => {
            await index_1.io.confirmIdentity('Confirm identity');
        },
        datetime: async () => {
            const datetime = await index_1.io.input.datetime('Enter datetime', {
                min: new Date(2000, 0, 1, 7, 30),
                max: {
                    year: 2022,
                    month: 12,
                    day: 30,
                    hour: 13,
                    minute: 0,
                },
            });
            return datetime;
        },
        hello_world: async () => {
            const [name, email] = await index_1.io.group([
                // implemented by ui package
                index_1.io.input.text('What is your name?'),
                // not yet implemented; should fall back to the web client's component
                index_1.io.input.email('What is your email?'),
                index_1.io.display.table('Table', {
                    data: [
                        ['a', 'b', 'c'],
                        ['d', 'e', 'f'],
                        ['g', 'h', 'i'],
                    ],
                }),
            ]);
            return `Hello ${name}! Your email is ${email}.`;
        },
    },
});
interval.listen();
