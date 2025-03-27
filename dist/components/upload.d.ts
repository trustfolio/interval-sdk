/// <reference types="node" />
import { T_IO_PROPS, T_IO_RETURNS, T_IO_STATE } from '../ioSchema';
import Logger from '../classes/Logger';
type UploaderProps = T_IO_PROPS<'UPLOAD_FILE'> & {
    generatePresignedUrls?: (state: NonNullable<T_IO_STATE<'UPLOAD_FILE'>['files']>[0]) => Promise<{
        uploadUrl: string;
        downloadUrl: string;
    }>;
};
export declare function file(logger: Logger): ({ generatePresignedUrls, ...props }: UploaderProps) => {
    props: {
        fileUrls: null | undefined;
        disabled?: boolean | undefined;
        helpText?: string | undefined;
        allowedExtensions?: string[] | undefined;
        uploadUrl?: string | null | undefined;
        downloadUrl?: string | null | undefined;
    };
    getValue({ url, ...response }: T_IO_RETURNS<'UPLOAD_FILE'>): {
        lastModified: Date;
        extension: string;
        url(): Promise<string>;
        text(): Promise<string>;
        json(): Promise<any>;
        buffer(): Promise<Buffer>;
        type: string;
        size: number;
        name: string;
    };
    onStateChange(newState: T_IO_STATE<'UPLOAD_FILE'>): Promise<{
        fileUrls: undefined;
    } | {
        fileUrls: {
            uploadUrl: string;
            downloadUrl: string;
        }[];
    }>;
};
export {};
