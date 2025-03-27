"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const __1 = require("../../../..");
exports.default = new __1.Page({
    name: 'Default export Page',
    description: 'This has both inline and file-based actions',
    unlisted: false,
    routes: {
        inline: async () => 'Inline!',
    },
    handler: async () => new __1.Layout({
        title: 'routes/page2/index.ts',
        children: [
            __1.io.display.code("This file's source code", {
                code: fs_1.default.readFileSync(__filename, { encoding: 'utf8' }),
            }),
        ],
    }),
});
