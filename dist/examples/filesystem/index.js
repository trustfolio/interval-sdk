"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const __1 = __importDefault(require("../.."));
const env_1 = __importDefault(require("../../env"));
const interval = new __1.default({
    apiKey: env_1.default.DEMO_API_KEY,
    logLevel: 'debug',
    endpoint: 'ws://localhost:3000/websocket',
    routesDirectory: path_1.default.resolve(__dirname, 'routes'),
});
interval.listen();
