"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioSchema = exports.metaItemSchema = exports.supportsMultiple = exports.resolvesImmediately = exports.dateTimeObject = exports.timeObject = exports.dateObject = exports.currencyCode = exports.CURRENCIES = exports.internalGridItem = exports.backwardCompatibleGridItem = exports.gridItem = exports.internalTableColumn = exports.internalTableRow = exports.legacyLinkSchema = exports.linkSchema = exports.buttonItem = exports.menuItem = exports.tableRow = exports.tableRowValue = exports.advancedPrimitive = exports.highlightColor = exports.richSelectOption = exports.imageSchema = exports.imageSize = exports.serializableRecord = exports.serializableSchema = exports.deserializableRecord = exports.deserializableSchema = exports.labelValue = exports.primitiveValue = exports.typeValue = exports.IO_RESPONSE = exports.IO_RENDER = exports.DISPLAY_RENDER = exports.COMPONENT_TO_RENDER = exports.INPUT_COMPONENT_TO_RENDER = exports.DISPLAY_COMPONENT_TO_RENDER = void 0;
const zod_1 = require("zod");
exports.DISPLAY_COMPONENT_TO_RENDER = zod_1.z.object({
    methodName: zod_1.z.string(),
    label: zod_1.z.string(),
    props: zod_1.z.any(),
    propsMeta: zod_1.z.any().optional(),
    isStateful: zod_1.z.boolean().optional().default(false),
});
exports.INPUT_COMPONENT_TO_RENDER = exports.DISPLAY_COMPONENT_TO_RENDER.merge(zod_1.z.object({
    isMultiple: zod_1.z.boolean().optional().default(false),
    isOptional: zod_1.z.boolean().optional().default(false),
    validationErrorMessage: zod_1.z.string().nullish(),
    multipleProps: zod_1.z
        .optional(zod_1.z.object({
        defaultValue: zod_1.z.optional(zod_1.z.array(zod_1.z.any())).nullable(),
    }))
        .nullable(),
}));
exports.COMPONENT_TO_RENDER = exports.INPUT_COMPONENT_TO_RENDER;
exports.DISPLAY_RENDER = zod_1.z.object({
    id: zod_1.z.string(),
    inputGroupKey: zod_1.z.string(),
    toRender: zod_1.z.array(exports.DISPLAY_COMPONENT_TO_RENDER),
    kind: zod_1.z.literal('RENDER'),
});
// `default` deprecated in 0.31.0
const buttonTheme = zod_1.z.enum(['default', 'primary', 'secondary', 'danger']);
exports.IO_RENDER = zod_1.z.object({
    id: zod_1.z.string(),
    inputGroupKey: zod_1.z.string(),
    toRender: zod_1.z.array(exports.COMPONENT_TO_RENDER),
    validationErrorMessage: zod_1.z.string().nullish(),
    choiceButtons: zod_1.z
        .array(zod_1.z.object({
        label: zod_1.z.string(),
        value: zod_1.z.string(),
        theme: buttonTheme.optional(),
    }))
        .nullish(),
    continueButton: zod_1.z
        .object({
        label: zod_1.z.string().optional(),
        theme: buttonTheme.optional(),
    })
        .optional(),
    kind: zod_1.z.literal('RENDER'),
});
exports.IO_RESPONSE = zod_1.z.object({
    id: zod_1.z.string(),
    inputGroupKey: zod_1.z.string().optional(),
    transactionId: zod_1.z.string(),
    kind: zod_1.z.union([
        zod_1.z.literal('RETURN'),
        zod_1.z.literal('SET_STATE'),
        zod_1.z.literal('CANCELED'),
    ]),
    choice: zod_1.z.string().optional(),
    values: zod_1.z.array(zod_1.z.any()),
    valuesMeta: zod_1.z.any().optional(),
});
exports.typeValue = zod_1.z.enum([
    'string',
    'string?',
    'number',
    'number?',
    'boolean',
    'boolean?',
]);
exports.primitiveValue = zod_1.z.union([
    zod_1.z.string(),
    zod_1.z.number(),
    zod_1.z.boolean(),
    zod_1.z.date(),
]);
const objectLiteralSchema = exports.primitiveValue.nullish();
exports.labelValue = zod_1.z
    .object({
    label: exports.primitiveValue,
    value: exports.primitiveValue,
})
    .passthrough();
