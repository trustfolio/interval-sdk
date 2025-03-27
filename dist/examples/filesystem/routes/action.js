"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const action = {
    name: 'File-based object-based action',
    description: 'Defined in a file, as a plain object',
    handler: async (io) => {
        await io.display.code("This file's source code", {
            code: fs_1.default.readFileSync(__filename, { encoding: 'utf8' }),
        });
    },
};
exports.default = action;
