import { z } from 'zod';
import type { T_IO_PROPS, T_IO_RETURNS } from '../ioSchema';
import { COLUMN_DEFS } from '../utils/spreadsheet';
export default function spreadsheet<Columns extends T_IO_PROPS<'INPUT_SPREADSHEET'>['columns']>(_props: Omit<T_IO_PROPS<'INPUT_SPREADSHEET'>, 'columns' | 'defaultValue'> & {
    columns: Columns;
    defaultValue?: {
        [key in keyof Columns]: z.infer<typeof COLUMN_DEFS[Columns[key]]>;
    }[];
}): {
    getValue(response: T_IO_RETURNS<'INPUT_SPREADSHEET'>): { [key in keyof Columns]: z.TypeOf<{
        number: z.ZodNumber;
        'number?': z.ZodNullable<z.ZodNumber>;
        string: z.ZodString;
        'string?': z.ZodNullable<z.ZodString>;
        boolean: z.ZodBoolean;
        'boolean?': z.ZodNullable<z.ZodBoolean>;
    }[Columns[key]]>; }[];
};
