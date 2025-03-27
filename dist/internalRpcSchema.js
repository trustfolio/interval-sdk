"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hostSchema = exports.startTransactionUser = exports.clientSchema = exports.wsServerSchema = exports.DECLARE_HOST = exports.NOTIFY = exports.DEQUEUE_ACTION = exports.CREATE_GHOST_MODE_ACCOUNT = exports.ENQUEUE_ACTION = exports.ICE_CONFIG = exports.ICE_SERVER = exports.PAGE_DEFINITION = exports.ACTION_DEFINITION = exports.ACCESS_CONTROL_DEFINITION = exports.CTX_USER_ROLE = exports.LOADING_OPTIONS = exports.actionEnvironment = exports.actionMode = exports.TRANSACTION_RESULT_SCHEMA_VERSION = exports.DUPLEX_MESSAGE_SCHEMA = void 0;
const zod_1 = require("zod");
const ioSchema_1 = require("./ioSchema");
exports.DUPLEX_MESSAGE_SCHEMA = zod_1.z.discriminatedUnion('kind', [
    zod_1.z.object({
        id: zod_1.z.string(),
        kind: zod_1.z.literal('CALL'),
        methodName: zod_1.z.string(),
        data: zod_1.z.any(),
    }),
    zod_1.z.object({
        id: zod_1.z.string(),
        kind: zod_1.z.literal('RESPONSE'),
        methodName: zod_1.z.string(),
        data: zod_1.z.any(),
    }),
]);
exports.TRANSACTION_RESULT_SCHEMA_VERSION = 1;
exports.actionMode = zod_1.z.enum(['live', 'console']);
exports.actionEnvironment = zod_1.z
    .enum(['production', 'development'])
    .or(zod_1.z.string());
