import type { ImageSchema, T_IO_PROPS, T_IO_RETURNS, T_IO_STATE } from '../ioSchema';
type RenderResultDef = string | number | boolean | Date | {
    label: string | number | boolean | Date;
    description?: string;
    image?: ImageSchema;
    /**
     * @deprecated Deprecated in favor of `image.url`.
     */
    imageUrl?: string;
};
type DefaultValue = T_IO_PROPS<'SEARCH'>['defaultValue'];
export default function search<Result = any>({ onSearch, initialResults, defaultValue, renderResult, disabled, ...rest }: {
    placeholder?: string;
    helpText?: string;
    disabled?: boolean;
    initialResults?: Result[];
    defaultValue?: Result;
    renderResult: (result: Result) => RenderResultDef;
    onSearch: (query: string) => Promise<Result[]>;
}): {
    props: {
        results: {
            value: string;
            label: string | number | boolean | Date;
            description?: string | null | undefined;
            imageUrl?: string | null | undefined;
            image?: {
                url: string;
                alt?: string | undefined;
                size?: "thumbnail" | "small" | "medium" | "large" | undefined;
                width?: "thumbnail" | "small" | "medium" | "large" | undefined;
                height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            } | undefined;
        }[];
        defaultValue?: string | null | undefined;
        disabled?: boolean | undefined;
        helpText?: string | undefined;
        placeholder?: string | undefined;
    };
    getValue(response: T_IO_RETURNS<'SEARCH'>): Result;
    getDefaultValue: (defaultValue: Result) => DefaultValue;
    onStateChange(newState: T_IO_STATE<'SEARCH'>): Promise<{
        results: {
            value: string;
            label: string | number | boolean | Date;
            description?: string | null | undefined;
            imageUrl?: string | null | undefined;
            image?: {
                url: string;
                alt?: string | undefined;
                size?: "thumbnail" | "small" | "medium" | "large" | undefined;
                width?: "thumbnail" | "small" | "medium" | "large" | undefined;
                height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            } | undefined;
        }[];
    }>;
};
export {};