const keyValueObject = zod_1.z.lazy(() => zod_1.z.union([
    objectLiteralSchema,
    zod_1.z.record(keyValueObject),
    zod_1.z.array(keyValueObject),
    // This `any` isn't ideal, but at the end of the day this is going to be
    // passed through `JSON.serialize`, which accepts `any`.
    // Worst case scenario is something will be stringified, which is fine for display anyway.
    zod_1.z.any(),
]));
exports.deserializableSchema = zod_1.z.union([
    zod_1.z.string(),
    zod_1.z.number(),
    zod_1.z.boolean(),
    zod_1.z.null(),
    zod_1.z.undefined(),
]);
exports.deserializableRecord = zod_1.z.record(exports.deserializableSchema);
exports.serializableSchema = exports.deserializableSchema
    .or(zod_1.z.date())
    .or(zod_1.z.bigint());
exports.serializableRecord = zod_1.z.record(exports.serializableSchema);
exports.imageSize = zod_1.z.enum(['thumbnail', 'small', 'medium', 'large']);
exports.imageSchema = zod_1.z.object({
    alt: zod_1.z.string().optional(),
    size: exports.imageSize.optional(),
    // deprecated/undocumented in 0.33.0
    width: exports.imageSize.optional(),
    // deprecated/undocumented in 0.33.0
    height: exports.imageSize.optional(),
    url: zod_1.z.string(),
});
exports.richSelectOption = zod_1.z
    .object({
    label: exports.primitiveValue,
    value: exports.primitiveValue,
    description: zod_1.z.string().nullish(),
    imageUrl: zod_1.z.string().nullish(),
    image: exports.imageSchema.optional(),
})
    .passthrough();
