"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
try {
    dotenv_1.default.config({
        debug: true,
    });
}
catch (err) {
    console.error('Failed loading .env', err);
}
const schema = zod_1.z.object({
    DEMO_API_KEY: zod_1.z.string(),
    DEMO_PROD_API_KEY: zod_1.z.string(),
    S3_KEY_ID: zod_1.z.string().optional(),
    S3_KEY_SECRET: zod_1.z.string().optional(),
    S3_BUCKET: zod_1.z.string().optional(),
    S3_REGION: zod_1.z.string().optional(),
});
const validated = schema.parse(process.env);
exports.default = validated;