exports.LOADING_OPTIONS = zod_1.z.object({
    label: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    itemsInQueue: zod_1.z.number().int().optional(),
});
const LOADING_STATE = zod_1.z.object({
    label: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    itemsInQueue: zod_1.z.number().int().optional(),
    itemsCompleted: zod_1.z.number().int().optional(),
});
const BACKWARD_COMPATIBLE_LOADING_STATE = LOADING_STATE.merge(zod_1.z.object({
    /** @deprecated in favor of `label` (for real this time) */
    title: zod_1.z.string().optional(),
}));
const SDK_ALERT = zod_1.z.object({
    minSdkVersion: zod_1.z.string(),
    severity: zod_1.z.enum(['INFO', 'WARNING', 'ERROR']),
    message: zod_1.z.string().nullish(),
});
exports.CTX_USER_ROLE = zod_1.z.enum(['admin', 'developer', 'member']);
exports.ACCESS_CONTROL_DEFINITION = zod_1.z.union([
    zod_1.z.literal('entire-organization'),
    zod_1.z.object({
        teams: zod_1.z.array(zod_1.z.string()).optional(),
    }),
]);
exports.ACTION_DEFINITION = zod_1.z.object({
    groupSlug: zod_1.z.string().optional(),
    slug: zod_1.z.string(),
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    backgroundable: zod_1.z.boolean().optional(),
    unlisted: zod_1.z.boolean().optional(),
    warnOnClose: zod_1.z.boolean().optional(),
    access: exports.ACCESS_CONTROL_DEFINITION.optional(),
});
exports.PAGE_DEFINITION = zod_1.z.object({
    slug: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    hasHandler: zod_1.z.boolean().optional(),
    // Older version of hasHandler, deprecated
    hasIndex: zod_1.z.boolean().optional(),
    unlisted: zod_1.z.boolean().optional(),
    access: exports.ACCESS_CONTROL_DEFINITION.optional(),
});
exports.ICE_SERVER = zod_1.z.object({
    url: zod_1.z.string(),
    urls: zod_1.z.string(),
    hostname: zod_1.z.string(),
    port: zod_1.z.number(),
    relayType: zod_1.z.enum(['TurnUdp', 'TurnTcp', 'TurnTls']).optional(),
    username: zod_1.z.string().optional(),
    credential: zod_1.z.string().optional(),
    password: zod_1.z.string().optional(),
});
exports.ICE_CONFIG = zod_1.z.object({
    iceServers: zod_1.z.array(exports.ICE_SERVER),
});
exports.ENQUEUE_ACTION = {
    inputs: zod_1.z.object({
        slug: zod_1.z.string(),
        assignee: zod_1.z.string().nullish(),
        params: ioSchema_1.deserializableRecord.nullish(),
        paramsMeta: zod_1.z.any().optional(),
    }),
    returns: zod_1.z.discriminatedUnion('type', [
        zod_1.z.object({
            type: zod_1.z.literal('success'),
            id: zod_1.z.string(),
        }),
        zod_1.z.object({
            type: zod_1.z.literal('error'),
            message: zod_1.z.string(),
        }),
    ]),
};
exports.CREATE_GHOST_MODE_ACCOUNT = {
    inputs: zod_1.z.object({}),
    returns: zod_1.z.object({
        ghostOrgId: zod_1.z.string(),
    }),
};
exports.DEQUEUE_ACTION = {
    inputs: zod_1.z.object({
        id: zod_1.z.string(),
    }),
    returns: zod_1.z.discriminatedUnion('type', [
        zod_1.z.object({
            type: zod_1.z.literal('success'),
            id: zod_1.z.string(),
            assignee: zod_1.z.string().optional(),
            params: ioSchema_1.deserializableRecord.optional(),
            paramsMeta: zod_1.z.any().optional(),
        }),
        zod_1.z.object({
            type: zod_1.z.literal('error'),
            message: zod_1.z.string(),
        }),
    ]),
};
exports.NOTIFY = {
    inputs: zod_1.z.object({
        transactionId: zod_1.z.string().optional(),
        message: zod_1.z.string(),
        title: zod_1.z.string().optional(),
        deliveryInstructions: zod_1.z.array(zod_1.z.object({
            to: zod_1.z.string(),
            method: zod_1.z.enum(['EMAIL', 'SLACK']).optional(),
        })),
        createdAt: zod_1.z.string(),
        idempotencyKey: zod_1.z.string().optional(),
    }),
    returns: zod_1.z.discriminatedUnion('type', [
        zod_1.z.object({
            type: zod_1.z.literal('success'),
        }),
        zod_1.z.object({
            type: zod_1.z.literal('error'),
            message: zod_1.z.string(),
        }),
    ]),
};
exports.DECLARE_HOST = {
    inputs: zod_1.z.object({
        httpHostId: zod_1.z.string(),
        actions: zod_1.z.array(exports.ACTION_DEFINITION),
        groups: zod_1.z.array(exports.PAGE_DEFINITION).optional(),
        sdkName: zod_1.z.string(),
        sdkVersion: zod_1.z.string(),
    }),
    returns: zod_1.z.discriminatedUnion('type', [
        zod_1.z.object({
            type: zod_1.z.literal('success'),
            invalidSlugs: zod_1.z.array(zod_1.z.string()),
            sdkAlert: SDK_ALERT.nullish(),
            warnings: zod_1.z.array(zod_1.z.string()),
        }),
        zod_1.z.object({
            type: zod_1.z.literal('error'),
            message: zod_1.z.string(),
            sdkAlert: SDK_ALERT.nullish(),
        }),
    ]),
};
exports.wsServerSchema = {
    CONNECT_TO_TRANSACTION_AS_CLIENT: {
        inputs: zod_1.z.object({
            transactionId: zod_1.z.string(),
            params: ioSchema_1.serializableRecord.optional(),
        }),
        returns: zod_1.z.boolean(),
    },
    __TEST_ONLY_REQUEST_DROP_CONNECTION: {
        inputs: zod_1.z.void(),
        returns: zod_1.z.boolean(),
    },
    LEAVE_TRANSACTION: {
        inputs: zod_1.z.object({
            transactionId: zod_1.z.string(),
        }),
        returns: zod_1.z.boolean(),
    },
    REQUEST_PAGE: {
        inputs: zod_1.z.object({
            pageKey: zod_1.z.string(),
            pageSlug: zod_1.z.string(),
            actionMode: exports.actionMode,
            organizationEnvironmentId: zod_1.z.string(),
            params: ioSchema_1.serializableRecord.optional(),
        }),
        returns: zod_1.z.discriminatedUnion('type', [
            zod_1.z.object({
                type: zod_1.z.literal('SUCCESS'),
                pageKey: zod_1.z.string(),
            }),
            zod_1.z.object({
                type: zod_1.z.literal('ERROR'),
                message: zod_1.z.string().optional(),
            }),
        ]),
    },
    LEAVE_PAGE: {
        inputs: zod_1.z.object({
            pageKey: zod_1.z.string(),
        }),
        returns: zod_1.z.boolean(),
    },
    RESPOND_TO_IO_CALL: {
        inputs: zod_1.z.object({
            transactionId: zod_1.z.string(),
            ioResponse: zod_1.z.string(),
        }),
        returns: zod_1.z.boolean(),
    },
    SEND_IO_CALL: {
        inputs: zod_1.z.object({
            transactionId: zod_1.z.string(),
            ioCall: zod_1.z.string(),
            skipClientCall: zod_1.z.boolean().optional(),
        }),
        returns: zod_1.z.boolean().or(zod_1.z.object({
            type: zod_1.z.literal('ERROR'),
            message: zod_1.z.string().optional(),
        })),
    },
    SEND_PAGE: {
        inputs: zod_1.z.object({
            pageKey: zod_1.z.string(),
            // stringified LAYOUT_SCHEMA
            page: zod_1.z.string().nullish(),
        }),
        returns: zod_1.z.boolean(),
    },
    SEND_LOADING_CALL: {
        inputs: zod_1.z.intersection(BACKWARD_COMPATIBLE_LOADING_STATE, zod_1.z.object({
            transactionId: zod_1.z.string(),
            skipClientCall: zod_1.z.boolean().optional(),
        })),
        returns: zod_1.z.boolean(),
    },
    SEND_LOG: {
        inputs: zod_1.z.object({
            transactionId: zod_1.z.string(),
            data: zod_1.z.string(),
            index: zod_1.z.number().optional(),
            timestamp: zod_1.z.number().optional(),
            skipClientCall: zod_1.z.boolean().optional(),
        }),
        returns: zod_1.z.boolean(),
    },
    NOTIFY: {
        inputs: zod_1.z.object({
            transactionId: zod_1.z.string(),
            message: zod_1.z.string(),
            title: zod_1.z.string().optional(),
            idempotencyKey: zod_1.z.string().optional(),
            deliveryInstructions: zod_1.z
                .array(zod_1.z.object({
                to: zod_1.z.string(),
                method: zod_1.z.enum(['EMAIL', 'SLACK']).optional(),
            }))
                .optional(),
            createdAt: zod_1.z.string(),
        }),
        returns: zod_1.z.boolean(),
    },
    SEND_REDIRECT: {
        inputs: zod_1.z.intersection(zod_1.z.object({
            transactionId: zod_1.z.string(),
            skipClientCall: zod_1.z.boolean().optional(),
            replace: zod_1.z.boolean().optional(),
        }), ioSchema_1.legacyLinkSchema),
        returns: zod_1.z.boolean(),
    },
    MARK_TRANSACTION_COMPLETE: {
        inputs: zod_1.z.object({
            transactionId: zod_1.z.string(),
            resultStatus: zod_1.z
                .enum(['SUCCESS', 'FAILURE', 'CANCELED', 'REDIRECTED'])
                .optional(),
            result: zod_1.z.string().optional(),
            skipClientCall: zod_1.z.boolean().optional(),
        }),
        returns: zod_1.z.boolean(),
    },
    INITIALIZE_CLIENT: {
        inputs: zod_1.z.undefined(),
        returns: zod_1.z.boolean(),
    },
    INITIALIZE_HOST: {
        inputs: zod_1.z.intersection(zod_1.z.object({
            sdkName: zod_1.z.string().optional(),
            sdkVersion: zod_1.z.string().optional(),
            requestId: zod_1.z.string().optional(),
            timestamp: zod_1.z.number().optional(),
        }), zod_1.z.union([
            zod_1.z.object({
                // Actually slugs, for backward compatibility
                // TODO: Change to slug in breaking release
                callableActionNames: zod_1.z.array(zod_1.z.string()),
            }),
            zod_1.z.object({
                actions: zod_1.z.array(exports.ACTION_DEFINITION),
                groups: zod_1.z.array(exports.PAGE_DEFINITION).optional(),
            }),
        ])),
        returns: zod_1.z
            .discriminatedUnion('type', [
            zod_1.z.object({
                type: zod_1.z.literal('success'),
                environment: exports.actionEnvironment,
                invalidSlugs: zod_1.z.array(zod_1.z.string()),
                organization: zod_1.z.object({
                    name: zod_1.z.string(),
                    slug: zod_1.z.string(),
                }),
                dashboardUrl: zod_1.z.string(),
                forcePeerMessages: zod_1.z.boolean().optional(),
                sdkAlert: SDK_ALERT.nullish(),
                warnings: zod_1.z.array(zod_1.z.string()),
            }),
            zod_1.z.object({
                type: zod_1.z.literal('error'),
                message: zod_1.z.string(),
                sdkAlert: SDK_ALERT.nullish(),
            }),
        ])
            .nullable(),
    },
    BEGIN_HOST_SHUTDOWN: {
        // intentional empty object to allow for future additions
        // and to support current `skipClientCall` behavior
        inputs: zod_1.z.object({}),
        returns: zod_1.z.discriminatedUnion('type', [
            zod_1.z.object({
                type: zod_1.z.literal('success'),
            }),
            zod_1.z.object({
                type: zod_1.z.literal('error'),
                message: zod_1.z.string().optional(),
            }),
        ]),
    },
};
exports.clientSchema = {
    CLIENT_USURPED: {
        inputs: zod_1.z.object({
            transactionId: zod_1.z.string(),
        }),
        returns: zod_1.z.void().nullable(),
    },
    TRANSACTION_COMPLETED: {
        inputs: zod_1.z.object({
            transactionId: zod_1.z.string(),
            resultStatus: zod_1.z.enum(['SUCCESS', 'FAILURE', 'CANCELED', 'REDIRECTED']),
            result: zod_1.z.string().optional(),
        }),
        returns: zod_1.z.void().nullable(),
    },
    HOST_CLOSED_UNEXPECTEDLY: {
        inputs: zod_1.z.object({
            transactionId: zod_1.z.string(),
        }),
        returns: zod_1.z.void().nullable(),
    },
    HOST_RECONNECTED: {
        inputs: zod_1.z.object({
            transactionId: zod_1.z.string(),
        }),
        returns: zod_1.z.void().nullable(),
    },
    RENDER_PAGE: {
        inputs: zod_1.z.object({
            pageKey: zod_1.z.string(),
            // stringified LAYOUT_SCHEMA
            page: zod_1.z.string().nullish(),
            hostInstanceId: zod_1.z.string(),
        }),
        returns: zod_1.z.boolean(),
    },
    RENDER: {
        inputs: zod_1.z.object({
            transactionId: zod_1.z.string(),
            toRender: zod_1.z.string(),
        }),
        returns: zod_1.z.boolean(),
    },
    LOADING_STATE: {
        inputs: zod_1.z
            .object({
            transactionId: zod_1.z.string(),
        })
            .merge(BACKWARD_COMPATIBLE_LOADING_STATE),
        returns: zod_1.z.boolean(),
    },
    LOG: {
        inputs: zod_1.z.object({
            transactionId: zod_1.z.string(),
            data: zod_1.z.string().nullable(),
            index: zod_1.z.number(),
            timestamp: zod_1.z.number(),
        }),
        returns: zod_1.z.boolean(),
    },
    NOTIFY: {
        inputs: zod_1.z.object({
            transactionId: zod_1.z.string(),
            deliveries: zod_1.z.array(zod_1.z.object({
                to: zod_1.z.string(),
                method: zod_1.z.enum(['EMAIL', 'SLACK']).optional(),
            })),
            message: zod_1.z.string(),
            title: zod_1.z.string().optional(),
            idempotencyKey: zod_1.z.string().optional(),
        }),
        returns: zod_1.z.boolean(),
    },
    REDIRECT: {
        inputs: zod_1.z.intersection(zod_1.z.object({
            transactionId: zod_1.z.string(),
            replace: zod_1.z.boolean().optional(),
        }), ioSchema_1.linkSchema),
        returns: zod_1.z.boolean(),
    },
};
exports.startTransactionUser = zod_1.z.object({
    email: zod_1.z.string(),
    firstName: zod_1.z.string().nullable(),
    lastName: zod_1.z.string().nullable(),
    role: exports.CTX_USER_ROLE,
    teams: zod_1.z.array(zod_1.z.string()),
});
exports.hostSchema = {
    OPEN_PAGE: {
        inputs: zod_1.z.object({
            pageKey: zod_1.z.string(),
            page: zod_1.z.object({
                slug: zod_1.z.string(),
            }),
            environment: exports.actionEnvironment,
            user: exports.startTransactionUser,
            params: ioSchema_1.serializableRecord,
            paramsMeta: zod_1.z.any().optional(),
        }),
        returns: zod_1.z.discriminatedUnion('type', [
            zod_1.z.object({
                type: zod_1.z.literal('SUCCESS'),
                pageKey: zod_1.z.string(),
            }),
            zod_1.z.object({
                type: zod_1.z.literal('ERROR'),
                message: zod_1.z.string().optional(),
            }),
        ]),
    },
    CLOSE_PAGE: {
        inputs: zod_1.z.object({
            pageKey: zod_1.z.string(),
        }),
        returns: zod_1.z.void().nullable(),
    },
    START_TRANSACTION: {
        inputs: zod_1.z.object({
            transactionId: zod_1.z.string(),
            displayResolvesImmediately: zod_1.z.boolean().optional(),
            // Actually slug, for backward compatibility
            // TODO: Remove breaking release, superfluous with slug below
            actionName: zod_1.z.string(),
            action: zod_1.z.object({
                slug: zod_1.z.string(),
                url: zod_1.z.string(),
            }),
            environment: exports.actionEnvironment,
            user: exports.startTransactionUser,
            params: ioSchema_1.serializableRecord,
            paramsMeta: zod_1.z.any().optional(),
        }),
        returns: zod_1.z.void().nullable(),
    },
    CLOSE_TRANSACTION: {
        inputs: zod_1.z.object({
            transactionId: zod_1.z.string(),
        }),
        returns: zod_1.z.void().nullable(),
    },
    IO_RESPONSE: {
        inputs: zod_1.z.object({
            value: zod_1.z.string(),
            transactionId: zod_1.z.string(),
        }),
        returns: zod_1.z.void().nullable(),
    },
};
