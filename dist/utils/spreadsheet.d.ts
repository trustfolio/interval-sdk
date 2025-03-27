import { z } from 'zod';
import { ioSchema } from '../ioSchema';
export declare function extractColumns<Props extends z.infer<typeof ioSchema['INPUT_SPREADSHEET']['props']>, Columns extends Props['columns']>(columns: Columns): z.ZodArray<z.ZodObject<{ [key in keyof Columns]: {
    number: z.ZodNumber;
    'number?': z.ZodNullable<z.ZodNumber>;
    string: z.ZodString;
    'string?': z.ZodNullable<z.ZodString>;
    boolean: z.ZodBoolean;
    'boolean?': z.ZodNullable<z.ZodBoolean>;
}[Columns[key]]; }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{ [key in keyof Columns]: {
    number: z.ZodNumber;
    'number?': z.ZodNullable<z.ZodNumber>;
    string: z.ZodString;
    'string?': z.ZodNullable<z.ZodString>;
    boolean: z.ZodBoolean;
    'boolean?': z.ZodNullable<z.ZodBoolean>;
}[Columns[key]]; }>, any> extends infer T ? { [k in keyof T]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{ [key in keyof Columns]: {
    number: z.ZodNumber;
    'number?': z.ZodNullable<z.ZodNumber>;
    string: z.ZodString;
    'string?': z.ZodNullable<z.ZodString>;
    boolean: z.ZodBoolean;
    'boolean?': z.ZodNullable<z.ZodBoolean>;
}[Columns[key]]; }>, any>[k]; } : never, z.baseObjectInputType<{ [key in keyof Columns]: {
    number: z.ZodNumber;
    'number?': z.ZodNullable<z.ZodNumber>;
    string: z.ZodString;
    'string?': z.ZodNullable<z.ZodString>;
    boolean: z.ZodBoolean;
    'boolean?': z.ZodNullable<z.ZodBoolean>;
}[Columns[key]]; }> extends infer T_1 ? { [k_1 in keyof T_1]: z.baseObjectInputType<{ [key in keyof Columns]: {
    number: z.ZodNumber;
    'number?': z.ZodNullable<z.ZodNumber>;
    string: z.ZodString;
    'string?': z.ZodNullable<z.ZodString>;
    boolean: z.ZodBoolean;
    'boolean?': z.ZodNullable<z.ZodBoolean>;
}[Columns[key]]; }>[k_1]; } : never>, "many">;
export declare const COLUMN_DEFS: {
    number: z.ZodNumber;
    'number?': z.ZodNullable<z.ZodNumber>;
    string: z.ZodString;
    'string?': z.ZodNullable<z.ZodString>;
    boolean: z.ZodBoolean;
    'boolean?': z.ZodNullable<z.ZodBoolean>;
};
