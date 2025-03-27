"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferToDataUrl = void 0;
const IntervalError_1 = __importDefault(require("../classes/IntervalError"));
const MAX_BUFFER_SIZE_MB = 50;
function bufferToDataUrl(buffer) {
    if (Buffer.byteLength(buffer) > MAX_BUFFER_SIZE_MB * 1000 * 1000) {
        throw new IntervalError_1.default(`Buffer for image is too large, must be under ${MAX_BUFFER_SIZE_MB} MB`);
    }
    const data = buffer.toString('base64');
    // using first character as a simple check for common image formats:
    // https://stackoverflow.com/questions/27886677/javascript-get-extension-from-base64-image/50111377#50111377
    // image/unknown actually seems to just work for all the types I've
    // encountered, but we can expand this switch if we need to
    let mime;
    switch (data[0]) {
        case 'i':
            mime = 'image/png';
            break;
        case 'R':
            mime = 'image/gif';
            break;
        case '/':
            mime = 'image/jpeg';
            break;
        case 'U':
            mime = 'image/webp';
            break;
        default:
            mime = 'image/unknown';
            break;
    }
    return `data:${mime};base64,${data}`;
}
exports.bufferToDataUrl = bufferToDataUrl;
