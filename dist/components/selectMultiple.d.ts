import { z } from 'zod';
import { T_IO_PROPS, T_IO_RETURNS, labelValue, primitiveValue } from '../ioSchema';
import Logger from '../classes/Logger';
type SelectMultipleProps<Option extends z.infer<typeof labelValue> | z.infer<typeof primitiveValue>> = Omit<T_IO_PROPS<'SELECT_MULTIPLE'>, 'options' | 'defaultValue'> & {
    options: Option[];
    defaultValue?: Option[];
};
export default function selectMultiple(logger: Logger): <Option extends string | number | boolean | Date | z.objectOutputType<{
    label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
    value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
}, z.ZodTypeAny, "passthrough">>(props: SelectMultipleProps<Option>) => {
    props: {
        defaultValue: {
            value: string | number | boolean | Date;
            label: string | number | boolean | Date;
        }[] | undefined;
        options: {
            value: string | number | boolean | Date;
            label: string | number | boolean | Date;
        }[];
        disabled?: boolean | undefined;
        helpText?: string | undefined;
        minSelections?: number | undefined;
        maxSelections?: number | undefined;
    };
    getValue(response: T_IO_RETURNS<'SELECT_MULTIPLE'>): Option[];
};
export {};
