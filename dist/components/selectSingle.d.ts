import { z } from 'zod';
import { T_IO_PROPS, T_IO_RETURNS, richSelectOption, primitiveValue } from '../ioSchema';
import Logger from '../classes/Logger';
type SelectSingleProps<Option extends z.infer<typeof richSelectOption> | z.infer<typeof primitiveValue>> = Omit<T_IO_PROPS<'SELECT_SINGLE'>, 'options' | 'defaultValue'> & {
    options: Option[];
    defaultValue?: Option;
};
export default function selectSingle(logger: Logger): <Option extends string | number | boolean | Date | z.objectOutputType<{
    label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
    value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    imageUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    image: z.ZodOptional<z.ZodObject<{
        alt: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodEnum<["thumbnail", "small", "medium", "large"]>>;
        width: z.ZodOptional<z.ZodEnum<["thumbnail", "small", "medium", "large"]>>;
        height: z.ZodOptional<z.ZodEnum<["thumbnail", "small", "medium", "large"]>>;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        url: string;
        alt?: string | undefined;
        size?: "thumbnail" | "small" | "medium" | "large" | undefined;
        width?: "thumbnail" | "small" | "medium" | "large" | undefined;
        height?: "thumbnail" | "small" | "medium" | "large" | undefined;
    }, {
        url: string;
        alt?: string | undefined;
        size?: "thumbnail" | "small" | "medium" | "large" | undefined;
        width?: "thumbnail" | "small" | "medium" | "large" | undefined;
        height?: "thumbnail" | "small" | "medium" | "large" | undefined;
    }>>;
}, z.ZodTypeAny, "passthrough">>(props: SelectSingleProps<Option>) => {
    props: {
        defaultValue: {
            value: string | number | boolean | Date;
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
        } | undefined;
        options: {
            value: string | number | boolean | Date;
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
        disabled?: boolean | undefined;
        helpText?: string | undefined;
        searchable?: boolean | undefined;
    };
    getValue(response: T_IO_RETURNS<'SELECT_SINGLE'>): Option;
};
export {};
