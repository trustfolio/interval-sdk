"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = require("../utils/image");
function displayImage(props) {
    const size = props.size;
    delete props.size;
    props.width = size ? size : props.width;
    props.height = size ? size : props.height;
    if ('buffer' in props) {
        return {
            props: {
                ...props,
                url: (0, image_1.bufferToDataUrl)(props.buffer),
            },
        };
    }
    else {
        return { props };
    }
}
exports.default = displayImage;
