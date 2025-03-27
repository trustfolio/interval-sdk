"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../index"));
const helpers_1 = require("../utils/helpers");
const env_1 = __importDefault(require("../../env"));
const interval = new index_1.default({
    apiKey: env_1.default.DEMO_API_KEY,
    logLevel: 'debug',
    endpoint: 'ws://localhost:3000/websocket',
    routes: {
        wait_a_while: async (io, ctx) => {
            await ctx.loading.start('Waiting...');
            await (0, helpers_1.sleep)(5000);
            return 'Done!';
        },
    },
});
interval.listen();
process.on('SIGINT', () => {
    interval
        .safelyClose()
        .then(() => {
        console.log('Shut down!');
        process.exit(0);
    })
        .catch(err => {
        console.error('Failed shutting down gracefully, forcibly closing connection');
        interval.immediatelyClose();
        process.exit(0);
    });
});
