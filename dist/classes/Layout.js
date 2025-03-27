"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.META_ITEM_SCHEMA = exports.LAYOUT_SCHEMA = exports.BASIC_LAYOUT_SCHEMA = exports.LAYOUT_ERROR_SCHEMA = exports.META_ITEMS_SCHEMA = exports.BasicLayout = void 0;
const zod_1 = require("zod");
const ioSchema_1 = require("../ioSchema");
Object.defineProperty(exports, "META_ITEM_SCHEMA", { enumerable: true, get: function () { return ioSchema_1.metaItemSchema; } });
// Base class
class BasicLayout {
    constructor(config) {
        this.title = config.title;
        this.description = config.description;
        this.children = config.children;
        this.menuItems = config.menuItems;
        this.errors = [];
    }
}
exports.BasicLayout = BasicLayout;
// For superjson (de)serialization
exports.META_ITEMS_SCHEMA = zod_1.z.object({
    json: zod_1.z.array(ioSchema_1.metaItemSchema),
    meta: zod_1.z.any(),
});
exports.LAYOUT_ERROR_SCHEMA = zod_1.z.object({
    layoutKey: zod_1.z.string().optional(),
    error: zod_1.z.string(),
    message: zod_1.z.string(),
    cause: zod_1.z.string().optional(),
    stack: zod_1.z.string().optional(),
});
exports.BASIC_LAYOUT_SCHEMA = zod_1.z.object({
    kind: zod_1.z.literal('BASIC'),
    title: zod_1.z.string().nullish(),
    description: zod_1.z.string().nullish(),
    children: ioSchema_1.IO_RENDER.nullish(),
    metadata: exports.META_ITEMS_SCHEMA.optional(),
    menuItems: zod_1.z.array(ioSchema_1.buttonItem).nullish(),
    errors: zod_1.z.array(exports.LAYOUT_ERROR_SCHEMA).nullish(),
});
// To be extended with z.discriminatedUnion when adding different pages
exports.LAYOUT_SCHEMA = exports.BASIC_LAYOUT_SCHEMA;
