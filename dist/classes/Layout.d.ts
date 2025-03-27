import { z } from 'zod';
import { Literal, metaItemSchema } from '../ioSchema';
import { AnyDisplayIOPromise, ButtonItem, PageError, EventualValue } from '../types';
type EventualString = EventualValue<string>;
export interface BasicLayoutConfig {
    title?: EventualString;
    description?: EventualString;
    children?: AnyDisplayIOPromise[];
    menuItems?: ButtonItem[];
}
export interface Layout {
    title?: EventualString;
    description?: EventualString;
    children?: AnyDisplayIOPromise[];
    menuItems?: ButtonItem[];
    errors?: PageError[];
}
export declare class BasicLayout implements Layout {
    title?: EventualString;
    description?: EventualString;
    children?: AnyDisplayIOPromise[];
    menuItems?: ButtonItem[];
    errors?: PageError[];
    constructor(config: BasicLayoutConfig);
}
export type MetaItemSchema = z.infer<typeof metaItemSchema>;
export type MetaItemValue = Literal | bigint;
export interface MetaItem extends Omit<MetaItemSchema, 'value' | 'error'> {
    label: string;
    value: MetaItemValue | Promise<MetaItemValue> | (() => MetaItemValue) | (() => Promise<MetaItemValue>);
    error?: string;
}
export declare const META_ITEMS_SCHEMA: z.ZodObject<{
    json: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>, z.ZodBigInt]>>>>;
        url: z.ZodOptional<z.ZodString>;
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
        route: z.ZodOptional<z.ZodString>;
        action: z.ZodOptional<z.ZodString>;
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
        error: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        label: string;
        value?: string | number | bigint | boolean | Date | null | undefined;
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        url?: string | undefined;
        image?: {
            url: string;
            alt?: string | undefined;
            size?: "thumbnail" | "small" | "medium" | "large" | undefined;
            width?: "thumbnail" | "small" | "medium" | "large" | undefined;
            height?: "thumbnail" | "small" | "medium" | "large" | undefined;
        } | undefined;
        action?: string | undefined;
        route?: string | undefined;
        error?: string | null | undefined;
    }, {
        label: string;
        value?: string | number | bigint | boolean | Date | null | undefined;
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        url?: string | undefined;
        image?: {
            url: string;
            alt?: string | undefined;
            size?: "thumbnail" | "small" | "medium" | "large" | undefined;
            width?: "thumbnail" | "small" | "medium" | "large" | undefined;
            height?: "thumbnail" | "small" | "medium" | "large" | undefined;
        } | undefined;
        action?: string | undefined;
        route?: string | undefined;
        error?: string | null | undefined;
    }>, "many">;
    meta: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    json: {
        label: string;
        value?: string | number | bigint | boolean | Date | null | undefined;
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        url?: string | undefined;
        image?: {
            url: string;
            alt?: string | undefined;
            size?: "thumbnail" | "small" | "medium" | "large" | undefined;
            width?: "thumbnail" | "small" | "medium" | "large" | undefined;
            height?: "thumbnail" | "small" | "medium" | "large" | undefined;
        } | undefined;
        action?: string | undefined;
        route?: string | undefined;
        error?: string | null | undefined;
    }[];
    meta?: any;
}, {
    json: {
        label: string;
        value?: string | number | bigint | boolean | Date | null | undefined;
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        url?: string | undefined;
        image?: {
            url: string;
            alt?: string | undefined;
            size?: "thumbnail" | "small" | "medium" | "large" | undefined;
            width?: "thumbnail" | "small" | "medium" | "large" | undefined;
            height?: "thumbnail" | "small" | "medium" | "large" | undefined;
        } | undefined;
        action?: string | undefined;
        route?: string | undefined;
        error?: string | null | undefined;
    }[];
    meta?: any;
}>;
export type MetaItemsSchema = z.infer<typeof META_ITEMS_SCHEMA>;
export declare const LAYOUT_ERROR_SCHEMA: z.ZodObject<{
    layoutKey: z.ZodOptional<z.ZodString>;
    error: z.ZodString;
    message: z.ZodString;
    cause: z.ZodOptional<z.ZodString>;
    stack: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    message: string;
    error: string;
    cause?: string | undefined;
    layoutKey?: string | undefined;
    stack?: string | undefined;
}, {
    message: string;
    error: string;
    cause?: string | undefined;
    layoutKey?: string | undefined;
    stack?: string | undefined;
}>;
export declare const BASIC_LAYOUT_SCHEMA: z.ZodObject<{
    kind: z.ZodLiteral<"BASIC">;
    title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    children: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        inputGroupKey: z.ZodString;
        toRender: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
            methodName: z.ZodString;
            label: z.ZodString;
            props: z.ZodAny;
            propsMeta: z.ZodOptional<z.ZodAny>;
            isStateful: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, {
            isMultiple: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            isOptional: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            validationErrorMessage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            multipleProps: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                defaultValue: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodAny, "many">>>;
            }, "strip", z.ZodTypeAny, {
                defaultValue?: any[] | null | undefined;
            }, {
                defaultValue?: any[] | null | undefined;
            }>>>;
        }>, "strip", z.ZodTypeAny, {
            methodName: string;
            label: string;
            isStateful: boolean;
            isMultiple: boolean;
            isOptional: boolean;
            props?: any;
            propsMeta?: any;
            validationErrorMessage?: string | null | undefined;
            multipleProps?: {
                defaultValue?: any[] | null | undefined;
            } | null | undefined;
        }, {
            methodName: string;
            label: string;
            props?: any;
            propsMeta?: any;
            isStateful?: boolean | undefined;
            isMultiple?: boolean | undefined;
            isOptional?: boolean | undefined;
            validationErrorMessage?: string | null | undefined;
            multipleProps?: {
                defaultValue?: any[] | null | undefined;
            } | null | undefined;
        }>, "many">;
        validationErrorMessage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        choiceButtons: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodString;
            theme: z.ZodOptional<z.ZodEnum<["default", "primary", "secondary", "danger"]>>;
        }, "strip", z.ZodTypeAny, {
            value: string;
            label: string;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }, {
            value: string;
            label: string;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }>, "many">>>;
        continueButton: z.ZodOptional<z.ZodObject<{
            label: z.ZodOptional<z.ZodString>;
            theme: z.ZodOptional<z.ZodEnum<["default", "primary", "secondary", "danger"]>>;
        }, "strip", z.ZodTypeAny, {
            label?: string | undefined;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }, {
            label?: string | undefined;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }>>;
        kind: z.ZodLiteral<"RENDER">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        inputGroupKey: string;
        toRender: {
            methodName: string;
            label: string;
            isStateful: boolean;
            isMultiple: boolean;
            isOptional: boolean;
            props?: any;
            propsMeta?: any;
            validationErrorMessage?: string | null | undefined;
            multipleProps?: {
                defaultValue?: any[] | null | undefined;
            } | null | undefined;
        }[];
        kind: "RENDER";
        validationErrorMessage?: string | null | undefined;
        choiceButtons?: {
            value: string;
            label: string;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }[] | null | undefined;
        continueButton?: {
            label?: string | undefined;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        } | undefined;
    }, {
        id: string;
        inputGroupKey: string;
        toRender: {
            methodName: string;
            label: string;
            props?: any;
            propsMeta?: any;
            isStateful?: boolean | undefined;
            isMultiple?: boolean | undefined;
            isOptional?: boolean | undefined;
            validationErrorMessage?: string | null | undefined;
            multipleProps?: {
                defaultValue?: any[] | null | undefined;
            } | null | undefined;
        }[];
        kind: "RENDER";
        validationErrorMessage?: string | null | undefined;
        choiceButtons?: {
            value: string;
            label: string;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }[] | null | undefined;
        continueButton?: {
            label?: string | undefined;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        } | undefined;
    }>>>;
    metadata: z.ZodOptional<z.ZodObject<{
        json: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>, z.ZodBigInt]>>>>;
            url: z.ZodOptional<z.ZodString>;
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
            route: z.ZodOptional<z.ZodString>;
            action: z.ZodOptional<z.ZodString>;
            params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
            error: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            label: string;
            value?: string | number | bigint | boolean | Date | null | undefined;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
            url?: string | undefined;
            image?: {
                url: string;
                alt?: string | undefined;
                size?: "thumbnail" | "small" | "medium" | "large" | undefined;
                width?: "thumbnail" | "small" | "medium" | "large" | undefined;
                height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            } | undefined;
            action?: string | undefined;
            route?: string | undefined;
            error?: string | null | undefined;
        }, {
            label: string;
            value?: string | number | bigint | boolean | Date | null | undefined;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
            url?: string | undefined;
            image?: {
                url: string;
                alt?: string | undefined;
                size?: "thumbnail" | "small" | "medium" | "large" | undefined;
                width?: "thumbnail" | "small" | "medium" | "large" | undefined;
                height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            } | undefined;
            action?: string | undefined;
            route?: string | undefined;
            error?: string | null | undefined;
        }>, "many">;
        meta: z.ZodAny;
    }, "strip", z.ZodTypeAny, {
        json: {
            label: string;
            value?: string | number | bigint | boolean | Date | null | undefined;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
            url?: string | undefined;
            image?: {
                url: string;
                alt?: string | undefined;
                size?: "thumbnail" | "small" | "medium" | "large" | undefined;
                width?: "thumbnail" | "small" | "medium" | "large" | undefined;
                height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            } | undefined;
            action?: string | undefined;
            route?: string | undefined;
            error?: string | null | undefined;
        }[];
        meta?: any;
    }, {
        json: {
            label: string;
            value?: string | number | bigint | boolean | Date | null | undefined;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
            url?: string | undefined;
            image?: {
                url: string;
                alt?: string | undefined;
                size?: "thumbnail" | "small" | "medium" | "large" | undefined;
                width?: "thumbnail" | "small" | "medium" | "large" | undefined;
                height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            } | undefined;
            action?: string | undefined;
            route?: string | undefined;
            error?: string | null | undefined;
        }[];
        meta?: any;
    }>>;
    menuItems: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodIntersection<z.ZodObject<{
        label: z.ZodString;
        theme: z.ZodOptional<z.ZodEnum<["default", "primary", "secondary", "danger"]>>;
    }, "strip", z.ZodTypeAny, {
        label: string;
        theme?: "default" | "primary" | "secondary" | "danger" | undefined;
    }, {
        label: string;
        theme?: "default" | "primary" | "secondary" | "danger" | undefined;
    }>, z.ZodUnion<[z.ZodIntersection<z.ZodObject<{
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
        disabled: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        disabled?: boolean | undefined;
    }, {
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        disabled?: boolean | undefined;
    }>, z.ZodUnion<[z.ZodObject<{
        route: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        route: string;
    }, {
        route: string;
    }>, z.ZodObject<{
        action: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        action: string;
    }, {
        action: string;
    }>]>>, z.ZodObject<{
        url: z.ZodString;
        disabled: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        disabled?: boolean | undefined;
    }, {
        url: string;
        disabled?: boolean | undefined;
    }>, z.ZodObject<{
        disabled: z.ZodLiteral<true>;
    }, "strip", z.ZodTypeAny, {
        disabled: true;
    }, {
        disabled: true;
    }>]>>, "many">>>;
    errors: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        layoutKey: z.ZodOptional<z.ZodString>;
        error: z.ZodString;
        message: z.ZodString;
        cause: z.ZodOptional<z.ZodString>;
        stack: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        error: string;
        cause?: string | undefined;
        layoutKey?: string | undefined;
        stack?: string | undefined;
    }, {
        message: string;
        error: string;
        cause?: string | undefined;
        layoutKey?: string | undefined;
        stack?: string | undefined;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    kind: "BASIC";
    description?: string | null | undefined;
    title?: string | null | undefined;
    menuItems?: ({
        label: string;
        theme?: "default" | "primary" | "secondary" | "danger" | undefined;
    } & (({
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        disabled?: boolean | undefined;
    } & ({
        route: string;
    } | {
        action: string;
    })) | {
        url: string;
        disabled?: boolean | undefined;
    } | {
        disabled: true;
    }))[] | null | undefined;
    children?: {
        id: string;
        inputGroupKey: string;
        toRender: {
            methodName: string;
            label: string;
            isStateful: boolean;
            isMultiple: boolean;
            isOptional: boolean;
            props?: any;
            propsMeta?: any;
            validationErrorMessage?: string | null | undefined;
            multipleProps?: {
                defaultValue?: any[] | null | undefined;
            } | null | undefined;
        }[];
        kind: "RENDER";
        validationErrorMessage?: string | null | undefined;
        choiceButtons?: {
            value: string;
            label: string;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }[] | null | undefined;
        continueButton?: {
            label?: string | undefined;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        } | undefined;
    } | null | undefined;
    metadata?: {
        json: {
            label: string;
            value?: string | number | bigint | boolean | Date | null | undefined;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
            url?: string | undefined;
            image?: {
                url: string;
                alt?: string | undefined;
                size?: "thumbnail" | "small" | "medium" | "large" | undefined;
                width?: "thumbnail" | "small" | "medium" | "large" | undefined;
                height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            } | undefined;
            action?: string | undefined;
            route?: string | undefined;
            error?: string | null | undefined;
        }[];
        meta?: any;
    } | undefined;
    errors?: {
        message: string;
        error: string;
        cause?: string | undefined;
        layoutKey?: string | undefined;
        stack?: string | undefined;
    }[] | null | undefined;
}, {
    kind: "BASIC";
    description?: string | null | undefined;
    title?: string | null | undefined;
    menuItems?: ({
        label: string;
        theme?: "default" | "primary" | "secondary" | "danger" | undefined;
    } & (({
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        disabled?: boolean | undefined;
    } & ({
        route: string;
    } | {
        action: string;
    })) | {
        url: string;
        disabled?: boolean | undefined;
    } | {
        disabled: true;
    }))[] | null | undefined;
    children?: {
        id: string;
        inputGroupKey: string;
        toRender: {
            methodName: string;
            label: string;
            props?: any;
            propsMeta?: any;
            isStateful?: boolean | undefined;
            isMultiple?: boolean | undefined;
            isOptional?: boolean | undefined;
            validationErrorMessage?: string | null | undefined;
            multipleProps?: {
                defaultValue?: any[] | null | undefined;
            } | null | undefined;
        }[];
        kind: "RENDER";
        validationErrorMessage?: string | null | undefined;
        choiceButtons?: {
            value: string;
            label: string;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }[] | null | undefined;
        continueButton?: {
            label?: string | undefined;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        } | undefined;
    } | null | undefined;
    metadata?: {
        json: {
            label: string;
            value?: string | number | bigint | boolean | Date | null | undefined;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
            url?: string | undefined;
            image?: {
                url: string;
                alt?: string | undefined;
                size?: "thumbnail" | "small" | "medium" | "large" | undefined;
                width?: "thumbnail" | "small" | "medium" | "large" | undefined;
                height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            } | undefined;
            action?: string | undefined;
            route?: string | undefined;
            error?: string | null | undefined;
        }[];
        meta?: any;
    } | undefined;
    errors?: {
        message: string;
        error: string;
        cause?: string | undefined;
        layoutKey?: string | undefined;
        stack?: string | undefined;
    }[] | null | undefined;
}>;
export declare const LAYOUT_SCHEMA: z.ZodObject<{
    kind: z.ZodLiteral<"BASIC">;
    title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    children: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        inputGroupKey: z.ZodString;
        toRender: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
            methodName: z.ZodString;
            label: z.ZodString;
            props: z.ZodAny;
            propsMeta: z.ZodOptional<z.ZodAny>;
            isStateful: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, {
            isMultiple: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            isOptional: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            validationErrorMessage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            multipleProps: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                defaultValue: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodAny, "many">>>;
            }, "strip", z.ZodTypeAny, {
                defaultValue?: any[] | null | undefined;
            }, {
                defaultValue?: any[] | null | undefined;
            }>>>;
        }>, "strip", z.ZodTypeAny, {
            methodName: string;
            label: string;
            isStateful: boolean;
            isMultiple: boolean;
            isOptional: boolean;
            props?: any;
            propsMeta?: any;
            validationErrorMessage?: string | null | undefined;
            multipleProps?: {
                defaultValue?: any[] | null | undefined;
            } | null | undefined;
        }, {
            methodName: string;
            label: string;
            props?: any;
            propsMeta?: any;
            isStateful?: boolean | undefined;
            isMultiple?: boolean | undefined;
            isOptional?: boolean | undefined;
            validationErrorMessage?: string | null | undefined;
            multipleProps?: {
                defaultValue?: any[] | null | undefined;
            } | null | undefined;
        }>, "many">;
        validationErrorMessage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        choiceButtons: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodString;
            theme: z.ZodOptional<z.ZodEnum<["default", "primary", "secondary", "danger"]>>;
        }, "strip", z.ZodTypeAny, {
            value: string;
            label: string;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }, {
            value: string;
            label: string;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }>, "many">>>;
        continueButton: z.ZodOptional<z.ZodObject<{
            label: z.ZodOptional<z.ZodString>;
            theme: z.ZodOptional<z.ZodEnum<["default", "primary", "secondary", "danger"]>>;
        }, "strip", z.ZodTypeAny, {
            label?: string | undefined;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }, {
            label?: string | undefined;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }>>;
        kind: z.ZodLiteral<"RENDER">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        inputGroupKey: string;
        toRender: {
            methodName: string;
            label: string;
            isStateful: boolean;
            isMultiple: boolean;
            isOptional: boolean;
            props?: any;
            propsMeta?: any;
            validationErrorMessage?: string | null | undefined;
            multipleProps?: {
                defaultValue?: any[] | null | undefined;
            } | null | undefined;
        }[];
        kind: "RENDER";
        validationErrorMessage?: string | null | undefined;
        choiceButtons?: {
            value: string;
            label: string;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }[] | null | undefined;
        continueButton?: {
            label?: string | undefined;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        } | undefined;
    }, {
        id: string;
        inputGroupKey: string;
        toRender: {
            methodName: string;
            label: string;
            props?: any;
            propsMeta?: any;
            isStateful?: boolean | undefined;
            isMultiple?: boolean | undefined;
            isOptional?: boolean | undefined;
            validationErrorMessage?: string | null | undefined;
            multipleProps?: {
                defaultValue?: any[] | null | undefined;
            } | null | undefined;
        }[];
        kind: "RENDER";
        validationErrorMessage?: string | null | undefined;
        choiceButtons?: {
            value: string;
            label: string;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }[] | null | undefined;
        continueButton?: {
            label?: string | undefined;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        } | undefined;
    }>>>;
    metadata: z.ZodOptional<z.ZodObject<{
        json: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>, z.ZodBigInt]>>>>;
            url: z.ZodOptional<z.ZodString>;
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
            route: z.ZodOptional<z.ZodString>;
            action: z.ZodOptional<z.ZodString>;
            params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
            error: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            label: string;
            value?: string | number | bigint | boolean | Date | null | undefined;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
            url?: string | undefined;
            image?: {
                url: string;
                alt?: string | undefined;
                size?: "thumbnail" | "small" | "medium" | "large" | undefined;
                width?: "thumbnail" | "small" | "medium" | "large" | undefined;
                height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            } | undefined;
            action?: string | undefined;
            route?: string | undefined;
            error?: string | null | undefined;
        }, {
            label: string;
            value?: string | number | bigint | boolean | Date | null | undefined;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
            url?: string | undefined;
            image?: {
                url: string;
                alt?: string | undefined;
                size?: "thumbnail" | "small" | "medium" | "large" | undefined;
                width?: "thumbnail" | "small" | "medium" | "large" | undefined;
                height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            } | undefined;
            action?: string | undefined;
            route?: string | undefined;
            error?: string | null | undefined;
        }>, "many">;
        meta: z.ZodAny;
    }, "strip", z.ZodTypeAny, {
        json: {
            label: string;
            value?: string | number | bigint | boolean | Date | null | undefined;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
            url?: string | undefined;
            image?: {
                url: string;
                alt?: string | undefined;
                size?: "thumbnail" | "small" | "medium" | "large" | undefined;
                width?: "thumbnail" | "small" | "medium" | "large" | undefined;
                height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            } | undefined;
            action?: string | undefined;
            route?: string | undefined;
            error?: string | null | undefined;
        }[];
        meta?: any;
    }, {
        json: {
            label: string;
            value?: string | number | bigint | boolean | Date | null | undefined;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
            url?: string | undefined;
            image?: {
                url: string;
                alt?: string | undefined;
                size?: "thumbnail" | "small" | "medium" | "large" | undefined;
                width?: "thumbnail" | "small" | "medium" | "large" | undefined;
                height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            } | undefined;
            action?: string | undefined;
            route?: string | undefined;
            error?: string | null | undefined;
        }[];
        meta?: any;
    }>>;
    menuItems: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodIntersection<z.ZodObject<{
        label: z.ZodString;
        theme: z.ZodOptional<z.ZodEnum<["default", "primary", "secondary", "danger"]>>;
    }, "strip", z.ZodTypeAny, {
        label: string;
        theme?: "default" | "primary" | "secondary" | "danger" | undefined;
    }, {
        label: string;
        theme?: "default" | "primary" | "secondary" | "danger" | undefined;
    }>, z.ZodUnion<[z.ZodIntersection<z.ZodObject<{
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
        disabled: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        disabled?: boolean | undefined;
    }, {
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        disabled?: boolean | undefined;
    }>, z.ZodUnion<[z.ZodObject<{
        route: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        route: string;
    }, {
        route: string;
    }>, z.ZodObject<{
        action: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        action: string;
    }, {
        action: string;
    }>]>>, z.ZodObject<{
        url: z.ZodString;
        disabled: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        disabled?: boolean | undefined;
    }, {
        url: string;
        disabled?: boolean | undefined;
    }>, z.ZodObject<{
        disabled: z.ZodLiteral<true>;
    }, "strip", z.ZodTypeAny, {
        disabled: true;
    }, {
        disabled: true;
    }>]>>, "many">>>;
    errors: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        layoutKey: z.ZodOptional<z.ZodString>;
        error: z.ZodString;
        message: z.ZodString;
        cause: z.ZodOptional<z.ZodString>;
        stack: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        error: string;
        cause?: string | undefined;
        layoutKey?: string | undefined;
        stack?: string | undefined;
    }, {
        message: string;
        error: string;
        cause?: string | undefined;
        layoutKey?: string | undefined;
        stack?: string | undefined;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    kind: "BASIC";
    description?: string | null | undefined;
    title?: string | null | undefined;
    menuItems?: ({
        label: string;
        theme?: "default" | "primary" | "secondary" | "danger" | undefined;
    } & (({
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        disabled?: boolean | undefined;
    } & ({
        route: string;
    } | {
        action: string;
    })) | {
        url: string;
        disabled?: boolean | undefined;
    } | {
        disabled: true;
    }))[] | null | undefined;
    children?: {
        id: string;
        inputGroupKey: string;
        toRender: {
            methodName: string;
            label: string;
            isStateful: boolean;
            isMultiple: boolean;
            isOptional: boolean;
            props?: any;
            propsMeta?: any;
            validationErrorMessage?: string | null | undefined;
            multipleProps?: {
                defaultValue?: any[] | null | undefined;
            } | null | undefined;
        }[];
        kind: "RENDER";
        validationErrorMessage?: string | null | undefined;
        choiceButtons?: {
            value: string;
            label: string;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }[] | null | undefined;
        continueButton?: {
            label?: string | undefined;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        } | undefined;
    } | null | undefined;
    metadata?: {
        json: {
            label: string;
            value?: string | number | bigint | boolean | Date | null | undefined;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
            url?: string | undefined;
            image?: {
                url: string;
                alt?: string | undefined;
                size?: "thumbnail" | "small" | "medium" | "large" | undefined;
                width?: "thumbnail" | "small" | "medium" | "large" | undefined;
                height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            } | undefined;
            action?: string | undefined;
            route?: string | undefined;
            error?: string | null | undefined;
        }[];
        meta?: any;
    } | undefined;
    errors?: {
        message: string;
        error: string;
        cause?: string | undefined;
        layoutKey?: string | undefined;
        stack?: string | undefined;
    }[] | null | undefined;
}, {
    kind: "BASIC";
    description?: string | null | undefined;
    title?: string | null | undefined;
    menuItems?: ({
        label: string;
        theme?: "default" | "primary" | "secondary" | "danger" | undefined;
    } & (({
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        disabled?: boolean | undefined;
    } & ({
        route: string;
    } | {
        action: string;
    })) | {
        url: string;
        disabled?: boolean | undefined;
    } | {
        disabled: true;
    }))[] | null | undefined;
    children?: {
        id: string;
        inputGroupKey: string;
        toRender: {
            methodName: string;
            label: string;
            props?: any;
            propsMeta?: any;
            isStateful?: boolean | undefined;
            isMultiple?: boolean | undefined;
            isOptional?: boolean | undefined;
            validationErrorMessage?: string | null | undefined;
            multipleProps?: {
                defaultValue?: any[] | null | undefined;
            } | null | undefined;
        }[];
        kind: "RENDER";
        validationErrorMessage?: string | null | undefined;
        choiceButtons?: {
            value: string;
            label: string;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }[] | null | undefined;
        continueButton?: {
            label?: string | undefined;
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        } | undefined;
    } | null | undefined;
    metadata?: {
        json: {
            label: string;
            value?: string | number | bigint | boolean | Date | null | undefined;
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
            url?: string | undefined;
            image?: {
                url: string;
                alt?: string | undefined;
                size?: "thumbnail" | "small" | "medium" | "large" | undefined;
                width?: "thumbnail" | "small" | "medium" | "large" | undefined;
                height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            } | undefined;
            action?: string | undefined;
            route?: string | undefined;
            error?: string | null | undefined;
        }[];
        meta?: any;
    } | undefined;
    errors?: {
        message: string;
        error: string;
        cause?: string | undefined;
        layoutKey?: string | undefined;
        stack?: string | undefined;
    }[] | null | undefined;
}>;
export type LayoutSchema = z.infer<typeof LAYOUT_SCHEMA>;
export type LayoutSchemaInput = z.input<typeof LAYOUT_SCHEMA>;
export type BasicLayoutSchema = z.infer<typeof BASIC_LAYOUT_SCHEMA>;
export type BasicLayoutSchemaInput = z.input<typeof BASIC_LAYOUT_SCHEMA>;
export type LayoutError = z.infer<typeof LAYOUT_ERROR_SCHEMA>;
export { metaItemSchema as META_ITEM_SCHEMA };
