"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const MAX_BUFFER_SIZE_MB = 50;
function displayVideo(props) {
    const size = props.size;
    delete props.size;
    props.width = size ? size : props.width;
    props.height = size ? size : props.height;
    if ('buffer' in props) {
        if (Buffer.byteLength(props.buffer) > MAX_BUFFER_SIZE_MB * 1000 * 1000) {
            throw new __1.IntervalError(`Buffer for io.display.video is too large, must be under ${MAX_BUFFER_SIZE_MB} MB`);
        }
        const data = props.buffer.toString('base64');
        // using first character as a simple check for common video formats:
        let mime;
        switch (data[0]) {
            case 'A':
                mime = 'video/mp4';
                break;
            case 'G':
                mime = 'video/webm';
                break;
            case 'T':
                mime = 'video/ogg';
                break;
            case 'U':
                mime = 'video/avi';
                break;
            default:
                // A fallback of `video/unknown` doesn't work like it does for images.
                // Various formats seem to play fine in chrome with mp4.
                // Still relying on the switch ^^ for correctness though.
                mime = 'video/mp4';
                break;
        }
        return {
            props: {
                ...props,
                url: `data:${mime};base64,${data}`,
            },
            async prepareProps(props) {
                return props;
            },
        };
    }
    else {
        return { props };
    }
}
exports.default = displayVideo;
