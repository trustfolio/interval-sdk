/// <reference types="node" />
import { T_IO_PROPS, ImageSize } from '../ioSchema';
export default function displayImage(props: {
    alt?: T_IO_PROPS<'DISPLAY_IMAGE'>['alt'];
    width?: T_IO_PROPS<'DISPLAY_IMAGE'>['width'];
    height?: T_IO_PROPS<'DISPLAY_IMAGE'>['height'];
    size?: ImageSize;
} & ({
    url: string;
} | {
    buffer: Buffer;
})): {
    props: {
        alt?: T_IO_PROPS<'DISPLAY_IMAGE'>['alt'];
        width?: T_IO_PROPS<'DISPLAY_IMAGE'>['width'];
        height?: T_IO_PROPS<'DISPLAY_IMAGE'>['height'];
        size?: "thumbnail" | "small" | "medium" | "large" | undefined;
    } & {
        url: string;
    };
};