exports.highlightColor = zod_1.z.enum([
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'pink',
    'gray',
]);
// non-primitive display types such as links, images, etc.
exports.advancedPrimitive = zod_1.z.object({
    label: zod_1.z.string().optional(),
    url: zod_1.z.string().optional(),
    image: exports.imageSchema.optional(),
    action: zod_1.z.string().optional(),
    params: exports.serializableRecord.optional(),
});
exports.tableRowValue = zod_1.z.union([
    zod_1.z.string(),
    zod_1.z.number(),
    zod_1.z.boolean(),
    zod_1.z.null(),
    zod_1.z.date(),
    zod_1.z.undefined(),
    zod_1.z.bigint(),
    zod_1.z
        .object({
        label: zod_1.z.string().optional(),
        value: zod_1.z
            .union([
            zod_1.z.string(),
            zod_1.z.number(),
            zod_1.z.boolean(),
            zod_1.z.null(),
            zod_1.z.date(),
            zod_1.z.undefined(),
        ])
            .optional(),
        href: zod_1.z.string().optional(),
        url: zod_1.z.string().optional(),
        image: exports.imageSchema.optional(),
        // Deprecated in favor of route
        action: zod_1.z.string().optional(),
        route: zod_1.z.string().optional(),
        params: exports.serializableRecord.optional(),
        highlightColor: exports.highlightColor.optional(),
    })
        .passthrough(),
]);
// Allow arbitrary objects/interfaces with specified column mappings.
// If no columns specified, we'll just serialize any nested objects.
exports.tableRow = zod_1.z.record(exports.tableRowValue.or(zod_1.z.any()));
exports.menuItem = zod_1.z.intersection(zod_1.z.object({
    label: zod_1.z.string(),
    // `default` deprecated in 0.31.0
    theme: zod_1.z.enum(['default', 'danger']).optional(),
}), zod_1.z.union([
    zod_1.z.intersection(zod_1.z.object({
        params: exports.serializableRecord.optional(),
        disabled: zod_1.z.boolean().optional(),
    }), zod_1.z.union([
        zod_1.z.object({
            route: zod_1.z.string(),
        }),
        zod_1.z.object({
            // deprecated in favor of `route`
            action: zod_1.z.string(),
        }),
    ])),
    zod_1.z.object({
        url: zod_1.z.string(),
        disabled: zod_1.z.boolean().optional(),
    }),
    zod_1.z.object({
        disabled: zod_1.z.literal(true),
    }),
]));
exports.buttonItem = zod_1.z.intersection(zod_1.z.object({
    label: zod_1.z.string(),
    theme: buttonTheme.optional(),
}), zod_1.z.union([
    zod_1.z.intersection(zod_1.z.object({
        params: exports.serializableRecord.optional(),
        disabled: zod_1.z.boolean().optional(),
    }), zod_1.z.union([
        zod_1.z.object({
            route: zod_1.z.string(),
        }),
        zod_1.z.object({
            // deprecated in favor of `route`
            action: zod_1.z.string(),
        }),
    ])),
    zod_1.z.object({
        url: zod_1.z.string(),
        disabled: zod_1.z.boolean().optional(),
    }),
    zod_1.z.object({
        disabled: zod_1.z.literal(true),
    }),
]));
exports.linkSchema = zod_1.z.union([
    zod_1.z.object({
        url: zod_1.z.string(),
    }),
    zod_1.z.object({
        route: zod_1.z.string(),
        params: exports.serializableRecord.optional(),
    }),
]);
// TODO: Remove soon
exports.legacyLinkSchema = zod_1.z.union([
    exports.linkSchema,
    zod_1.z.object({
        action: zod_1.z.string(),
        params: exports.serializableRecord.optional(),
    }),
]);
exports.internalTableRow = zod_1.z.object({
    key: zod_1.z.string(),
    data: exports.tableRow,
    menu: zod_1.z.array(exports.menuItem).optional(),
    // filterValue is a string we compile when we render each row, allowing us to quickly
    // filter array items without having to search all object keys for the query term.
    // It is not sent to the client.
    filterValue: zod_1.z.string().optional(),
});
exports.internalTableColumn = zod_1.z.object({
    label: zod_1.z.string(),
    accessorKey: zod_1.z.string().optional(),
});
exports.gridItem = zod_1.z.object({
    label: zod_1.z.string().nullable().optional(),
    description: zod_1.z.string().nullable().optional(),
    image: zod_1.z
        .object({
        url: zod_1.z.string().nullable().optional(),
        alt: zod_1.z.string().optional(),
        fit: zod_1.z.enum(['cover', 'contain']).optional(),
        aspectRatio: zod_1.z.number().optional(),
    })
        .nullable()
        .optional(),
    menu: zod_1.z.array(exports.menuItem).optional(),
    url: zod_1.z.string().optional(),
    route: zod_1.z.string().optional(),
    params: exports.serializableRecord.optional(),
});
exports.backwardCompatibleGridItem = exports.gridItem.merge(zod_1.z.object({
    // @deprecated in favor of label
    title: zod_1.z.string().nullable().optional(),
}));
exports.internalGridItem = zod_1.z.object({
    data: exports.backwardCompatibleGridItem,
    key: zod_1.z.string(),
    filterValue: zod_1.z.string().optional(),
});
const searchResult = zod_1.z.object({
    value: zod_1.z.string(),
    label: exports.primitiveValue,
    description: zod_1.z.string().nullish(),
    imageUrl: zod_1.z.string().nullish(),
    image: exports.imageSchema.optional(),
});
exports.CURRENCIES = [
    'USD',
    'CAD',
    'EUR',
    'GBP',
    'AUD',
    'CNY',
    'JPY',
];
exports.currencyCode = zod_1.z.enum(exports.CURRENCIES);
exports.dateObject = zod_1.z.object({
    year: zod_1.z.number(),
    month: zod_1.z.number(),
    day: zod_1.z.number(),
});
exports.timeObject = zod_1.z.object({
    hour: zod_1.z.number(),
    minute: zod_1.z.number(),
});
exports.dateTimeObject = exports.dateObject.merge(exports.timeObject);
/**
 * Any methods with an `immediate` property defined (at all, not just truthy)
 * will resolve immediately when awaited.
 */
