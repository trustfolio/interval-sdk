/// <reference types="node" />
import { T_IO_PROPS, ImageSize } from '../ioSchema';
export default function displayVideo(props: {
    width?: T_IO_PROPS<'DISPLAY_VIDEO'>['width'];
    height?: T_IO_PROPS<'DISPLAY_VIDEO'>['height'];
    size?: ImageSize;
    muted?: T_IO_PROPS<'DISPLAY_VIDEO'>['muted'];
    loop?: T_IO_PROPS<'DISPLAY_VIDEO'>['loop'];
} & ({
    url: string;
} | {
    buffer: Buffer;
})): {
    props: {
        url: string;
        width?: T_IO_PROPS<'DISPLAY_VIDEO'>['width'];
        height?: T_IO_PROPS<'DISPLAY_VIDEO'>['height'];
        size?: "thumbnail" | "small" | "medium" | "large" | undefined;
        muted?: T_IO_PROPS<'DISPLAY_VIDEO'>['muted'];
        loop?: T_IO_PROPS<'DISPLAY_VIDEO'>['loop'];
        buffer: Buffer;
    };
    prepareProps(props: T_IO_PROPS<'DISPLAY_VIDEO'>): Promise<{
        url: string;
        width?: "thumbnail" | "small" | "medium" | "large" | undefined;
        height?: "thumbnail" | "small" | "medium" | "large" | undefined;
        loop?: boolean | undefined;
        muted?: boolean | undefined;
    }>;
} | {
    props: {
        width?: T_IO_PROPS<'DISPLAY_VIDEO'>['width'];
        height?: T_IO_PROPS<'DISPLAY_VIDEO'>['height'];
        size?: "thumbnail" | "small" | "medium" | "large" | undefined;
        muted?: T_IO_PROPS<'DISPLAY_VIDEO'>['muted'];
        loop?: T_IO_PROPS<'DISPLAY_VIDEO'>['loop'];
    } & {
        url: string;
    };
};
