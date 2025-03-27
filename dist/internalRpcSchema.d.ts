import { z } from 'zod';
export declare const DUPLEX_MESSAGE_SCHEMA: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
    id: z.ZodString;
    kind: z.ZodLiteral<"CALL">;
    methodName: z.ZodString;
    data: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    methodName: string;
    id: string;
    kind: "CALL";
    data?: any;
}, {
    methodName: string;
    id: string;
    kind: "CALL";
    data?: any;
}>, z.ZodObject<{
    id: z.ZodString;
    kind: z.ZodLiteral<"RESPONSE">;
    methodName: z.ZodString;
    data: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    methodName: string;
    id: string;
    kind: "RESPONSE";
    data?: any;
}, {
    methodName: string;
    id: string;
    kind: "RESPONSE";
    data?: any;
}>]>;
export type DuplexMessage = z.infer<typeof DUPLEX_MESSAGE_SCHEMA>;
export declare const TRANSACTION_RESULT_SCHEMA_VERSION = 1;
export declare const actionMode: z.ZodEnum<["live", "console"]>;
export declare const actionEnvironment: z.ZodUnion<[z.ZodEnum<["production", "development"]>, z.ZodString]>;
export type ActionEnvironment = z.infer<typeof actionEnvironment>;
export declare const LOADING_OPTIONS: z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    itemsInQueue: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    label?: string | undefined;
    description?: string | undefined;
    itemsInQueue?: number | undefined;
}, {
    label?: string | undefined;
    description?: string | undefined;
    itemsInQueue?: number | undefined;
}>;
declare const LOADING_STATE: z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    itemsInQueue: z.ZodOptional<z.ZodNumber>;
    itemsCompleted: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    label?: string | undefined;
    description?: string | undefined;
    itemsInQueue?: number | undefined;
    itemsCompleted?: number | undefined;
}, {
    label?: string | undefined;
    description?: string | undefined;
    itemsInQueue?: number | undefined;
    itemsCompleted?: number | undefined;
}>;
declare const BACKWARD_COMPATIBLE_LOADING_STATE: z.ZodObject<z.objectUtil.extendShape<{
    label: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    itemsInQueue: z.ZodOptional<z.ZodNumber>;
    itemsCompleted: z.ZodOptional<z.ZodNumber>;
}, {
    /** @deprecated in favor of `label` (for real this time) */
    title: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    label?: string | undefined;
    description?: string | undefined;
    title?: string | undefined;
    itemsInQueue?: number | undefined;
    itemsCompleted?: number | undefined;
}, {
    label?: string | undefined;
    description?: string | undefined;
    title?: string | undefined;
    itemsInQueue?: number | undefined;
    itemsCompleted?: number | undefined;
}>;
declare const SDK_ALERT: z.ZodObject<{
    minSdkVersion: z.ZodString;
    severity: z.ZodEnum<["INFO", "WARNING", "ERROR"]>;
    message: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    minSdkVersion: string;
    severity: "INFO" | "WARNING" | "ERROR";
    message?: string | null | undefined;
}, {
    minSdkVersion: string;
    severity: "INFO" | "WARNING" | "ERROR";
    message?: string | null | undefined;
}>;
export type SdkAlert = z.infer<typeof SDK_ALERT>;
export type LoadingOptions = z.input<typeof LOADING_OPTIONS>;
export type BackwardCompatibleLoadingOptions = LoadingOptions & {
    /** @deprecated Please use `label` instead. */
    title?: string;
};
export type LoadingState = z.input<typeof LOADING_STATE>;
export type BackwardCompatibleLoadingState = z.input<typeof BACKWARD_COMPATIBLE_LOADING_STATE>;
export declare const CTX_USER_ROLE: z.ZodEnum<["admin", "developer", "member"]>;
export type CtxUserRole = z.input<typeof CTX_USER_ROLE>;
export declare const ACCESS_CONTROL_DEFINITION: z.ZodUnion<[z.ZodLiteral<"entire-organization">, z.ZodObject<{
    teams: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    teams?: string[] | undefined;
}, {
    teams?: string[] | undefined;
}>]>;
export type AccessControlDefinition = z.infer<typeof ACCESS_CONTROL_DEFINITION>;
export declare const ACTION_DEFINITION: z.ZodObject<{
    groupSlug: z.ZodOptional<z.ZodString>;
    slug: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    backgroundable: z.ZodOptional<z.ZodBoolean>;
    unlisted: z.ZodOptional<z.ZodBoolean>;
    warnOnClose: z.ZodOptional<z.ZodBoolean>;
    access: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"entire-organization">, z.ZodObject<{
        teams: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        teams?: string[] | undefined;
    }, {
        teams?: string[] | undefined;
    }>]>>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    description?: string | undefined;
    name?: string | undefined;
    groupSlug?: string | undefined;
    backgroundable?: boolean | undefined;
    unlisted?: boolean | undefined;
    warnOnClose?: boolean | undefined;
    access?: "entire-organization" | {
        teams?: string[] | undefined;
    } | undefined;
}, {
    slug: string;
    description?: string | undefined;
    name?: string | undefined;
    groupSlug?: string | undefined;
    backgroundable?: boolean | undefined;
    unlisted?: boolean | undefined;
    warnOnClose?: boolean | undefined;
    access?: "entire-organization" | {
        teams?: string[] | undefined;
    } | undefined;
}>;
export type ActionDefinition = z.infer<typeof ACTION_DEFINITION>;
export declare const PAGE_DEFINITION: z.ZodObject<{
    slug: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    hasHandler: z.ZodOptional<z.ZodBoolean>;
    hasIndex: z.ZodOptional<z.ZodBoolean>;
    unlisted: z.ZodOptional<z.ZodBoolean>;
    access: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"entire-organization">, z.ZodObject<{
        teams: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        teams?: string[] | undefined;
    }, {
        teams?: string[] | undefined;
    }>]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    description?: string | undefined;
    unlisted?: boolean | undefined;
    access?: "entire-organization" | {
        teams?: string[] | undefined;
    } | undefined;
    hasHandler?: boolean | undefined;
    hasIndex?: boolean | undefined;
}, {
    name: string;
    slug: string;
    description?: string | undefined;
    unlisted?: boolean | undefined;
    access?: "entire-organization" | {
        teams?: string[] | undefined;
    } | undefined;
    hasHandler?: boolean | undefined;
    hasIndex?: boolean | undefined;
}>;
export type PageDefinition = z.infer<typeof PAGE_DEFINITION>;
export declare const ICE_SERVER: z.ZodObject<{
    url: z.ZodString;
    urls: z.ZodString;
    hostname: z.ZodString;
    port: z.ZodNumber;
    relayType: z.ZodOptional<z.ZodEnum<["TurnUdp", "TurnTcp", "TurnTls"]>>;
    username: z.ZodOptional<z.ZodString>;
    credential: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    url: string;
    urls: string;
    hostname: string;
    port: number;
    relayType?: "TurnUdp" | "TurnTcp" | "TurnTls" | undefined;
    username?: string | undefined;
    credential?: string | undefined;
    password?: string | undefined;
}, {
    url: string;
    urls: string;
    hostname: string;
    port: number;
    relayType?: "TurnUdp" | "TurnTcp" | "TurnTls" | undefined;
    username?: string | undefined;
    credential?: string | undefined;
    password?: string | undefined;
}>;
export type IceServer = z.infer<typeof ICE_SERVER>;
export declare const ICE_CONFIG: z.ZodObject<{
    iceServers: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        urls: z.ZodString;
        hostname: z.ZodString;
        port: z.ZodNumber;
        relayType: z.ZodOptional<z.ZodEnum<["TurnUdp", "TurnTcp", "TurnTls"]>>;
        username: z.ZodOptional<z.ZodString>;
        credential: z.ZodOptional<z.ZodString>;
        password: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        urls: string;
        hostname: string;
        port: number;
        relayType?: "TurnUdp" | "TurnTcp" | "TurnTls" | undefined;
        username?: string | undefined;
        credential?: string | undefined;
        password?: string | undefined;
    }, {
        url: string;
        urls: string;
        hostname: string;
        port: number;
        relayType?: "TurnUdp" | "TurnTcp" | "TurnTls" | undefined;
        username?: string | undefined;
        credential?: string | undefined;
        password?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    iceServers: {
        url: string;
        urls: string;
        hostname: string;
        port: number;
        relayType?: "TurnUdp" | "TurnTcp" | "TurnTls" | undefined;
        username?: string | undefined;
        credential?: string | undefined;
        password?: string | undefined;
    }[];
}, {
    iceServers: {
        url: string;
        urls: string;
        hostname: string;
        port: number;
        relayType?: "TurnUdp" | "TurnTcp" | "TurnTls" | undefined;
        username?: string | undefined;
        credential?: string | undefined;
        password?: string | undefined;
    }[];
}>;
export type IceConfig = z.infer<typeof ICE_CONFIG>;
export declare const ENQUEUE_ACTION: {
    inputs: z.ZodObject<{
        slug: z.ZodString;
        assignee: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        params: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>>>>;
        paramsMeta: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        params?: Record<string, string | number | boolean | null | undefined> | null | undefined;
        assignee?: string | null | undefined;
        paramsMeta?: any;
    }, {
        slug: string;
        params?: Record<string, string | number | boolean | null | undefined> | null | undefined;
        assignee?: string | null | undefined;
        paramsMeta?: any;
    }>;
    returns: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"success">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "success";
        id: string;
    }, {
        type: "success";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"error">;
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
        type: "error";
    }, {
        message: string;
        type: "error";
    }>]>;
};
export declare const CREATE_GHOST_MODE_ACCOUNT: {
    inputs: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    returns: z.ZodObject<{
        ghostOrgId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        ghostOrgId: string;
    }, {
        ghostOrgId: string;
    }>;
};
export declare const DEQUEUE_ACTION: {
    inputs: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    returns: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"success">;
        id: z.ZodString;
        assignee: z.ZodOptional<z.ZodString>;
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>>>;
        paramsMeta: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        type: "success";
        id: string;
        params?: Record<string, string | number | boolean | null | undefined> | undefined;
        assignee?: string | undefined;
        paramsMeta?: any;
    }, {
        type: "success";
        id: string;
        params?: Record<string, string | number | boolean | null | undefined> | undefined;
        assignee?: string | undefined;
        paramsMeta?: any;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"error">;
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
        type: "error";
    }, {
        message: string;
        type: "error";
    }>]>;
};
export declare const NOTIFY: {
    inputs: z.ZodObject<{
        transactionId: z.ZodOptional<z.ZodString>;
        message: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        deliveryInstructions: z.ZodArray<z.ZodObject<{
            to: z.ZodString;
            method: z.ZodOptional<z.ZodEnum<["EMAIL", "SLACK"]>>;
        }, "strip", z.ZodTypeAny, {
            to: string;
            method?: "EMAIL" | "SLACK" | undefined;
        }, {
            to: string;
            method?: "EMAIL" | "SLACK" | undefined;
        }>, "many">;
        createdAt: z.ZodString;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        deliveryInstructions: {
            to: string;
            method?: "EMAIL" | "SLACK" | undefined;
        }[];
        createdAt: string;
        transactionId?: string | undefined;
        title?: string | undefined;
        idempotencyKey?: string | undefined;
    }, {
        message: string;
        deliveryInstructions: {
            to: string;
            method?: "EMAIL" | "SLACK" | undefined;
        }[];
        createdAt: string;
        transactionId?: string | undefined;
        title?: string | undefined;
        idempotencyKey?: string | undefined;
    }>;
    returns: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"success">;
    }, "strip", z.ZodTypeAny, {
        type: "success";
    }, {
        type: "success";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"error">;
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
        type: "error";
    }, {
        message: string;
        type: "error";
    }>]>;
};
export declare const DECLARE_HOST: {
    inputs: z.ZodObject<{
        httpHostId: z.ZodString;
        actions: z.ZodArray<z.ZodObject<{
            groupSlug: z.ZodOptional<z.ZodString>;
            slug: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            backgroundable: z.ZodOptional<z.ZodBoolean>;
            unlisted: z.ZodOptional<z.ZodBoolean>;
            warnOnClose: z.ZodOptional<z.ZodBoolean>;
            access: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"entire-organization">, z.ZodObject<{
                teams: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                teams?: string[] | undefined;
            }, {
                teams?: string[] | undefined;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            slug: string;
            description?: string | undefined;
            name?: string | undefined;
            groupSlug?: string | undefined;
            backgroundable?: boolean | undefined;
            unlisted?: boolean | undefined;
            warnOnClose?: boolean | undefined;
            access?: "entire-organization" | {
                teams?: string[] | undefined;
            } | undefined;
        }, {
            slug: string;
            description?: string | undefined;
            name?: string | undefined;
            groupSlug?: string | undefined;
            backgroundable?: boolean | undefined;
            unlisted?: boolean | undefined;
            warnOnClose?: boolean | undefined;
            access?: "entire-organization" | {
                teams?: string[] | undefined;
            } | undefined;
        }>, "many">;
        groups: z.ZodOptional<z.ZodArray<z.ZodObject<{
            slug: z.ZodString;
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            hasHandler: z.ZodOptional<z.ZodBoolean>;
            hasIndex: z.ZodOptional<z.ZodBoolean>;
            unlisted: z.ZodOptional<z.ZodBoolean>;
            access: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"entire-organization">, z.ZodObject<{
                teams: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                teams?: string[] | undefined;
            }, {
                teams?: string[] | undefined;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            slug: string;
            description?: string | undefined;
            unlisted?: boolean | undefined;
            access?: "entire-organization" | {
                teams?: string[] | undefined;
            } | undefined;
            hasHandler?: boolean | undefined;
            hasIndex?: boolean | undefined;
        }, {
            name: string;
            slug: string;
            description?: string | undefined;
            unlisted?: boolean | undefined;
            access?: "entire-organization" | {
                teams?: string[] | undefined;
            } | undefined;
            hasHandler?: boolean | undefined;
            hasIndex?: boolean | undefined;
        }>, "many">>;
        sdkName: z.ZodString;
        sdkVersion: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        httpHostId: string;
        actions: {
            slug: string;
            description?: string | undefined;
            name?: string | undefined;
            groupSlug?: string | undefined;
            backgroundable?: boolean | undefined;
            unlisted?: boolean | undefined;
            warnOnClose?: boolean | undefined;
            access?: "entire-organization" | {
                teams?: string[] | undefined;
            } | undefined;
        }[];
        sdkName: string;
        sdkVersion: string;
        groups?: {
            name: string;
            slug: string;
            description?: string | undefined;
            unlisted?: boolean | undefined;
            access?: "entire-organization" | {
                teams?: string[] | undefined;
            } | undefined;
            hasHandler?: boolean | undefined;
            hasIndex?: boolean | undefined;
        }[] | undefined;
    }, {
        httpHostId: string;
        actions: {
            slug: string;
            description?: string | undefined;
            name?: string | undefined;
            groupSlug?: string | undefined;
            backgroundable?: boolean | undefined;
            unlisted?: boolean | undefined;
            warnOnClose?: boolean | undefined;
            access?: "entire-organization" | {
                teams?: string[] | undefined;
            } | undefined;
        }[];
        sdkName: string;
        sdkVersion: string;
        groups?: {
            name: string;
            slug: string;
            description?: string | undefined;
            unlisted?: boolean | undefined;
            access?: "entire-organization" | {
                teams?: string[] | undefined;
            } | undefined;
            hasHandler?: boolean | undefined;
            hasIndex?: boolean | undefined;
        }[] | undefined;
    }>;
    returns: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"success">;
        invalidSlugs: z.ZodArray<z.ZodString, "many">;
        sdkAlert: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            minSdkVersion: z.ZodString;
            severity: z.ZodEnum<["INFO", "WARNING", "ERROR"]>;
            message: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            minSdkVersion: string;
            severity: "INFO" | "WARNING" | "ERROR";
            message?: string | null | undefined;
        }, {
            minSdkVersion: string;
            severity: "INFO" | "WARNING" | "ERROR";
            message?: string | null | undefined;
        }>>>;
        warnings: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "success";
        invalidSlugs: string[];
        warnings: string[];
        sdkAlert?: {
            minSdkVersion: string;
            severity: "INFO" | "WARNING" | "ERROR";
            message?: string | null | undefined;
        } | null | undefined;
    }, {
        type: "success";
        invalidSlugs: string[];
        warnings: string[];
        sdkAlert?: {
            minSdkVersion: string;
            severity: "INFO" | "WARNING" | "ERROR";
            message?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"error">;
        message: z.ZodString;
        sdkAlert: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            minSdkVersion: z.ZodString;
            severity: z.ZodEnum<["INFO", "WARNING", "ERROR"]>;
            message: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            minSdkVersion: string;
            severity: "INFO" | "WARNING" | "ERROR";
            message?: string | null | undefined;
        }, {
            minSdkVersion: string;
            severity: "INFO" | "WARNING" | "ERROR";
            message?: string | null | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        type: "error";
        sdkAlert?: {
            minSdkVersion: string;
            severity: "INFO" | "WARNING" | "ERROR";
            message?: string | null | undefined;
        } | null | undefined;
    }, {
        message: string;
        type: "error";
        sdkAlert?: {
            minSdkVersion: string;
            severity: "INFO" | "WARNING" | "ERROR";
            message?: string | null | undefined;
        } | null | undefined;
    }>]>;
};
export declare const wsServerSchema: {
    CONNECT_TO_TRANSACTION_AS_CLIENT: {
        inputs: z.ZodObject<{
            transactionId: z.ZodString;
            params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
        }, "strip", z.ZodTypeAny, {
            transactionId: string;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        }, {
            transactionId: string;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        }>;
        returns: z.ZodBoolean;
    };
    __TEST_ONLY_REQUEST_DROP_CONNECTION: {
        inputs: z.ZodVoid;
        returns: z.ZodBoolean;
    };
    LEAVE_TRANSACTION: {
        inputs: z.ZodObject<{
            transactionId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            transactionId: string;
        }, {
            transactionId: string;
        }>;
        returns: z.ZodBoolean;
    };
    REQUEST_PAGE: {
        inputs: z.ZodObject<{
            pageKey: z.ZodString;
            pageSlug: z.ZodString;
            actionMode: z.ZodEnum<["live", "console"]>;
            organizationEnvironmentId: z.ZodString;
            params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
        }, "strip", z.ZodTypeAny, {
            pageKey: string;
            pageSlug: string;
            actionMode: "live" | "console";
            organizationEnvironmentId: string;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        }, {
            pageKey: string;
            pageSlug: string;
            actionMode: "live" | "console";
            organizationEnvironmentId: string;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        }>;
        returns: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"SUCCESS">;
            pageKey: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "SUCCESS";
            pageKey: string;
        }, {
            type: "SUCCESS";
            pageKey: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"ERROR">;
            message: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "ERROR";
            message?: string | undefined;
        }, {
            type: "ERROR";
            message?: string | undefined;
        }>]>;
    };
    LEAVE_PAGE: {
        inputs: z.ZodObject<{
            pageKey: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            pageKey: string;
        }, {
            pageKey: string;
        }>;
        returns: z.ZodBoolean;
    };
    RESPOND_TO_IO_CALL: {
        inputs: z.ZodObject<{
            transactionId: z.ZodString;
            ioResponse: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            transactionId: string;
            ioResponse: string;
        }, {
            transactionId: string;
            ioResponse: string;
        }>;
        returns: z.ZodBoolean;
    };
    SEND_IO_CALL: {
        inputs: z.ZodObject<{
            transactionId: z.ZodString;
            ioCall: z.ZodString;
            skipClientCall: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            transactionId: string;
            ioCall: string;
            skipClientCall?: boolean | undefined;
        }, {
            transactionId: string;
            ioCall: string;
            skipClientCall?: boolean | undefined;
        }>;
        returns: z.ZodUnion<[z.ZodBoolean, z.ZodObject<{
            type: z.ZodLiteral<"ERROR">;
            message: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "ERROR";
            message?: string | undefined;
        }, {
            type: "ERROR";
            message?: string | undefined;
        }>]>;
    };
    SEND_PAGE: {
        inputs: z.ZodObject<{
            pageKey: z.ZodString;
            page: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            pageKey: string;
            page?: string | null | undefined;
        }, {
            pageKey: string;
            page?: string | null | undefined;
        }>;
        returns: z.ZodBoolean;
    };
    SEND_LOADING_CALL: {
        inputs: z.ZodIntersection<z.ZodObject<z.objectUtil.extendShape<{
            label: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            itemsInQueue: z.ZodOptional<z.ZodNumber>;
            itemsCompleted: z.ZodOptional<z.ZodNumber>;
        }, {
            /** @deprecated in favor of `label` (for real this time) */
            title: z.ZodOptional<z.ZodString>;
        }>, "strip", z.ZodTypeAny, {
            label?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            itemsInQueue?: number | undefined;
            itemsCompleted?: number | undefined;
        }, {
            label?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            itemsInQueue?: number | undefined;
            itemsCompleted?: number | undefined;
        }>, z.ZodObject<{
            transactionId: z.ZodString;
            skipClientCall: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            transactionId: string;
            skipClientCall?: boolean | undefined;
        }, {
            transactionId: string;
            skipClientCall?: boolean | undefined;
        }>>;
        returns: z.ZodBoolean;
    };
    SEND_LOG: {
        inputs: z.ZodObject<{
            transactionId: z.ZodString;
            data: z.ZodString;
            index: z.ZodOptional<z.ZodNumber>;
            timestamp: z.ZodOptional<z.ZodNumber>;
            skipClientCall: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            transactionId: string;
            data: string;
            skipClientCall?: boolean | undefined;
            index?: number | undefined;
            timestamp?: number | undefined;
        }, {
            transactionId: string;
            data: string;
            skipClientCall?: boolean | undefined;
            index?: number | undefined;
            timestamp?: number | undefined;
        }>;
        returns: z.ZodBoolean;
    };
    NOTIFY: {
        inputs: z.ZodObject<{
            transactionId: z.ZodString;
            message: z.ZodString;
            title: z.ZodOptional<z.ZodString>;
            idempotencyKey: z.ZodOptional<z.ZodString>;
            deliveryInstructions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                to: z.ZodString;
                method: z.ZodOptional<z.ZodEnum<["EMAIL", "SLACK"]>>;
            }, "strip", z.ZodTypeAny, {
                to: string;
                method?: "EMAIL" | "SLACK" | undefined;
            }, {
                to: string;
                method?: "EMAIL" | "SLACK" | undefined;
            }>, "many">>;
            createdAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
            transactionId: string;
            createdAt: string;
            title?: string | undefined;
            deliveryInstructions?: {
                to: string;
                method?: "EMAIL" | "SLACK" | undefined;
            }[] | undefined;
            idempotencyKey?: string | undefined;
        }, {
            message: string;
            transactionId: string;
            createdAt: string;
            title?: string | undefined;
            deliveryInstructions?: {
                to: string;
                method?: "EMAIL" | "SLACK" | undefined;
            }[] | undefined;
            idempotencyKey?: string | undefined;
        }>;
        returns: z.ZodBoolean;
    };
    SEND_REDIRECT: {
        inputs: z.ZodIntersection<z.ZodObject<{
            transactionId: z.ZodString;
            skipClientCall: z.ZodOptional<z.ZodBoolean>;
            replace: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            transactionId: string;
            replace?: boolean | undefined;
            skipClientCall?: boolean | undefined;
        }, {
            transactionId: string;
            replace?: boolean | undefined;
            skipClientCall?: boolean | undefined;
        }>, z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
        }, {
            url: string;
        }>, z.ZodObject<{
            route: z.ZodString;
            params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
        }, "strip", z.ZodTypeAny, {
            route: string;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        }, {
            route: string;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        }>]>, z.ZodObject<{
            action: z.ZodString;
            params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
        }, "strip", z.ZodTypeAny, {
            action: string;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        }, {
            action: string;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        }>]>>;
        returns: z.ZodBoolean;
    };
    MARK_TRANSACTION_COMPLETE: {
        inputs: z.ZodObject<{
            transactionId: z.ZodString;
            resultStatus: z.ZodOptional<z.ZodEnum<["SUCCESS", "FAILURE", "CANCELED", "REDIRECTED"]>>;
            result: z.ZodOptional<z.ZodString>;
            skipClientCall: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            transactionId: string;
            skipClientCall?: boolean | undefined;
            resultStatus?: "CANCELED" | "SUCCESS" | "FAILURE" | "REDIRECTED" | undefined;
            result?: string | undefined;
        }, {
            transactionId: string;
            skipClientCall?: boolean | undefined;
            resultStatus?: "CANCELED" | "SUCCESS" | "FAILURE" | "REDIRECTED" | undefined;
            result?: string | undefined;
        }>;
        returns: z.ZodBoolean;
    };
    INITIALIZE_CLIENT: {
        inputs: z.ZodUndefined;
        returns: z.ZodBoolean;
    };
    INITIALIZE_HOST: {
        inputs: z.ZodIntersection<z.ZodObject<{
            sdkName: z.ZodOptional<z.ZodString>;
            sdkVersion: z.ZodOptional<z.ZodString>;
            requestId: z.ZodOptional<z.ZodString>;
            timestamp: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            sdkName?: string | undefined;
            sdkVersion?: string | undefined;
            timestamp?: number | undefined;
            requestId?: string | undefined;
        }, {
            sdkName?: string | undefined;
            sdkVersion?: string | undefined;
            timestamp?: number | undefined;
            requestId?: string | undefined;
        }>, z.ZodUnion<[z.ZodObject<{
            callableActionNames: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            callableActionNames: string[];
        }, {
            callableActionNames: string[];
        }>, z.ZodObject<{
            actions: z.ZodArray<z.ZodObject<{
                groupSlug: z.ZodOptional<z.ZodString>;
                slug: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
                description: z.ZodOptional<z.ZodString>;
                backgroundable: z.ZodOptional<z.ZodBoolean>;
                unlisted: z.ZodOptional<z.ZodBoolean>;
                warnOnClose: z.ZodOptional<z.ZodBoolean>;
                access: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"entire-organization">, z.ZodObject<{
                    teams: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    teams?: string[] | undefined;
                }, {
                    teams?: string[] | undefined;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                slug: string;
                description?: string | undefined;
                name?: string | undefined;
                groupSlug?: string | undefined;
                backgroundable?: boolean | undefined;
                unlisted?: boolean | undefined;
                warnOnClose?: boolean | undefined;
                access?: "entire-organization" | {
                    teams?: string[] | undefined;
                } | undefined;
            }, {
                slug: string;
                description?: string | undefined;
                name?: string | undefined;
                groupSlug?: string | undefined;
                backgroundable?: boolean | undefined;
                unlisted?: boolean | undefined;
                warnOnClose?: boolean | undefined;
                access?: "entire-organization" | {
                    teams?: string[] | undefined;
                } | undefined;
            }>, "many">;
            groups: z.ZodOptional<z.ZodArray<z.ZodObject<{
                slug: z.ZodString;
                name: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
                hasHandler: z.ZodOptional<z.ZodBoolean>;
                hasIndex: z.ZodOptional<z.ZodBoolean>;
                unlisted: z.ZodOptional<z.ZodBoolean>;
                access: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"entire-organization">, z.ZodObject<{
                    teams: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    teams?: string[] | undefined;
                }, {
                    teams?: string[] | undefined;
                }>]>>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                slug: string;
                description?: string | undefined;
                unlisted?: boolean | undefined;
                access?: "entire-organization" | {
                    teams?: string[] | undefined;
                } | undefined;
                hasHandler?: boolean | undefined;
                hasIndex?: boolean | undefined;
            }, {
                name: string;
                slug: string;
                description?: string | undefined;
                unlisted?: boolean | undefined;
                access?: "entire-organization" | {
                    teams?: string[] | undefined;
                } | undefined;
                hasHandler?: boolean | undefined;
                hasIndex?: boolean | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            actions: {
                slug: string;
                description?: string | undefined;
                name?: string | undefined;
                groupSlug?: string | undefined;
                backgroundable?: boolean | undefined;
                unlisted?: boolean | undefined;
                warnOnClose?: boolean | undefined;
                access?: "entire-organization" | {
                    teams?: string[] | undefined;
                } | undefined;
            }[];
            groups?: {
                name: string;
                slug: string;
                description?: string | undefined;
                unlisted?: boolean | undefined;
                access?: "entire-organization" | {
                    teams?: string[] | undefined;
                } | undefined;
                hasHandler?: boolean | undefined;
                hasIndex?: boolean | undefined;
            }[] | undefined;
        }, {
            actions: {
                slug: string;
                description?: string | undefined;
                name?: string | undefined;
                groupSlug?: string | undefined;
                backgroundable?: boolean | undefined;
                unlisted?: boolean | undefined;
                warnOnClose?: boolean | undefined;
                access?: "entire-organization" | {
                    teams?: string[] | undefined;
                } | undefined;
            }[];
            groups?: {
                name: string;
                slug: string;
                description?: string | undefined;
                unlisted?: boolean | undefined;
                access?: "entire-organization" | {
                    teams?: string[] | undefined;
                } | undefined;
                hasHandler?: boolean | undefined;
                hasIndex?: boolean | undefined;
            }[] | undefined;
        }>]>>;
        returns: z.ZodNullable<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"success">;
            environment: z.ZodUnion<[z.ZodEnum<["production", "development"]>, z.ZodString]>;
            invalidSlugs: z.ZodArray<z.ZodString, "many">;
            organization: z.ZodObject<{
                name: z.ZodString;
                slug: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                slug: string;
            }, {
                name: string;
                slug: string;
            }>;
            dashboardUrl: z.ZodString;
            forcePeerMessages: z.ZodOptional<z.ZodBoolean>;
            sdkAlert: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                minSdkVersion: z.ZodString;
                severity: z.ZodEnum<["INFO", "WARNING", "ERROR"]>;
                message: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                minSdkVersion: string;
                severity: "INFO" | "WARNING" | "ERROR";
                message?: string | null | undefined;
            }, {
                minSdkVersion: string;
                severity: "INFO" | "WARNING" | "ERROR";
                message?: string | null | undefined;
            }>>>;
            warnings: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            type: "success";
            invalidSlugs: string[];
            warnings: string[];
            environment: string;
            organization: {
                name: string;
                slug: string;
            };
            dashboardUrl: string;
            sdkAlert?: {
                minSdkVersion: string;
                severity: "INFO" | "WARNING" | "ERROR";
                message?: string | null | undefined;
            } | null | undefined;
            forcePeerMessages?: boolean | undefined;
        }, {
            type: "success";
            invalidSlugs: string[];
            warnings: string[];
            environment: string;
            organization: {
                name: string;
                slug: string;
            };
            dashboardUrl: string;
            sdkAlert?: {
                minSdkVersion: string;
                severity: "INFO" | "WARNING" | "ERROR";
                message?: string | null | undefined;
            } | null | undefined;
            forcePeerMessages?: boolean | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"error">;
            message: z.ZodString;
            sdkAlert: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                minSdkVersion: z.ZodString;
                severity: z.ZodEnum<["INFO", "WARNING", "ERROR"]>;
                message: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                minSdkVersion: string;
                severity: "INFO" | "WARNING" | "ERROR";
                message?: string | null | undefined;
            }, {
                minSdkVersion: string;
                severity: "INFO" | "WARNING" | "ERROR";
                message?: string | null | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            message: string;
            type: "error";
            sdkAlert?: {
                minSdkVersion: string;
                severity: "INFO" | "WARNING" | "ERROR";
                message?: string | null | undefined;
            } | null | undefined;
        }, {
            message: string;
            type: "error";
            sdkAlert?: {
                minSdkVersion: string;
                severity: "INFO" | "WARNING" | "ERROR";
                message?: string | null | undefined;
            } | null | undefined;
        }>]>>;
    };
    BEGIN_HOST_SHUTDOWN: {
        inputs: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        returns: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"success">;
        }, "strip", z.ZodTypeAny, {
            type: "success";
        }, {
            type: "success";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"error">;
            message: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "error";
            message?: string | undefined;
        }, {
            type: "error";
            message?: string | undefined;
        }>]>;
    };
};
export type WSServerSchema = typeof wsServerSchema;
export declare const clientSchema: {
    CLIENT_USURPED: {
        inputs: z.ZodObject<{
            transactionId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            transactionId: string;
        }, {
            transactionId: string;
        }>;
        returns: z.ZodNullable<z.ZodVoid>;
    };
    TRANSACTION_COMPLETED: {
        inputs: z.ZodObject<{
            transactionId: z.ZodString;
            resultStatus: z.ZodEnum<["SUCCESS", "FAILURE", "CANCELED", "REDIRECTED"]>;
            result: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            transactionId: string;
            resultStatus: "CANCELED" | "SUCCESS" | "FAILURE" | "REDIRECTED";
            result?: string | undefined;
        }, {
            transactionId: string;
            resultStatus: "CANCELED" | "SUCCESS" | "FAILURE" | "REDIRECTED";
            result?: string | undefined;
        }>;
        returns: z.ZodNullable<z.ZodVoid>;
    };
    HOST_CLOSED_UNEXPECTEDLY: {
        inputs: z.ZodObject<{
            transactionId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            transactionId: string;
        }, {
            transactionId: string;
        }>;
        returns: z.ZodNullable<z.ZodVoid>;
    };
    HOST_RECONNECTED: {
        inputs: z.ZodObject<{
            transactionId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            transactionId: string;
        }, {
            transactionId: string;
        }>;
        returns: z.ZodNullable<z.ZodVoid>;
    };
    RENDER_PAGE: {
        inputs: z.ZodObject<{
            pageKey: z.ZodString;
            page: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            hostInstanceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            pageKey: string;
            hostInstanceId: string;
            page?: string | null | undefined;
        }, {
            pageKey: string;
            hostInstanceId: string;
            page?: string | null | undefined;
        }>;
        returns: z.ZodBoolean;
    };
    RENDER: {
        inputs: z.ZodObject<{
            transactionId: z.ZodString;
            toRender: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            toRender: string;
            transactionId: string;
        }, {
            toRender: string;
            transactionId: string;
        }>;
        returns: z.ZodBoolean;
    };
    LOADING_STATE: {
        inputs: z.ZodObject<z.objectUtil.extendShape<{
            transactionId: z.ZodString;
        }, z.objectUtil.extendShape<{
            label: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            itemsInQueue: z.ZodOptional<z.ZodNumber>;
            itemsCompleted: z.ZodOptional<z.ZodNumber>;
        }, {
            /** @deprecated in favor of `label` (for real this time) */
            title: z.ZodOptional<z.ZodString>;
        }>>, "strip", z.ZodTypeAny, {
            transactionId: string;
            label?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            itemsInQueue?: number | undefined;
            itemsCompleted?: number | undefined;
        }, {
            transactionId: string;
            label?: string | undefined;
            description?: string | undefined;
            title?: string | undefined;
            itemsInQueue?: number | undefined;
            itemsCompleted?: number | undefined;
        }>;
        returns: z.ZodBoolean;
    };
    LOG: {
        inputs: z.ZodObject<{
            transactionId: z.ZodString;
            data: z.ZodNullable<z.ZodString>;
            index: z.ZodNumber;
            timestamp: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            transactionId: string;
            data: string | null;
            index: number;
            timestamp: number;
        }, {
            transactionId: string;
            data: string | null;
            index: number;
            timestamp: number;
        }>;
        returns: z.ZodBoolean;
    };
    NOTIFY: {
        inputs: z.ZodObject<{
            transactionId: z.ZodString;
            deliveries: z.ZodArray<z.ZodObject<{
                to: z.ZodString;
                method: z.ZodOptional<z.ZodEnum<["EMAIL", "SLACK"]>>;
            }, "strip", z.ZodTypeAny, {
                to: string;
                method?: "EMAIL" | "SLACK" | undefined;
            }, {
                to: string;
                method?: "EMAIL" | "SLACK" | undefined;
            }>, "many">;
            message: z.ZodString;
            title: z.ZodOptional<z.ZodString>;
            idempotencyKey: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            message: string;
            transactionId: string;
            deliveries: {
                to: string;
                method?: "EMAIL" | "SLACK" | undefined;
            }[];
            title?: string | undefined;
            idempotencyKey?: string | undefined;
        }, {
            message: string;
            transactionId: string;
            deliveries: {
                to: string;
                method?: "EMAIL" | "SLACK" | undefined;
            }[];
            title?: string | undefined;
            idempotencyKey?: string | undefined;
        }>;
        returns: z.ZodBoolean;
    };
    REDIRECT: {
        inputs: z.ZodIntersection<z.ZodObject<{
            transactionId: z.ZodString;
            replace: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            transactionId: string;
            replace?: boolean | undefined;
        }, {
            transactionId: string;
            replace?: boolean | undefined;
        }>, z.ZodUnion<[z.ZodObject<{
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
        }, {
            url: string;
        }>, z.ZodObject<{
            route: z.ZodString;
            params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
        }, "strip", z.ZodTypeAny, {
            route: string;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        }, {
            route: string;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        }>]>>;
        returns: z.ZodBoolean;
    };
};
export type ClientSchema = typeof clientSchema;
export declare const startTransactionUser: z.ZodObject<{
    email: z.ZodString;
    firstName: z.ZodNullable<z.ZodString>;
    lastName: z.ZodNullable<z.ZodString>;
    role: z.ZodEnum<["admin", "developer", "member"]>;
    teams: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    teams: string[];
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: "admin" | "developer" | "member";
}, {
    teams: string[];
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: "admin" | "developer" | "member";
}>;
export type StartTransactionUser = z.input<typeof startTransactionUser>;
export declare const hostSchema: {
    OPEN_PAGE: {
        inputs: z.ZodObject<{
            pageKey: z.ZodString;
            page: z.ZodObject<{
                slug: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                slug: string;
            }, {
                slug: string;
            }>;
            environment: z.ZodUnion<[z.ZodEnum<["production", "development"]>, z.ZodString]>;
            user: z.ZodObject<{
                email: z.ZodString;
                firstName: z.ZodNullable<z.ZodString>;
                lastName: z.ZodNullable<z.ZodString>;
                role: z.ZodEnum<["admin", "developer", "member"]>;
                teams: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                teams: string[];
                email: string;
                firstName: string | null;
                lastName: string | null;
                role: "admin" | "developer" | "member";
            }, {
                teams: string[];
                email: string;
                firstName: string | null;
                lastName: string | null;
                role: "admin" | "developer" | "member";
            }>;
            params: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>;
            paramsMeta: z.ZodOptional<z.ZodAny>;
        }, "strip", z.ZodTypeAny, {
            params: Record<string, string | number | bigint | boolean | Date | null | undefined>;
            pageKey: string;
            page: {
                slug: string;
            };
            environment: string;
            user: {
                teams: string[];
                email: string;
                firstName: string | null;
                lastName: string | null;
                role: "admin" | "developer" | "member";
            };
            paramsMeta?: any;
        }, {
            params: Record<string, string | number | bigint | boolean | Date | null | undefined>;
            pageKey: string;
            page: {
                slug: string;
            };
            environment: string;
            user: {
                teams: string[];
                email: string;
                firstName: string | null;
                lastName: string | null;
                role: "admin" | "developer" | "member";
            };
            paramsMeta?: any;
        }>;
        returns: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"SUCCESS">;
            pageKey: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "SUCCESS";
            pageKey: string;
        }, {
            type: "SUCCESS";
            pageKey: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"ERROR">;
            message: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "ERROR";
            message?: string | undefined;
        }, {
            type: "ERROR";
            message?: string | undefined;
        }>]>;
    };
    CLOSE_PAGE: {
        inputs: z.ZodObject<{
            pageKey: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            pageKey: string;
        }, {
            pageKey: string;
        }>;
        returns: z.ZodNullable<z.ZodVoid>;
    };
    START_TRANSACTION: {
        inputs: z.ZodObject<{
            transactionId: z.ZodString;
            displayResolvesImmediately: z.ZodOptional<z.ZodBoolean>;
            actionName: z.ZodString;
            action: z.ZodObject<{
                slug: z.ZodString;
                url: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                url: string;
                slug: string;
            }, {
                url: string;
                slug: string;
            }>;
            environment: z.ZodUnion<[z.ZodEnum<["production", "development"]>, z.ZodString]>;
            user: z.ZodObject<{
                email: z.ZodString;
                firstName: z.ZodNullable<z.ZodString>;
                lastName: z.ZodNullable<z.ZodString>;
                role: z.ZodEnum<["admin", "developer", "member"]>;
                teams: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                teams: string[];
                email: string;
                firstName: string | null;
                lastName: string | null;
                role: "admin" | "developer" | "member";
            }, {
                teams: string[];
                email: string;
                firstName: string | null;
                lastName: string | null;
                role: "admin" | "developer" | "member";
            }>;
            params: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>;
            paramsMeta: z.ZodOptional<z.ZodAny>;
        }, "strip", z.ZodTypeAny, {
            params: Record<string, string | number | bigint | boolean | Date | null | undefined>;
            transactionId: string;
            action: {
                url: string;
                slug: string;
            };
            environment: string;
            user: {
                teams: string[];
                email: string;
                firstName: string | null;
                lastName: string | null;
                role: "admin" | "developer" | "member";
            };
            actionName: string;
            displayResolvesImmediately?: boolean | undefined;
            paramsMeta?: any;
        }, {
            params: Record<string, string | number | bigint | boolean | Date | null | undefined>;
            transactionId: string;
            action: {
                url: string;
                slug: string;
            };
            environment: string;
            user: {
                teams: string[];
                email: string;
                firstName: string | null;
                lastName: string | null;
                role: "admin" | "developer" | "member";
            };
            actionName: string;
            displayResolvesImmediately?: boolean | undefined;
            paramsMeta?: any;
        }>;
        returns: z.ZodNullable<z.ZodVoid>;
    };
    CLOSE_TRANSACTION: {
        inputs: z.ZodObject<{
            transactionId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            transactionId: string;
        }, {
            transactionId: string;
        }>;
        returns: z.ZodNullable<z.ZodVoid>;
    };
    IO_RESPONSE: {
        inputs: z.ZodObject<{
            value: z.ZodString;
            transactionId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            transactionId: string;
        }, {
            value: string;
            transactionId: string;
        }>;
        returns: z.ZodNullable<z.ZodVoid>;
    };
};
export type HostSchema = typeof hostSchema;
export {};
