"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateS3Urls = void 0;
const env_1 = __importDefault(require("../../env"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
async function generateS3Urls(key) {
    var _a;
    if (!env_1.default.S3_KEY_ID || !env_1.default.S3_KEY_SECRET || !env_1.default.S3_BUCKET) {
        throw new Error('Missing S3 credentials');
    }
    const s3Client = new client_s3_1.S3Client({
        region: (_a = env_1.default.S3_REGION) !== null && _a !== void 0 ? _a : 'us-west-1',
        credentials: {
            accessKeyId: env_1.default.S3_KEY_ID,
            secretAccessKey: env_1.default.S3_KEY_SECRET,
        },
    });
    const command = new client_s3_1.PutObjectCommand({
        Bucket: env_1.default.S3_BUCKET,
        Key: key,
    });
    const uploadUrl = await (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, {
        expiresIn: 3600, // 1 hour
    });
    const url = new URL(uploadUrl);
    const downloadUrl = url.origin + url.pathname;
    return { uploadUrl, downloadUrl };
}
exports.generateS3Urls = generateS3Urls;