function resolvesImmediately(methodName, { displayResolvesImmediately = false, } = {}) {
    if (displayResolvesImmediately && methodName.startsWith('DISPLAY_'))
        return true;
    const schema = exports.ioSchema[methodName];
    return schema && 'immediate' in schema && schema.immediate;
}
exports.resolvesImmediately = resolvesImmediately;
function supportsMultiple(methodName) {
    const schema = exports.ioSchema[methodName];
    return schema && 'supportsMultiple' in schema && schema.supportsMultiple;
}
exports.supportsMultiple = supportsMultiple;
exports.metaItemSchema = zod_1.z.object({
    label: zod_1.z.string(),
    value: exports.primitiveValue.or(zod_1.z.bigint()).nullish().optional(),
    url: zod_1.z.string().optional(),
    image: exports.imageSchema.optional(),
    route: zod_1.z.string().optional(),
    // Deprecated in favor of `route` above
    action: zod_1.z.string().optional(),
    params: exports.serializableRecord.optional(),
    error: zod_1.z.string().nullish(),
});
const DISPLAY_SCHEMA = {
    DISPLAY_CODE: {
        props: zod_1.z.object({
            code: zod_1.z.string(),
            language: zod_1.z.string().optional(),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.null(),
    },
    DISPLAY_HEADING: {
        props: zod_1.z.object({
            level: zod_1.z.union([zod_1.z.literal(2), zod_1.z.literal(3), zod_1.z.literal(4)]).optional(),
            description: zod_1.z.string().optional(),
            menuItems: zod_1.z.array(exports.buttonItem).optional(),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.null(),
    },
    DISPLAY_METADATA: {
        props: zod_1.z.object({
            data: zod_1.z.array(exports.metaItemSchema),
            layout: zod_1.z.enum(['grid', 'list', 'card']).optional().default('grid'),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.null(),
    },
    DISPLAY_MARKDOWN: {
        props: zod_1.z.object({}),
        state: zod_1.z.null(),
        returns: zod_1.z.null(),
    },
    DISPLAY_HTML: {
        props: zod_1.z.object({
            html: zod_1.z.string(),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.null(),
    },
    DISPLAY_IMAGE: {
        props: exports.imageSchema,
        state: zod_1.z.null(),
        returns: zod_1.z.null(),
    },
    DISPLAY_LINK: {
        props: zod_1.z.intersection(zod_1.z.object({
            theme: buttonTheme.optional(),
        }), zod_1.z.union([
            zod_1.z.object({
                href: zod_1.z.string(),
            }),
            exports.legacyLinkSchema,
        ])),
        state: zod_1.z.null(),
        returns: zod_1.z.null(),
    },
    DISPLAY_OBJECT: {
        props: zod_1.z.object({
            data: keyValueObject,
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.null(),
    },
    DISPLAY_GRID: {
        props: zod_1.z.object({
            data: zod_1.z.array(exports.internalGridItem),
            idealColumnWidth: zod_1.z.optional(zod_1.z.number()),
            defaultPageSize: zod_1.z.number().optional(),
            helpText: zod_1.z.optional(zod_1.z.string()),
            isFilterable: zod_1.z.boolean().default(true),
            //== private props
            totalRecords: zod_1.z.optional(zod_1.z.number().int()),
            isAsync: zod_1.z.optional(zod_1.z.boolean().default(false)),
        }),
        state: zod_1.z.object({
            queryTerm: zod_1.z.string().optional(),
            offset: zod_1.z.number().int().default(0),
            pageSize: zod_1.z.number().int(),
        }),
        returns: zod_1.z.null(),
    },
    DISPLAY_TABLE: {
        props: zod_1.z.object({
            helpText: zod_1.z.optional(zod_1.z.string()),
            columns: zod_1.z.array(exports.internalTableColumn),
            data: zod_1.z.array(exports.internalTableRow),
            orientation: zod_1.z.enum(['vertical', 'horizontal']).default('horizontal'),
            defaultPageSize: zod_1.z.number().optional(),
            isSortable: zod_1.z.boolean().default(true),
            isFilterable: zod_1.z.boolean().default(true),
            //== private props
            // added in v0.28, optional until required by all active versions
            totalRecords: zod_1.z.optional(zod_1.z.number().int()),
            isAsync: zod_1.z.optional(zod_1.z.boolean().default(false)),
        }),
        state: zod_1.z.object({
            queryTerm: zod_1.z.string().optional(),
            sortColumn: zod_1.z.string().optional(),
            sortDirection: zod_1.z.enum(['asc', 'desc']).optional(),
            offset: zod_1.z.number().int().default(0),
            pageSize: zod_1.z.number().int(),
        }),
        returns: zod_1.z.null(),
    },
    DISPLAY_PROGRESS_STEPS: {
        props: zod_1.z.object({
            steps: zod_1.z.object({
                completed: zod_1.z.number(),
                total: zod_1.z.number(),
            }),
            currentStep: zod_1.z.string().optional(),
            subTitle: zod_1.z.string().optional(),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.null(),
        immediate: true,
    },
    DISPLAY_PROGRESS_INDETERMINATE: {
        props: zod_1.z.object({}),
        state: zod_1.z.null(),
        returns: zod_1.z.null(),
        immediate: true,
    },
    DISPLAY_PROGRESS_THROUGH_LIST: {
        props: zod_1.z.object({
            items: zod_1.z.array(zod_1.z.object({
                label: zod_1.z.string(),
                isComplete: zod_1.z.boolean(),
                resultDescription: zod_1.z.union([zod_1.z.null(), zod_1.z.string()]),
            })),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.null(),
    },
    DISPLAY_VIDEO: {
        props: zod_1.z.object({
            width: exports.imageSize.optional(),
            height: exports.imageSize.optional(),
            url: zod_1.z.string(),
            loop: zod_1.z.boolean().optional(),
            muted: zod_1.z.boolean().optional(),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.null(),
    },
};
const INPUT_SCHEMA = {
    INPUT_TEXT: {
        props: zod_1.z.object({
            helpText: zod_1.z.optional(zod_1.z.string()),
            placeholder: zod_1.z.optional(zod_1.z.string()),
            defaultValue: zod_1.z.optional(zod_1.z.string()).nullable(),
            multiline: zod_1.z.optional(zod_1.z.boolean()),
            lines: zod_1.z.optional(zod_1.z.number()),
            minLength: zod_1.z.optional(zod_1.z.number().int().positive()),
            maxLength: zod_1.z.optional(zod_1.z.number().int().positive()),
            disabled: zod_1.z.optional(zod_1.z.boolean().default(false)),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.string(),
    },
    INPUT_EMAIL: {
        props: zod_1.z.object({
            helpText: zod_1.z.optional(zod_1.z.string()),
            placeholder: zod_1.z.optional(zod_1.z.string()),
            defaultValue: zod_1.z.optional(zod_1.z.string()).nullable(),
            disabled: zod_1.z.optional(zod_1.z.boolean().default(false)),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.string(),
    },
    INPUT_NUMBER: {
        props: zod_1.z.object({
            min: zod_1.z.optional(zod_1.z.number()),
            max: zod_1.z.optional(zod_1.z.number()),
            prepend: zod_1.z.optional(zod_1.z.string()),
            helpText: zod_1.z.optional(zod_1.z.string()),
            placeholder: zod_1.z.optional(zod_1.z.string()),
            defaultValue: zod_1.z.optional(zod_1.z.number()).nullable(),
            decimals: zod_1.z.optional(zod_1.z.number().positive().int()),
            currency: zod_1.z.optional(exports.currencyCode),
            disabled: zod_1.z.optional(zod_1.z.boolean().default(false)),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.number(),
    },
    INPUT_SLIDER: {
        props: zod_1.z.object({
            min: zod_1.z.number(),
            max: zod_1.z.number(),
            step: zod_1.z.optional(zod_1.z.number()),
            helpText: zod_1.z.optional(zod_1.z.string()),
            defaultValue: zod_1.z.optional(zod_1.z.number()).nullable(),
            disabled: zod_1.z.optional(zod_1.z.boolean().default(false)),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.number(),
    },
    INPUT_URL: {
        props: zod_1.z.object({
            helpText: zod_1.z.optional(zod_1.z.string()),
            placeholder: zod_1.z.optional(zod_1.z.string()),
            defaultValue: zod_1.z.optional(zod_1.z.string()).nullable(),
            allowedProtocols: zod_1.z.array(zod_1.z.string()).default(['http', 'https']),
            disabled: zod_1.z.optional(zod_1.z.boolean().default(false)),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.string(),
    },
    INPUT_BOOLEAN: {
        props: zod_1.z.object({
            helpText: zod_1.z.optional(zod_1.z.string()),
            defaultValue: zod_1.z
                .boolean()
                .nullable()
                .default(false)
                .transform((val) => !!val),
            disabled: zod_1.z.optional(zod_1.z.boolean().default(false)),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.boolean(),
    },
    INPUT_RICH_TEXT: {
        props: zod_1.z.object({
            helpText: zod_1.z.optional(zod_1.z.string()),
            placeholder: zod_1.z.optional(zod_1.z.string()),
            defaultValue: zod_1.z.optional(zod_1.z.string()).nullable(),
            disabled: zod_1.z.optional(zod_1.z.boolean().default(false)),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.object({ html: zod_1.z.string(), json: zod_1.z.any() }),
    },
    INPUT_DATE: {
        props: zod_1.z.object({
            helpText: zod_1.z.optional(zod_1.z.string()),
            defaultValue: zod_1.z.optional(exports.dateObject).nullable(),
            min: zod_1.z.optional(exports.dateObject),
            max: zod_1.z.optional(exports.dateObject),
            disabled: zod_1.z.optional(zod_1.z.boolean().default(false)),
        }),
        state: zod_1.z.null(),
        returns: exports.dateObject,
    },
    INPUT_TIME: {
        props: zod_1.z.object({
            helpText: zod_1.z.optional(zod_1.z.string()),
            defaultValue: zod_1.z.optional(exports.timeObject).nullable(),
            min: zod_1.z.optional(exports.timeObject),
            max: zod_1.z.optional(exports.timeObject),
            disabled: zod_1.z.optional(zod_1.z.boolean().default(false)),
        }),
        state: zod_1.z.null(),
        returns: exports.timeObject,
    },
    INPUT_DATETIME: {
        props: zod_1.z.object({
            helpText: zod_1.z.optional(zod_1.z.string()),
            defaultValue: zod_1.z.optional(exports.dateTimeObject).nullable(),
            min: zod_1.z.optional(exports.dateTimeObject),
            max: zod_1.z.optional(exports.dateTimeObject),
            disabled: zod_1.z.optional(zod_1.z.boolean().default(false)),
        }),
        state: zod_1.z.null(),
        returns: exports.dateTimeObject,
    },
    INPUT_SPREADSHEET: {
        props: zod_1.z.object({
            helpText: zod_1.z.string().optional(),
            defaultValue: zod_1.z.optional(zod_1.z.array(exports.deserializableRecord)).nullable(),
            columns: zod_1.z.record(exports.typeValue),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.array(exports.deserializableRecord),
    },
    UPLOAD_FILE: {
        props: zod_1.z.object({
            helpText: zod_1.z.string().optional(),
            allowedExtensions: zod_1.z.array(zod_1.z.string()).optional(),
            disabled: zod_1.z.optional(zod_1.z.boolean().default(false)),
            fileUrls: zod_1.z
                .array(zod_1.z.object({
                uploadUrl: zod_1.z.string(),
                downloadUrl: zod_1.z.string(),
            }))
                .nullish(),
            // Deprecated
            uploadUrl: zod_1.z.string().nullish().optional(),
            downloadUrl: zod_1.z.string().nullish().optional(),
        }),
        state: zod_1.z.object({
            files: zod_1.z
                .array(zod_1.z.object({
                name: zod_1.z.string(),
                type: zod_1.z.string(),
            }))
                .optional(),
            // Deprecated
            name: zod_1.z.string().optional(),
            type: zod_1.z.string().optional(),
        }),
        returns: zod_1.z.object({
            name: zod_1.z.string(),
            type: zod_1.z.string(),
            lastModified: zod_1.z.number(),
            size: zod_1.z.number(),
            url: zod_1.z.string(),
        }),
        supportsMultiple: true,
    },
    SEARCH: {
        props: zod_1.z.object({
            results: zod_1.z.array(searchResult),
            defaultValue: zod_1.z.optional(zod_1.z.string()).nullable(),
            placeholder: zod_1.z.optional(zod_1.z.string()),
            helpText: zod_1.z.optional(zod_1.z.string()),
            disabled: zod_1.z.optional(zod_1.z.boolean().default(false)),
        }),
        state: zod_1.z.object({ queryTerm: zod_1.z.string() }),
        returns: zod_1.z.string(),
        supportsMultiple: true,
    },
    CONFIRM: {
        props: zod_1.z.object({
            helpText: zod_1.z.optional(zod_1.z.string()),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.boolean(),
        exclusive: zod_1.z.literal(true),
    },
    CONFIRM_IDENTITY: {
        props: zod_1.z.object({
            gracePeriodMs: zod_1.z.number().optional(),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.boolean(),
        exclusive: zod_1.z.literal(true),
    },
    SELECT_TABLE: {
        props: zod_1.z.object({
            helpText: zod_1.z.optional(zod_1.z.string()),
            columns: zod_1.z.array(exports.internalTableColumn),
            data: zod_1.z.array(exports.internalTableRow),
            defaultPageSize: zod_1.z.number().optional(),
            minSelections: zod_1.z.optional(zod_1.z.number().int().min(0)),
            maxSelections: zod_1.z.optional(zod_1.z.number().positive().int()),
            disabled: zod_1.z.optional(zod_1.z.boolean().default(false)),
            isSortable: zod_1.z.optional(zod_1.z.boolean().default(true)),
            isFilterable: zod_1.z.optional(zod_1.z.boolean().default(true)),
            //== private props
            // added in v0.28, optional until required by all active versions
            totalRecords: zod_1.z.optional(zod_1.z.number().int()),
            selectedKeys: zod_1.z.array(zod_1.z.string()).default([]),
        }),
        state: zod_1.z.object({
            queryTerm: zod_1.z.string().nullish(),
            sortColumn: zod_1.z.string().nullish(),
            sortDirection: zod_1.z.enum(['asc', 'desc']).nullish(),
            offset: zod_1.z.number().int().default(0),
            pageSize: zod_1.z.number().int(),
            isSelectAll: zod_1.z.boolean().default(false),
        }),
        // replaced full rows with just keys in v0.28
        returns: zod_1.z.union([
            zod_1.z.array(exports.internalTableRow),
            zod_1.z.array(zod_1.z.object({ key: zod_1.z.string() })),
        ]),
    },
    SELECT_SINGLE: {
        props: zod_1.z.object({
            options: zod_1.z.array(exports.richSelectOption),
            helpText: zod_1.z.optional(zod_1.z.string()),
            defaultValue: zod_1.z.optional(exports.richSelectOption).nullable(),
            searchable: zod_1.z.optional(zod_1.z.boolean()),
            disabled: zod_1.z.optional(zod_1.z.boolean().default(false)),
        }),
        state: zod_1.z.object({ queryTerm: zod_1.z.string() }),
        returns: exports.richSelectOption,
    },
    SELECT_MULTIPLE: {
        props: zod_1.z.object({
            options: zod_1.z.array(exports.labelValue),
            helpText: zod_1.z.optional(zod_1.z.string()),
            defaultValue: zod_1.z
                .array(exports.labelValue)
                .nullable()
                .default([])
                .transform((val) => val !== null && val !== void 0 ? val : []),
            minSelections: zod_1.z.optional(zod_1.z.number().int().min(0)),
            maxSelections: zod_1.z.optional(zod_1.z.number().positive().int()),
            disabled: zod_1.z.optional(zod_1.z.boolean().default(false)),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.array(exports.labelValue),
    },
    CREDENTIALS: {
        props: zod_1.z.object({
            // optional service-specific params to pass to the API
            params: zod_1.z.optional(zod_1.z.record(zod_1.z.string())),
        }),
        state: zod_1.z.null(),
        returns: zod_1.z.object({
            token: zod_1.z.string(),
            // only returned for OAuth 1.0 APIs
            secret: zod_1.z.string().optional(),
        }),
    },
};
exports.ioSchema = {
    ...DISPLAY_SCHEMA,
    ...INPUT_SCHEMA,
};
