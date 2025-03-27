"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLUMN_DEFS = exports.extractColumns = void 0;
const zod_1 = require("zod");
function extractColumns(columns) {
    const outputSchemaDef = {};
    for (const [col, typeDef] of Object.entries(columns)) {
        outputSchemaDef[col] = exports.COLUMN_DEFS[typeDef];
    }
    return zod_1.z.array(zod_1.z.object(outputSchemaDef));
}
exports.extractColumns = extractColumns;
exports.COLUMN_DEFS = {
    number: zod_1.z.number(),
    'number?': zod_1.z.number().nullable(),
    string: zod_1.z.string(),
    'string?': zod_1.z.string().nullable(),
    boolean: zod_1.z.boolean(),
    'boolean?': zod_1.z.boolean().nullable(),
};
