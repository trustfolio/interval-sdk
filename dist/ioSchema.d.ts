import { z } from 'zod';
export declare const DISPLAY_COMPONENT_TO_RENDER: z.ZodObject<{
    methodName: z.ZodString;
    label: z.ZodString;
    props: z.ZodAny;
    propsMeta: z.ZodOptional<z.ZodAny>;
    isStateful: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    methodName: string;
    label: string;
    isStateful: boolean;
    props?: any;
    propsMeta?: any;
}, {
    methodName: string;
    label: string;
    props?: any;
    propsMeta?: any;
    isStateful?: boolean | undefined;
}>;
export type DisplayComponentToRender = z.infer<typeof DISPLAY_COMPONENT_TO_RENDER>;
export declare const INPUT_COMPONENT_TO_RENDER: z.ZodObject<z.objectUtil.extendShape<{
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
}>;
export declare const COMPONENT_TO_RENDER: z.ZodObject<z.objectUtil.extendShape<{
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
}>;
export type ComponentToRender = z.infer<typeof COMPONENT_TO_RENDER>;
export declare const DISPLAY_RENDER: z.ZodObject<{
    id: z.ZodString;
    inputGroupKey: z.ZodString;
    toRender: z.ZodArray<z.ZodObject<{
        methodName: z.ZodString;
        label: z.ZodString;
        props: z.ZodAny;
        propsMeta: z.ZodOptional<z.ZodAny>;
        isStateful: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        methodName: string;
        label: string;
        isStateful: boolean;
        props?: any;
        propsMeta?: any;
    }, {
        methodName: string;
        label: string;
        props?: any;
        propsMeta?: any;
        isStateful?: boolean | undefined;
    }>, "many">;
    kind: z.ZodLiteral<"RENDER">;
}, "strip", z.ZodTypeAny, {
    id: string;
    inputGroupKey: string;
    toRender: {
        methodName: string;
        label: string;
        isStateful: boolean;
        props?: any;
        propsMeta?: any;
    }[];
    kind: "RENDER";
}, {
    id: string;
    inputGroupKey: string;
    toRender: {
        methodName: string;
        label: string;
        props?: any;
        propsMeta?: any;
        isStateful?: boolean | undefined;
    }[];
    kind: "RENDER";
}>;
export type ButtonTheme = 'primary' | 'secondary' | 'danger';
export declare const IO_RENDER: z.ZodObject<{
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
}>;
export declare const IO_RESPONSE: z.ZodObject<{
    id: z.ZodString;
    inputGroupKey: z.ZodOptional<z.ZodString>;
    transactionId: z.ZodString;
    kind: z.ZodUnion<[z.ZodLiteral<"RETURN">, z.ZodLiteral<"SET_STATE">, z.ZodLiteral<"CANCELED">]>;
    choice: z.ZodOptional<z.ZodString>;
    values: z.ZodArray<z.ZodAny, "many">;
    valuesMeta: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    values: any[];
    id: string;
    kind: "RETURN" | "SET_STATE" | "CANCELED";
    transactionId: string;
    inputGroupKey?: string | undefined;
    choice?: string | undefined;
    valuesMeta?: any;
}, {
    values: any[];
    id: string;
    kind: "RETURN" | "SET_STATE" | "CANCELED";
    transactionId: string;
    inputGroupKey?: string | undefined;
    choice?: string | undefined;
    valuesMeta?: any;
}>;
export type T_IO_RENDER = z.infer<typeof IO_RENDER>;
export type T_IO_RENDER_INPUT = z.input<typeof IO_RENDER>;
export type T_DISPLAY_RENDER = z.infer<typeof DISPLAY_RENDER>;
export type T_DISPLAY_RENDER_INPUT = z.input<typeof DISPLAY_RENDER>;
export type T_IO_RESPONSE = z.infer<typeof IO_RESPONSE>;
export type T_IO_RESPONSE_KIND = T_IO_RESPONSE['kind'];
export declare const typeValue: z.ZodEnum<["string", "string?", "number", "number?", "boolean", "boolean?"]>;
export type TypeValue = z.infer<typeof typeValue>;
export declare const primitiveValue: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
export type Literal = boolean | null | number | string | Date | undefined;
type KeyValue = Literal | {
    [key: string]: KeyValue;
} | KeyValue[] | object;
export declare const labelValue: z.ZodObject<{
    label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
    value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
    value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
    value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
}, z.ZodTypeAny, "passthrough">>;
export type LabelValue = z.infer<typeof labelValue>;
export declare const deserializableSchema: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>;
export type Deserializable = z.infer<typeof deserializableSchema>;
export declare const deserializableRecord: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>>;
export type DeserializableRecord = z.infer<typeof deserializableRecord>;
export declare const serializableSchema: z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>;
export type Serializable = z.infer<typeof serializableSchema>;
export declare const serializableRecord: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>;
export type SerializableRecord = z.infer<typeof serializableRecord>;
export declare const imageSize: z.ZodEnum<["thumbnail", "small", "medium", "large"]>;
export type ImageSize = z.infer<typeof imageSize>;
export declare const imageSchema: z.ZodObject<{
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
}>;
export type ImageSchema = z.infer<typeof imageSchema>;
export declare const richSelectOption: z.ZodObject<{
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
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
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
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
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
}, z.ZodTypeAny, "passthrough">>;
export type RichSelectOption = z.infer<typeof richSelectOption>;
export declare const highlightColor: z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>;
export type HighlightColor = z.infer<typeof highlightColor>;
export declare const advancedPrimitive: z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
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
    action: z.ZodOptional<z.ZodString>;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
}, "strip", z.ZodTypeAny, {
    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
    label?: string | undefined;
    url?: string | undefined;
    image?: {
        url: string;
        alt?: string | undefined;
        size?: "thumbnail" | "small" | "medium" | "large" | undefined;
        width?: "thumbnail" | "small" | "medium" | "large" | undefined;
        height?: "thumbnail" | "small" | "medium" | "large" | undefined;
    } | undefined;
    action?: string | undefined;
}, {
    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
    label?: string | undefined;
    url?: string | undefined;
    image?: {
        url: string;
        alt?: string | undefined;
        size?: "thumbnail" | "small" | "medium" | "large" | undefined;
        width?: "thumbnail" | "small" | "medium" | "large" | undefined;
        height?: "thumbnail" | "small" | "medium" | "large" | undefined;
    } | undefined;
    action?: string | undefined;
}>;
export declare const tableRowValue: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined, z.ZodBigInt, z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
    href: z.ZodOptional<z.ZodString>;
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
    action: z.ZodOptional<z.ZodString>;
    route: z.ZodOptional<z.ZodString>;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    label: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
    href: z.ZodOptional<z.ZodString>;
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
    action: z.ZodOptional<z.ZodString>;
    route: z.ZodOptional<z.ZodString>;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    label: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
    href: z.ZodOptional<z.ZodString>;
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
    action: z.ZodOptional<z.ZodString>;
    route: z.ZodOptional<z.ZodString>;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
}, z.ZodTypeAny, "passthrough">>]>;
export declare const tableRow: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined, z.ZodBigInt, z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
    href: z.ZodOptional<z.ZodString>;
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
    action: z.ZodOptional<z.ZodString>;
    route: z.ZodOptional<z.ZodString>;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    label: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
    href: z.ZodOptional<z.ZodString>;
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
    action: z.ZodOptional<z.ZodString>;
    route: z.ZodOptional<z.ZodString>;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    label: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
    href: z.ZodOptional<z.ZodString>;
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
    action: z.ZodOptional<z.ZodString>;
    route: z.ZodOptional<z.ZodString>;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
}, z.ZodTypeAny, "passthrough">>]>, z.ZodAny]>>;
export declare const menuItem: z.ZodIntersection<z.ZodObject<{
    label: z.ZodString;
    theme: z.ZodOptional<z.ZodEnum<["default", "danger"]>>;
}, "strip", z.ZodTypeAny, {
    label: string;
    theme?: "default" | "danger" | undefined;
}, {
    label: string;
    theme?: "default" | "danger" | undefined;
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
}>]>>;
export declare const buttonItem: z.ZodIntersection<z.ZodObject<{
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
}>]>>;
export declare const linkSchema: z.ZodUnion<[z.ZodObject<{
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
}>]>;
export type LinkProps = z.infer<typeof linkSchema>;
export declare const legacyLinkSchema: z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
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
}>]>;
export type LegacyLinkProps = z.infer<typeof legacyLinkSchema>;
export declare const internalTableRow: z.ZodObject<{
    key: z.ZodString;
    data: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined, z.ZodBigInt, z.ZodObject<{
        label: z.ZodOptional<z.ZodString>;
        value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
        href: z.ZodOptional<z.ZodString>;
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
        action: z.ZodOptional<z.ZodString>;
        route: z.ZodOptional<z.ZodString>;
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
        highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        label: z.ZodOptional<z.ZodString>;
        value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
        href: z.ZodOptional<z.ZodString>;
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
        action: z.ZodOptional<z.ZodString>;
        route: z.ZodOptional<z.ZodString>;
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
        highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        label: z.ZodOptional<z.ZodString>;
        value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
        href: z.ZodOptional<z.ZodString>;
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
        action: z.ZodOptional<z.ZodString>;
        route: z.ZodOptional<z.ZodString>;
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
        highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
    }, z.ZodTypeAny, "passthrough">>]>, z.ZodAny]>>;
    menu: z.ZodOptional<z.ZodArray<z.ZodIntersection<z.ZodObject<{
        label: z.ZodString;
        theme: z.ZodOptional<z.ZodEnum<["default", "danger"]>>;
    }, "strip", z.ZodTypeAny, {
        label: string;
        theme?: "default" | "danger" | undefined;
    }, {
        label: string;
        theme?: "default" | "danger" | undefined;
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
    }>]>>, "many">>;
    filterValue: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    key: string;
    data: Record<string, any>;
    menu?: ({
        label: string;
        theme?: "default" | "danger" | undefined;
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
    }))[] | undefined;
    filterValue?: string | undefined;
}, {
    key: string;
    data: Record<string, any>;
    menu?: ({
        label: string;
        theme?: "default" | "danger" | undefined;
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
    }))[] | undefined;
    filterValue?: string | undefined;
}>;
export declare const internalTableColumn: z.ZodObject<{
    label: z.ZodString;
    accessorKey: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    label: string;
    accessorKey?: string | undefined;
}, {
    label: string;
    accessorKey?: string | undefined;
}>;
export declare const gridItem: z.ZodObject<{
    label: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    image: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        alt: z.ZodOptional<z.ZodString>;
        fit: z.ZodOptional<z.ZodEnum<["cover", "contain"]>>;
        aspectRatio: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        alt?: string | undefined;
        url?: string | null | undefined;
        fit?: "cover" | "contain" | undefined;
        aspectRatio?: number | undefined;
    }, {
        alt?: string | undefined;
        url?: string | null | undefined;
        fit?: "cover" | "contain" | undefined;
        aspectRatio?: number | undefined;
    }>>>;
    menu: z.ZodOptional<z.ZodArray<z.ZodIntersection<z.ZodObject<{
        label: z.ZodString;
        theme: z.ZodOptional<z.ZodEnum<["default", "danger"]>>;
    }, "strip", z.ZodTypeAny, {
        label: string;
        theme?: "default" | "danger" | undefined;
    }, {
        label: string;
        theme?: "default" | "danger" | undefined;
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
    }>]>>, "many">>;
    url: z.ZodOptional<z.ZodString>;
    route: z.ZodOptional<z.ZodString>;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
}, "strip", z.ZodTypeAny, {
    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
    label?: string | null | undefined;
    url?: string | undefined;
    description?: string | null | undefined;
    image?: {
        alt?: string | undefined;
        url?: string | null | undefined;
        fit?: "cover" | "contain" | undefined;
        aspectRatio?: number | undefined;
    } | null | undefined;
    route?: string | undefined;
    menu?: ({
        label: string;
        theme?: "default" | "danger" | undefined;
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
    }))[] | undefined;
}, {
    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
    label?: string | null | undefined;
    url?: string | undefined;
    description?: string | null | undefined;
    image?: {
        alt?: string | undefined;
        url?: string | null | undefined;
        fit?: "cover" | "contain" | undefined;
        aspectRatio?: number | undefined;
    } | null | undefined;
    route?: string | undefined;
    menu?: ({
        label: string;
        theme?: "default" | "danger" | undefined;
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
    }))[] | undefined;
}>;
export declare const backwardCompatibleGridItem: z.ZodObject<z.objectUtil.extendShape<{
    label: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    image: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        alt: z.ZodOptional<z.ZodString>;
        fit: z.ZodOptional<z.ZodEnum<["cover", "contain"]>>;
        aspectRatio: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        alt?: string | undefined;
        url?: string | null | undefined;
        fit?: "cover" | "contain" | undefined;
        aspectRatio?: number | undefined;
    }, {
        alt?: string | undefined;
        url?: string | null | undefined;
        fit?: "cover" | "contain" | undefined;
        aspectRatio?: number | undefined;
    }>>>;
    menu: z.ZodOptional<z.ZodArray<z.ZodIntersection<z.ZodObject<{
        label: z.ZodString;
        theme: z.ZodOptional<z.ZodEnum<["default", "danger"]>>;
    }, "strip", z.ZodTypeAny, {
        label: string;
        theme?: "default" | "danger" | undefined;
    }, {
        label: string;
        theme?: "default" | "danger" | undefined;
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
    }>]>>, "many">>;
    url: z.ZodOptional<z.ZodString>;
    route: z.ZodOptional<z.ZodString>;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
}, {
    title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}>, "strip", z.ZodTypeAny, {
    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
    label?: string | null | undefined;
    url?: string | undefined;
    description?: string | null | undefined;
    image?: {
        alt?: string | undefined;
        url?: string | null | undefined;
        fit?: "cover" | "contain" | undefined;
        aspectRatio?: number | undefined;
    } | null | undefined;
    route?: string | undefined;
    menu?: ({
        label: string;
        theme?: "default" | "danger" | undefined;
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
    }))[] | undefined;
    title?: string | null | undefined;
}, {
    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
    label?: string | null | undefined;
    url?: string | undefined;
    description?: string | null | undefined;
    image?: {
        alt?: string | undefined;
        url?: string | null | undefined;
        fit?: "cover" | "contain" | undefined;
        aspectRatio?: number | undefined;
    } | null | undefined;
    route?: string | undefined;
    menu?: ({
        label: string;
        theme?: "default" | "danger" | undefined;
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
    }))[] | undefined;
    title?: string | null | undefined;
}>;
export declare const internalGridItem: z.ZodObject<{
    data: z.ZodObject<z.objectUtil.extendShape<{
        label: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        image: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            alt: z.ZodOptional<z.ZodString>;
            fit: z.ZodOptional<z.ZodEnum<["cover", "contain"]>>;
            aspectRatio: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            alt?: string | undefined;
            url?: string | null | undefined;
            fit?: "cover" | "contain" | undefined;
            aspectRatio?: number | undefined;
        }, {
            alt?: string | undefined;
            url?: string | null | undefined;
            fit?: "cover" | "contain" | undefined;
            aspectRatio?: number | undefined;
        }>>>;
        menu: z.ZodOptional<z.ZodArray<z.ZodIntersection<z.ZodObject<{
            label: z.ZodString;
            theme: z.ZodOptional<z.ZodEnum<["default", "danger"]>>;
        }, "strip", z.ZodTypeAny, {
            label: string;
            theme?: "default" | "danger" | undefined;
        }, {
            label: string;
            theme?: "default" | "danger" | undefined;
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
        }>]>>, "many">>;
        url: z.ZodOptional<z.ZodString>;
        route: z.ZodOptional<z.ZodString>;
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
    }, {
        title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }>, "strip", z.ZodTypeAny, {
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        label?: string | null | undefined;
        url?: string | undefined;
        description?: string | null | undefined;
        image?: {
            alt?: string | undefined;
            url?: string | null | undefined;
            fit?: "cover" | "contain" | undefined;
            aspectRatio?: number | undefined;
        } | null | undefined;
        route?: string | undefined;
        menu?: ({
            label: string;
            theme?: "default" | "danger" | undefined;
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
        }))[] | undefined;
        title?: string | null | undefined;
    }, {
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        label?: string | null | undefined;
        url?: string | undefined;
        description?: string | null | undefined;
        image?: {
            alt?: string | undefined;
            url?: string | null | undefined;
            fit?: "cover" | "contain" | undefined;
            aspectRatio?: number | undefined;
        } | null | undefined;
        route?: string | undefined;
        menu?: ({
            label: string;
            theme?: "default" | "danger" | undefined;
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
        }))[] | undefined;
        title?: string | null | undefined;
    }>;
    key: z.ZodString;
    filterValue: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    key: string;
    data: {
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        label?: string | null | undefined;
        url?: string | undefined;
        description?: string | null | undefined;
        image?: {
            alt?: string | undefined;
            url?: string | null | undefined;
            fit?: "cover" | "contain" | undefined;
            aspectRatio?: number | undefined;
        } | null | undefined;
        route?: string | undefined;
        menu?: ({
            label: string;
            theme?: "default" | "danger" | undefined;
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
        }))[] | undefined;
        title?: string | null | undefined;
    };
    filterValue?: string | undefined;
}, {
    key: string;
    data: {
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
        label?: string | null | undefined;
        url?: string | undefined;
        description?: string | null | undefined;
        image?: {
            alt?: string | undefined;
            url?: string | null | undefined;
            fit?: "cover" | "contain" | undefined;
            aspectRatio?: number | undefined;
        } | null | undefined;
        route?: string | undefined;
        menu?: ({
            label: string;
            theme?: "default" | "danger" | undefined;
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
        }))[] | undefined;
        title?: string | null | undefined;
    };
    filterValue?: string | undefined;
}>;
export type GridItem = z.input<typeof gridItem>;
export type BackwardCompatibleGridItem = z.input<typeof backwardCompatibleGridItem>;
export type InternalGridItem = z.infer<typeof internalGridItem>;
export declare const CURRENCIES: readonly ["USD", "CAD", "EUR", "GBP", "AUD", "CNY", "JPY"];
export declare const currencyCode: z.ZodEnum<["USD", "CAD", "EUR", "GBP", "AUD", "CNY", "JPY"]>;
export type CurrencyCode = z.infer<typeof currencyCode>;
export declare const dateObject: z.ZodObject<{
    year: z.ZodNumber;
    month: z.ZodNumber;
    day: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    year: number;
    month: number;
    day: number;
}, {
    year: number;
    month: number;
    day: number;
}>;
export type DateObject = z.infer<typeof dateObject>;
export declare const timeObject: z.ZodObject<{
    hour: z.ZodNumber;
    minute: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    hour: number;
    minute: number;
}, {
    hour: number;
    minute: number;
}>;
export type TimeObject = z.infer<typeof timeObject>;
export declare const dateTimeObject: z.ZodObject<z.objectUtil.extendShape<{
    year: z.ZodNumber;
    month: z.ZodNumber;
    day: z.ZodNumber;
}, {
    hour: z.ZodNumber;
    minute: z.ZodNumber;
}>, "strip", z.ZodTypeAny, {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
}, {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
}>;
export type DateTimeObject = z.infer<typeof dateTimeObject>;
/**
 * Any methods with an `immediate` property defined (at all, not just truthy)
 * will resolve immediately when awaited.
 */
export declare function resolvesImmediately(methodName: T_IO_METHOD_NAMES, { displayResolvesImmediately, }?: {
    displayResolvesImmediately?: boolean;
}): boolean;
export declare function supportsMultiple(methodName: T_IO_METHOD_NAMES): boolean;
export declare const metaItemSchema: z.ZodObject<{
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
}>;
declare const DISPLAY_SCHEMA: {
    DISPLAY_CODE: {
        props: z.ZodObject<{
            code: z.ZodString;
            language: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            code: string;
            language?: string | undefined;
        }, {
            code: string;
            language?: string | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_HEADING: {
        props: z.ZodObject<{
            level: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>]>>;
            description: z.ZodOptional<z.ZodString>;
            menuItems: z.ZodOptional<z.ZodArray<z.ZodIntersection<z.ZodObject<{
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
            }>]>>, "many">>;
        }, "strip", z.ZodTypeAny, {
            description?: string | undefined;
            level?: 2 | 3 | 4 | undefined;
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
            }))[] | undefined;
        }, {
            description?: string | undefined;
            level?: 2 | 3 | 4 | undefined;
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
            }))[] | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_METADATA: {
        props: z.ZodObject<{
            data: z.ZodArray<z.ZodObject<{
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
            layout: z.ZodDefault<z.ZodOptional<z.ZodEnum<["grid", "list", "card"]>>>;
        }, "strip", z.ZodTypeAny, {
            data: {
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
            layout: "grid" | "list" | "card";
        }, {
            data: {
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
            layout?: "grid" | "list" | "card" | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_MARKDOWN: {
        props: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_HTML: {
        props: z.ZodObject<{
            html: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            html: string;
        }, {
            html: string;
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_IMAGE: {
        props: z.ZodObject<{
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
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_LINK: {
        props: z.ZodIntersection<z.ZodObject<{
            theme: z.ZodOptional<z.ZodEnum<["default", "primary", "secondary", "danger"]>>;
        }, "strip", z.ZodTypeAny, {
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }, {
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }>, z.ZodUnion<[z.ZodObject<{
            href: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            href: string;
        }, {
            href: string;
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
        }>]>]>>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_OBJECT: {
        props: z.ZodObject<{
            data: z.ZodType<KeyValue, z.ZodTypeDef, KeyValue>;
        }, "strip", z.ZodTypeAny, {
            data?: KeyValue;
        }, {
            data?: KeyValue;
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_GRID: {
        props: z.ZodObject<{
            data: z.ZodArray<z.ZodObject<{
                data: z.ZodObject<z.objectUtil.extendShape<{
                    label: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                    image: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                        url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        alt: z.ZodOptional<z.ZodString>;
                        fit: z.ZodOptional<z.ZodEnum<["cover", "contain"]>>;
                        aspectRatio: z.ZodOptional<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        alt?: string | undefined;
                        url?: string | null | undefined;
                        fit?: "cover" | "contain" | undefined;
                        aspectRatio?: number | undefined;
                    }, {
                        alt?: string | undefined;
                        url?: string | null | undefined;
                        fit?: "cover" | "contain" | undefined;
                        aspectRatio?: number | undefined;
                    }>>>;
                    menu: z.ZodOptional<z.ZodArray<z.ZodIntersection<z.ZodObject<{
                        label: z.ZodString;
                        theme: z.ZodOptional<z.ZodEnum<["default", "danger"]>>;
                    }, "strip", z.ZodTypeAny, {
                        label: string;
                        theme?: "default" | "danger" | undefined;
                    }, {
                        label: string;
                        theme?: "default" | "danger" | undefined;
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
                    }>]>>, "many">>;
                    url: z.ZodOptional<z.ZodString>;
                    route: z.ZodOptional<z.ZodString>;
                    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                }, {
                    title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                }>, "strip", z.ZodTypeAny, {
                    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                    label?: string | null | undefined;
                    url?: string | undefined;
                    description?: string | null | undefined;
                    image?: {
                        alt?: string | undefined;
                        url?: string | null | undefined;
                        fit?: "cover" | "contain" | undefined;
                        aspectRatio?: number | undefined;
                    } | null | undefined;
                    route?: string | undefined;
                    menu?: ({
                        label: string;
                        theme?: "default" | "danger" | undefined;
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
                    }))[] | undefined;
                    title?: string | null | undefined;
                }, {
                    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                    label?: string | null | undefined;
                    url?: string | undefined;
                    description?: string | null | undefined;
                    image?: {
                        alt?: string | undefined;
                        url?: string | null | undefined;
                        fit?: "cover" | "contain" | undefined;
                        aspectRatio?: number | undefined;
                    } | null | undefined;
                    route?: string | undefined;
                    menu?: ({
                        label: string;
                        theme?: "default" | "danger" | undefined;
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
                    }))[] | undefined;
                    title?: string | null | undefined;
                }>;
                key: z.ZodString;
                filterValue: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                key: string;
                data: {
                    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                    label?: string | null | undefined;
                    url?: string | undefined;
                    description?: string | null | undefined;
                    image?: {
                        alt?: string | undefined;
                        url?: string | null | undefined;
                        fit?: "cover" | "contain" | undefined;
                        aspectRatio?: number | undefined;
                    } | null | undefined;
                    route?: string | undefined;
                    menu?: ({
                        label: string;
                        theme?: "default" | "danger" | undefined;
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
                    }))[] | undefined;
                    title?: string | null | undefined;
                };
                filterValue?: string | undefined;
            }, {
                key: string;
                data: {
                    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                    label?: string | null | undefined;
                    url?: string | undefined;
                    description?: string | null | undefined;
                    image?: {
                        alt?: string | undefined;
                        url?: string | null | undefined;
                        fit?: "cover" | "contain" | undefined;
                        aspectRatio?: number | undefined;
                    } | null | undefined;
                    route?: string | undefined;
                    menu?: ({
                        label: string;
                        theme?: "default" | "danger" | undefined;
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
                    }))[] | undefined;
                    title?: string | null | undefined;
                };
                filterValue?: string | undefined;
            }>, "many">;
            idealColumnWidth: z.ZodOptional<z.ZodNumber>;
            defaultPageSize: z.ZodOptional<z.ZodNumber>;
            helpText: z.ZodOptional<z.ZodString>;
            isFilterable: z.ZodDefault<z.ZodBoolean>;
            totalRecords: z.ZodOptional<z.ZodNumber>;
            isAsync: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            data: {
                key: string;
                data: {
                    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                    label?: string | null | undefined;
                    url?: string | undefined;
                    description?: string | null | undefined;
                    image?: {
                        alt?: string | undefined;
                        url?: string | null | undefined;
                        fit?: "cover" | "contain" | undefined;
                        aspectRatio?: number | undefined;
                    } | null | undefined;
                    route?: string | undefined;
                    menu?: ({
                        label: string;
                        theme?: "default" | "danger" | undefined;
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
                    }))[] | undefined;
                    title?: string | null | undefined;
                };
                filterValue?: string | undefined;
            }[];
            isFilterable: boolean;
            idealColumnWidth?: number | undefined;
            defaultPageSize?: number | undefined;
            helpText?: string | undefined;
            totalRecords?: number | undefined;
            isAsync?: boolean | undefined;
        }, {
            data: {
                key: string;
                data: {
                    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                    label?: string | null | undefined;
                    url?: string | undefined;
                    description?: string | null | undefined;
                    image?: {
                        alt?: string | undefined;
                        url?: string | null | undefined;
                        fit?: "cover" | "contain" | undefined;
                        aspectRatio?: number | undefined;
                    } | null | undefined;
                    route?: string | undefined;
                    menu?: ({
                        label: string;
                        theme?: "default" | "danger" | undefined;
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
                    }))[] | undefined;
                    title?: string | null | undefined;
                };
                filterValue?: string | undefined;
            }[];
            idealColumnWidth?: number | undefined;
            defaultPageSize?: number | undefined;
            helpText?: string | undefined;
            isFilterable?: boolean | undefined;
            totalRecords?: number | undefined;
            isAsync?: boolean | undefined;
        }>;
        state: z.ZodObject<{
            queryTerm: z.ZodOptional<z.ZodString>;
            offset: z.ZodDefault<z.ZodNumber>;
            pageSize: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            offset: number;
            pageSize: number;
            queryTerm?: string | undefined;
        }, {
            pageSize: number;
            queryTerm?: string | undefined;
            offset?: number | undefined;
        }>;
        returns: z.ZodNull;
    };
    DISPLAY_TABLE: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            columns: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                accessorKey: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                label: string;
                accessorKey?: string | undefined;
            }, {
                label: string;
                accessorKey?: string | undefined;
            }>, "many">;
            data: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                data: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined, z.ZodBigInt, z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                    href: z.ZodOptional<z.ZodString>;
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
                    action: z.ZodOptional<z.ZodString>;
                    route: z.ZodOptional<z.ZodString>;
                    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
                }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                    label: z.ZodOptional<z.ZodString>;
                    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                    href: z.ZodOptional<z.ZodString>;
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
                    action: z.ZodOptional<z.ZodString>;
                    route: z.ZodOptional<z.ZodString>;
                    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
                }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                    label: z.ZodOptional<z.ZodString>;
                    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                    href: z.ZodOptional<z.ZodString>;
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
                    action: z.ZodOptional<z.ZodString>;
                    route: z.ZodOptional<z.ZodString>;
                    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
                }, z.ZodTypeAny, "passthrough">>]>, z.ZodAny]>>;
                menu: z.ZodOptional<z.ZodArray<z.ZodIntersection<z.ZodObject<{
                    label: z.ZodString;
                    theme: z.ZodOptional<z.ZodEnum<["default", "danger"]>>;
                }, "strip", z.ZodTypeAny, {
                    label: string;
                    theme?: "default" | "danger" | undefined;
                }, {
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }>]>>, "many">>;
                filterValue: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                key: string;
                data: Record<string, any>;
                menu?: ({
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }))[] | undefined;
                filterValue?: string | undefined;
            }, {
                key: string;
                data: Record<string, any>;
                menu?: ({
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }))[] | undefined;
                filterValue?: string | undefined;
            }>, "many">;
            orientation: z.ZodDefault<z.ZodEnum<["vertical", "horizontal"]>>;
            defaultPageSize: z.ZodOptional<z.ZodNumber>;
            isSortable: z.ZodDefault<z.ZodBoolean>;
            isFilterable: z.ZodDefault<z.ZodBoolean>;
            totalRecords: z.ZodOptional<z.ZodNumber>;
            isAsync: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            data: {
                key: string;
                data: Record<string, any>;
                menu?: ({
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }))[] | undefined;
                filterValue?: string | undefined;
            }[];
            isFilterable: boolean;
            columns: {
                label: string;
                accessorKey?: string | undefined;
            }[];
            orientation: "vertical" | "horizontal";
            isSortable: boolean;
            defaultPageSize?: number | undefined;
            helpText?: string | undefined;
            totalRecords?: number | undefined;
            isAsync?: boolean | undefined;
        }, {
            data: {
                key: string;
                data: Record<string, any>;
                menu?: ({
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }))[] | undefined;
                filterValue?: string | undefined;
            }[];
            columns: {
                label: string;
                accessorKey?: string | undefined;
            }[];
            defaultPageSize?: number | undefined;
            helpText?: string | undefined;
            isFilterable?: boolean | undefined;
            totalRecords?: number | undefined;
            isAsync?: boolean | undefined;
            orientation?: "vertical" | "horizontal" | undefined;
            isSortable?: boolean | undefined;
        }>;
        state: z.ZodObject<{
            queryTerm: z.ZodOptional<z.ZodString>;
            sortColumn: z.ZodOptional<z.ZodString>;
            sortDirection: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
            offset: z.ZodDefault<z.ZodNumber>;
            pageSize: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            offset: number;
            pageSize: number;
            queryTerm?: string | undefined;
            sortColumn?: string | undefined;
            sortDirection?: "asc" | "desc" | undefined;
        }, {
            pageSize: number;
            queryTerm?: string | undefined;
            offset?: number | undefined;
            sortColumn?: string | undefined;
            sortDirection?: "asc" | "desc" | undefined;
        }>;
        returns: z.ZodNull;
    };
    DISPLAY_PROGRESS_STEPS: {
        props: z.ZodObject<{
            steps: z.ZodObject<{
                completed: z.ZodNumber;
                total: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                completed: number;
                total: number;
            }, {
                completed: number;
                total: number;
            }>;
            currentStep: z.ZodOptional<z.ZodString>;
            subTitle: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            steps: {
                completed: number;
                total: number;
            };
            currentStep?: string | undefined;
            subTitle?: string | undefined;
        }, {
            steps: {
                completed: number;
                total: number;
            };
            currentStep?: string | undefined;
            subTitle?: string | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
        immediate: boolean;
    };
    DISPLAY_PROGRESS_INDETERMINATE: {
        props: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        state: z.ZodNull;
        returns: z.ZodNull;
        immediate: boolean;
    };
    DISPLAY_PROGRESS_THROUGH_LIST: {
        props: z.ZodObject<{
            items: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                isComplete: z.ZodBoolean;
                resultDescription: z.ZodUnion<[z.ZodNull, z.ZodString]>;
            }, "strip", z.ZodTypeAny, {
                label: string;
                isComplete: boolean;
                resultDescription: string | null;
            }, {
                label: string;
                isComplete: boolean;
                resultDescription: string | null;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            items: {
                label: string;
                isComplete: boolean;
                resultDescription: string | null;
            }[];
        }, {
            items: {
                label: string;
                isComplete: boolean;
                resultDescription: string | null;
            }[];
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_VIDEO: {
        props: z.ZodObject<{
            width: z.ZodOptional<z.ZodEnum<["thumbnail", "small", "medium", "large"]>>;
            height: z.ZodOptional<z.ZodEnum<["thumbnail", "small", "medium", "large"]>>;
            url: z.ZodString;
            loop: z.ZodOptional<z.ZodBoolean>;
            muted: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            width?: "thumbnail" | "small" | "medium" | "large" | undefined;
            height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            loop?: boolean | undefined;
            muted?: boolean | undefined;
        }, {
            url: string;
            width?: "thumbnail" | "small" | "medium" | "large" | undefined;
            height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            loop?: boolean | undefined;
            muted?: boolean | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
};
declare const INPUT_SCHEMA: {
    INPUT_TEXT: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            multiline: z.ZodOptional<z.ZodBoolean>;
            lines: z.ZodOptional<z.ZodNumber>;
            minLength: z.ZodOptional<z.ZodNumber>;
            maxLength: z.ZodOptional<z.ZodNumber>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
            multiline?: boolean | undefined;
            lines?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }, {
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
            multiline?: boolean | undefined;
            lines?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodString;
    };
    INPUT_EMAIL: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
        }, {
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodString;
    };
    INPUT_NUMBER: {
        props: z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            prepend: z.ZodOptional<z.ZodString>;
            helpText: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            decimals: z.ZodOptional<z.ZodNumber>;
            currency: z.ZodOptional<z.ZodEnum<["USD", "CAD", "EUR", "GBP", "AUD", "CNY", "JPY"]>>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            defaultValue?: number | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
            min?: number | undefined;
            max?: number | undefined;
            prepend?: string | undefined;
            decimals?: number | undefined;
            currency?: "USD" | "CAD" | "EUR" | "GBP" | "AUD" | "CNY" | "JPY" | undefined;
        }, {
            defaultValue?: number | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
            min?: number | undefined;
            max?: number | undefined;
            prepend?: string | undefined;
            decimals?: number | undefined;
            currency?: "USD" | "CAD" | "EUR" | "GBP" | "AUD" | "CNY" | "JPY" | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodNumber;
    };
    INPUT_SLIDER: {
        props: z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
            step: z.ZodOptional<z.ZodNumber>;
            helpText: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            min: number;
            max: number;
            defaultValue?: number | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            step?: number | undefined;
        }, {
            min: number;
            max: number;
            defaultValue?: number | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            step?: number | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodNumber;
    };
    INPUT_URL: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            allowedProtocols: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            allowedProtocols: string[];
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
        }, {
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
            allowedProtocols?: string[] | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodString;
    };
    INPUT_BOOLEAN: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodEffects<z.ZodDefault<z.ZodNullable<z.ZodBoolean>>, boolean, boolean | null | undefined>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            defaultValue: boolean;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
        }, {
            defaultValue?: boolean | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodBoolean;
    };
    INPUT_RICH_TEXT: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
        }, {
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodObject<{
            html: z.ZodString;
            json: z.ZodAny;
        }, "strip", z.ZodTypeAny, {
            html: string;
            json?: any;
        }, {
            html: string;
            json?: any;
        }>;
    };
    INPUT_DATE: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                year: z.ZodNumber;
                month: z.ZodNumber;
                day: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                year: number;
                month: number;
                day: number;
            }, {
                year: number;
                month: number;
                day: number;
            }>>>;
            min: z.ZodOptional<z.ZodObject<{
                year: z.ZodNumber;
                month: z.ZodNumber;
                day: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                year: number;
                month: number;
                day: number;
            }, {
                year: number;
                month: number;
                day: number;
            }>>;
            max: z.ZodOptional<z.ZodObject<{
                year: z.ZodNumber;
                month: z.ZodNumber;
                day: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                year: number;
                month: number;
                day: number;
            }, {
                year: number;
                month: number;
                day: number;
            }>>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            defaultValue?: {
                year: number;
                month: number;
                day: number;
            } | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            min?: {
                year: number;
                month: number;
                day: number;
            } | undefined;
            max?: {
                year: number;
                month: number;
                day: number;
            } | undefined;
        }, {
            defaultValue?: {
                year: number;
                month: number;
                day: number;
            } | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            min?: {
                year: number;
                month: number;
                day: number;
            } | undefined;
            max?: {
                year: number;
                month: number;
                day: number;
            } | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodObject<{
            year: z.ZodNumber;
            month: z.ZodNumber;
            day: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            year: number;
            month: number;
            day: number;
        }, {
            year: number;
            month: number;
            day: number;
        }>;
    };
    INPUT_TIME: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                hour: z.ZodNumber;
                minute: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                hour: number;
                minute: number;
            }, {
                hour: number;
                minute: number;
            }>>>;
            min: z.ZodOptional<z.ZodObject<{
                hour: z.ZodNumber;
                minute: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                hour: number;
                minute: number;
            }, {
                hour: number;
                minute: number;
            }>>;
            max: z.ZodOptional<z.ZodObject<{
                hour: z.ZodNumber;
                minute: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                hour: number;
                minute: number;
            }, {
                hour: number;
                minute: number;
            }>>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            defaultValue?: {
                hour: number;
                minute: number;
            } | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            min?: {
                hour: number;
                minute: number;
            } | undefined;
            max?: {
                hour: number;
                minute: number;
            } | undefined;
        }, {
            defaultValue?: {
                hour: number;
                minute: number;
            } | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            min?: {
                hour: number;
                minute: number;
            } | undefined;
            max?: {
                hour: number;
                minute: number;
            } | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodObject<{
            hour: z.ZodNumber;
            minute: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            hour: number;
            minute: number;
        }, {
            hour: number;
            minute: number;
        }>;
    };
    INPUT_DATETIME: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
                year: z.ZodNumber;
                month: z.ZodNumber;
                day: z.ZodNumber;
            }, {
                hour: z.ZodNumber;
                minute: z.ZodNumber;
            }>, "strip", z.ZodTypeAny, {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            }, {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            }>>>;
            min: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
                year: z.ZodNumber;
                month: z.ZodNumber;
                day: z.ZodNumber;
            }, {
                hour: z.ZodNumber;
                minute: z.ZodNumber;
            }>, "strip", z.ZodTypeAny, {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            }, {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            }>>;
            max: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
                year: z.ZodNumber;
                month: z.ZodNumber;
                day: z.ZodNumber;
            }, {
                hour: z.ZodNumber;
                minute: z.ZodNumber;
            }>, "strip", z.ZodTypeAny, {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            }, {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            }>>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            defaultValue?: {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            } | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            min?: {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            } | undefined;
            max?: {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            } | undefined;
        }, {
            defaultValue?: {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            } | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            min?: {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            } | undefined;
            max?: {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            } | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodObject<z.objectUtil.extendShape<{
            year: z.ZodNumber;
            month: z.ZodNumber;
            day: z.ZodNumber;
        }, {
            hour: z.ZodNumber;
            minute: z.ZodNumber;
        }>, "strip", z.ZodTypeAny, {
            year: number;
            month: number;
            day: number;
            hour: number;
            minute: number;
        }, {
            year: number;
            month: number;
            day: number;
            hour: number;
            minute: number;
        }>;
    };
    INPUT_SPREADSHEET: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>>, "many">>>;
            columns: z.ZodRecord<z.ZodString, z.ZodEnum<["string", "string?", "number", "number?", "boolean", "boolean?"]>>;
        }, "strip", z.ZodTypeAny, {
            columns: Record<string, "string" | "number" | "boolean" | "string?" | "number?" | "boolean?">;
            defaultValue?: Record<string, string | number | boolean | null | undefined>[] | null | undefined;
            helpText?: string | undefined;
        }, {
            columns: Record<string, "string" | "number" | "boolean" | "string?" | "number?" | "boolean?">;
            defaultValue?: Record<string, string | number | boolean | null | undefined>[] | null | undefined;
            helpText?: string | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>>, "many">;
    };
    UPLOAD_FILE: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            allowedExtensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
            fileUrls: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                uploadUrl: z.ZodString;
                downloadUrl: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                uploadUrl: string;
                downloadUrl: string;
            }, {
                uploadUrl: string;
                downloadUrl: string;
            }>, "many">>>;
            uploadUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
            downloadUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        }, "strip", z.ZodTypeAny, {
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            allowedExtensions?: string[] | undefined;
            uploadUrl?: string | null | undefined;
            downloadUrl?: string | null | undefined;
            fileUrls?: {
                uploadUrl: string;
                downloadUrl: string;
            }[] | null | undefined;
        }, {
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            allowedExtensions?: string[] | undefined;
            uploadUrl?: string | null | undefined;
            downloadUrl?: string | null | undefined;
            fileUrls?: {
                uploadUrl: string;
                downloadUrl: string;
            }[] | null | undefined;
        }>;
        state: z.ZodObject<{
            files: z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                type: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: string;
                name: string;
            }, {
                type: string;
                name: string;
            }>, "many">>;
            name: z.ZodOptional<z.ZodString>;
            type: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            name?: string | undefined;
            files?: {
                type: string;
                name: string;
            }[] | undefined;
        }, {
            type?: string | undefined;
            name?: string | undefined;
            files?: {
                type: string;
                name: string;
            }[] | undefined;
        }>;
        returns: z.ZodObject<{
            name: z.ZodString;
            type: z.ZodString;
            lastModified: z.ZodNumber;
            size: z.ZodNumber;
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            size: number;
            url: string;
            name: string;
            lastModified: number;
        }, {
            type: string;
            size: number;
            url: string;
            name: string;
            lastModified: number;
        }>;
        supportsMultiple: boolean;
    };
    SEARCH: {
        props: z.ZodObject<{
            results: z.ZodArray<z.ZodObject<{
                value: z.ZodString;
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
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
            }, "strip", z.ZodTypeAny, {
                value: string;
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
            }, {
                value: string;
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
            }>, "many">;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            placeholder: z.ZodOptional<z.ZodString>;
            helpText: z.ZodOptional<z.ZodString>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            results: {
                value: string;
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
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
        }, {
            results: {
                value: string;
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
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
        }>;
        state: z.ZodObject<{
            queryTerm: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            queryTerm: string;
        }, {
            queryTerm: string;
        }>;
        returns: z.ZodString;
        supportsMultiple: boolean;
    };
    CONFIRM: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            helpText?: string | undefined;
        }, {
            helpText?: string | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodBoolean;
        exclusive: z.ZodLiteral<true>;
    };
    CONFIRM_IDENTITY: {
        props: z.ZodObject<{
            gracePeriodMs: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            gracePeriodMs?: number | undefined;
        }, {
            gracePeriodMs?: number | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodBoolean;
        exclusive: z.ZodLiteral<true>;
    };
    SELECT_TABLE: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            columns: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                accessorKey: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                label: string;
                accessorKey?: string | undefined;
            }, {
                label: string;
                accessorKey?: string | undefined;
            }>, "many">;
            data: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                data: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined, z.ZodBigInt, z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                    href: z.ZodOptional<z.ZodString>;
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
                    action: z.ZodOptional<z.ZodString>;
                    route: z.ZodOptional<z.ZodString>;
                    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
                }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                    label: z.ZodOptional<z.ZodString>;
                    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                    href: z.ZodOptional<z.ZodString>;
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
                    action: z.ZodOptional<z.ZodString>;
                    route: z.ZodOptional<z.ZodString>;
                    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
                }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                    label: z.ZodOptional<z.ZodString>;
                    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                    href: z.ZodOptional<z.ZodString>;
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
                    action: z.ZodOptional<z.ZodString>;
                    route: z.ZodOptional<z.ZodString>;
                    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
                }, z.ZodTypeAny, "passthrough">>]>, z.ZodAny]>>;
                menu: z.ZodOptional<z.ZodArray<z.ZodIntersection<z.ZodObject<{
                    label: z.ZodString;
                    theme: z.ZodOptional<z.ZodEnum<["default", "danger"]>>;
                }, "strip", z.ZodTypeAny, {
                    label: string;
                    theme?: "default" | "danger" | undefined;
                }, {
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }>]>>, "many">>;
                filterValue: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                key: string;
                data: Record<string, any>;
                menu?: ({
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }))[] | undefined;
                filterValue?: string | undefined;
            }, {
                key: string;
                data: Record<string, any>;
                menu?: ({
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }))[] | undefined;
                filterValue?: string | undefined;
            }>, "many">;
            defaultPageSize: z.ZodOptional<z.ZodNumber>;
            minSelections: z.ZodOptional<z.ZodNumber>;
            maxSelections: z.ZodOptional<z.ZodNumber>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
            isSortable: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
            isFilterable: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
            totalRecords: z.ZodOptional<z.ZodNumber>;
            selectedKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            data: {
                key: string;
                data: Record<string, any>;
                menu?: ({
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }))[] | undefined;
                filterValue?: string | undefined;
            }[];
            columns: {
                label: string;
                accessorKey?: string | undefined;
            }[];
            selectedKeys: string[];
            disabled?: boolean | undefined;
            defaultPageSize?: number | undefined;
            helpText?: string | undefined;
            isFilterable?: boolean | undefined;
            totalRecords?: number | undefined;
            isSortable?: boolean | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
        }, {
            data: {
                key: string;
                data: Record<string, any>;
                menu?: ({
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }))[] | undefined;
                filterValue?: string | undefined;
            }[];
            columns: {
                label: string;
                accessorKey?: string | undefined;
            }[];
            disabled?: boolean | undefined;
            defaultPageSize?: number | undefined;
            helpText?: string | undefined;
            isFilterable?: boolean | undefined;
            totalRecords?: number | undefined;
            isSortable?: boolean | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
            selectedKeys?: string[] | undefined;
        }>;
        state: z.ZodObject<{
            queryTerm: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            sortColumn: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            sortDirection: z.ZodOptional<z.ZodNullable<z.ZodEnum<["asc", "desc"]>>>;
            offset: z.ZodDefault<z.ZodNumber>;
            pageSize: z.ZodNumber;
            isSelectAll: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            offset: number;
            pageSize: number;
            isSelectAll: boolean;
            queryTerm?: string | null | undefined;
            sortColumn?: string | null | undefined;
            sortDirection?: "asc" | "desc" | null | undefined;
        }, {
            pageSize: number;
            queryTerm?: string | null | undefined;
            offset?: number | undefined;
            sortColumn?: string | null | undefined;
            sortDirection?: "asc" | "desc" | null | undefined;
            isSelectAll?: boolean | undefined;
        }>;
        returns: z.ZodUnion<[z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            data: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined, z.ZodBigInt, z.ZodObject<{
                label: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                href: z.ZodOptional<z.ZodString>;
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
                action: z.ZodOptional<z.ZodString>;
                route: z.ZodOptional<z.ZodString>;
                params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                label: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                href: z.ZodOptional<z.ZodString>;
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
                action: z.ZodOptional<z.ZodString>;
                route: z.ZodOptional<z.ZodString>;
                params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                label: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                href: z.ZodOptional<z.ZodString>;
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
                action: z.ZodOptional<z.ZodString>;
                route: z.ZodOptional<z.ZodString>;
                params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
            }, z.ZodTypeAny, "passthrough">>]>, z.ZodAny]>>;
            menu: z.ZodOptional<z.ZodArray<z.ZodIntersection<z.ZodObject<{
                label: z.ZodString;
                theme: z.ZodOptional<z.ZodEnum<["default", "danger"]>>;
            }, "strip", z.ZodTypeAny, {
                label: string;
                theme?: "default" | "danger" | undefined;
            }, {
                label: string;
                theme?: "default" | "danger" | undefined;
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
            }>]>>, "many">>;
            filterValue: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            data: Record<string, any>;
            menu?: ({
                label: string;
                theme?: "default" | "danger" | undefined;
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
            }))[] | undefined;
            filterValue?: string | undefined;
        }, {
            key: string;
            data: Record<string, any>;
            menu?: ({
                label: string;
                theme?: "default" | "danger" | undefined;
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
            }))[] | undefined;
            filterValue?: string | undefined;
        }>, "many">, z.ZodArray<z.ZodObject<{
            key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            key: string;
        }, {
            key: string;
        }>, "many">]>;
    };
    SELECT_SINGLE: {
        props: z.ZodObject<{
            options: z.ZodArray<z.ZodObject<{
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
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
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
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
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
            }, z.ZodTypeAny, "passthrough">>, "many">;
            helpText: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodObject<{
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
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
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
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
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
            }, z.ZodTypeAny, "passthrough">>>>;
            searchable: z.ZodOptional<z.ZodBoolean>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            options: z.objectOutputType<{
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
            }, z.ZodTypeAny, "passthrough">[];
            defaultValue?: z.objectOutputType<{
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
            }, z.ZodTypeAny, "passthrough"> | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            searchable?: boolean | undefined;
        }, {
            options: z.objectInputType<{
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
            }, z.ZodTypeAny, "passthrough">[];
            defaultValue?: z.objectInputType<{
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
            }, z.ZodTypeAny, "passthrough"> | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            searchable?: boolean | undefined;
        }>;
        state: z.ZodObject<{
            queryTerm: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            queryTerm: string;
        }, {
            queryTerm: string;
        }>;
        returns: z.ZodObject<{
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
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
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
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
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
        }, z.ZodTypeAny, "passthrough">>;
    };
    SELECT_MULTIPLE: {
        props: z.ZodObject<{
            options: z.ZodArray<z.ZodObject<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            helpText: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodEffects<z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodObject<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, z.ZodTypeAny, "passthrough">>, "many">>>, any, z.objectInputType<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, z.ZodTypeAny, "passthrough">[] | null | undefined>;
            minSelections: z.ZodOptional<z.ZodNumber>;
            maxSelections: z.ZodOptional<z.ZodNumber>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            options: z.objectOutputType<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, z.ZodTypeAny, "passthrough">[];
            defaultValue?: any;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
        }, {
            options: z.objectInputType<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, z.ZodTypeAny, "passthrough">[];
            defaultValue?: z.objectInputType<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, z.ZodTypeAny, "passthrough">[] | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodArray<z.ZodObject<{
            label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    };
    CREDENTIALS: {
        props: z.ZodObject<{
            params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            params?: Record<string, string> | undefined;
        }, {
            params?: Record<string, string> | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodObject<{
            token: z.ZodString;
            secret: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            token: string;
            secret?: string | undefined;
        }, {
            token: string;
            secret?: string | undefined;
        }>;
    };
};
export declare const ioSchema: {
    INPUT_TEXT: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            multiline: z.ZodOptional<z.ZodBoolean>;
            lines: z.ZodOptional<z.ZodNumber>;
            minLength: z.ZodOptional<z.ZodNumber>;
            maxLength: z.ZodOptional<z.ZodNumber>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
            multiline?: boolean | undefined;
            lines?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }, {
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
            multiline?: boolean | undefined;
            lines?: number | undefined;
            minLength?: number | undefined;
            maxLength?: number | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodString;
    };
    INPUT_EMAIL: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
        }, {
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodString;
    };
    INPUT_NUMBER: {
        props: z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            prepend: z.ZodOptional<z.ZodString>;
            helpText: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            decimals: z.ZodOptional<z.ZodNumber>;
            currency: z.ZodOptional<z.ZodEnum<["USD", "CAD", "EUR", "GBP", "AUD", "CNY", "JPY"]>>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            defaultValue?: number | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
            min?: number | undefined;
            max?: number | undefined;
            prepend?: string | undefined;
            decimals?: number | undefined;
            currency?: "USD" | "CAD" | "EUR" | "GBP" | "AUD" | "CNY" | "JPY" | undefined;
        }, {
            defaultValue?: number | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
            min?: number | undefined;
            max?: number | undefined;
            prepend?: string | undefined;
            decimals?: number | undefined;
            currency?: "USD" | "CAD" | "EUR" | "GBP" | "AUD" | "CNY" | "JPY" | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodNumber;
    };
    INPUT_SLIDER: {
        props: z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
            step: z.ZodOptional<z.ZodNumber>;
            helpText: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            min: number;
            max: number;
            defaultValue?: number | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            step?: number | undefined;
        }, {
            min: number;
            max: number;
            defaultValue?: number | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            step?: number | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodNumber;
    };
    INPUT_URL: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            allowedProtocols: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            allowedProtocols: string[];
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
        }, {
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
            allowedProtocols?: string[] | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodString;
    };
    INPUT_BOOLEAN: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodEffects<z.ZodDefault<z.ZodNullable<z.ZodBoolean>>, boolean, boolean | null | undefined>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            defaultValue: boolean;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
        }, {
            defaultValue?: boolean | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodBoolean;
    };
    INPUT_RICH_TEXT: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            placeholder: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
        }, {
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodObject<{
            html: z.ZodString;
            json: z.ZodAny;
        }, "strip", z.ZodTypeAny, {
            html: string;
            json?: any;
        }, {
            html: string;
            json?: any;
        }>;
    };
    INPUT_DATE: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                year: z.ZodNumber;
                month: z.ZodNumber;
                day: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                year: number;
                month: number;
                day: number;
            }, {
                year: number;
                month: number;
                day: number;
            }>>>;
            min: z.ZodOptional<z.ZodObject<{
                year: z.ZodNumber;
                month: z.ZodNumber;
                day: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                year: number;
                month: number;
                day: number;
            }, {
                year: number;
                month: number;
                day: number;
            }>>;
            max: z.ZodOptional<z.ZodObject<{
                year: z.ZodNumber;
                month: z.ZodNumber;
                day: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                year: number;
                month: number;
                day: number;
            }, {
                year: number;
                month: number;
                day: number;
            }>>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            defaultValue?: {
                year: number;
                month: number;
                day: number;
            } | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            min?: {
                year: number;
                month: number;
                day: number;
            } | undefined;
            max?: {
                year: number;
                month: number;
                day: number;
            } | undefined;
        }, {
            defaultValue?: {
                year: number;
                month: number;
                day: number;
            } | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            min?: {
                year: number;
                month: number;
                day: number;
            } | undefined;
            max?: {
                year: number;
                month: number;
                day: number;
            } | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodObject<{
            year: z.ZodNumber;
            month: z.ZodNumber;
            day: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            year: number;
            month: number;
            day: number;
        }, {
            year: number;
            month: number;
            day: number;
        }>;
    };
    INPUT_TIME: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                hour: z.ZodNumber;
                minute: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                hour: number;
                minute: number;
            }, {
                hour: number;
                minute: number;
            }>>>;
            min: z.ZodOptional<z.ZodObject<{
                hour: z.ZodNumber;
                minute: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                hour: number;
                minute: number;
            }, {
                hour: number;
                minute: number;
            }>>;
            max: z.ZodOptional<z.ZodObject<{
                hour: z.ZodNumber;
                minute: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                hour: number;
                minute: number;
            }, {
                hour: number;
                minute: number;
            }>>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            defaultValue?: {
                hour: number;
                minute: number;
            } | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            min?: {
                hour: number;
                minute: number;
            } | undefined;
            max?: {
                hour: number;
                minute: number;
            } | undefined;
        }, {
            defaultValue?: {
                hour: number;
                minute: number;
            } | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            min?: {
                hour: number;
                minute: number;
            } | undefined;
            max?: {
                hour: number;
                minute: number;
            } | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodObject<{
            hour: z.ZodNumber;
            minute: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            hour: number;
            minute: number;
        }, {
            hour: number;
            minute: number;
        }>;
    };
    INPUT_DATETIME: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
                year: z.ZodNumber;
                month: z.ZodNumber;
                day: z.ZodNumber;
            }, {
                hour: z.ZodNumber;
                minute: z.ZodNumber;
            }>, "strip", z.ZodTypeAny, {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            }, {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            }>>>;
            min: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
                year: z.ZodNumber;
                month: z.ZodNumber;
                day: z.ZodNumber;
            }, {
                hour: z.ZodNumber;
                minute: z.ZodNumber;
            }>, "strip", z.ZodTypeAny, {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            }, {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            }>>;
            max: z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
                year: z.ZodNumber;
                month: z.ZodNumber;
                day: z.ZodNumber;
            }, {
                hour: z.ZodNumber;
                minute: z.ZodNumber;
            }>, "strip", z.ZodTypeAny, {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            }, {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            }>>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            defaultValue?: {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            } | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            min?: {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            } | undefined;
            max?: {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            } | undefined;
        }, {
            defaultValue?: {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            } | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            min?: {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            } | undefined;
            max?: {
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            } | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodObject<z.objectUtil.extendShape<{
            year: z.ZodNumber;
            month: z.ZodNumber;
            day: z.ZodNumber;
        }, {
            hour: z.ZodNumber;
            minute: z.ZodNumber;
        }>, "strip", z.ZodTypeAny, {
            year: number;
            month: number;
            day: number;
            hour: number;
            minute: number;
        }, {
            year: number;
            month: number;
            day: number;
            hour: number;
            minute: number;
        }>;
    };
    INPUT_SPREADSHEET: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>>, "many">>>;
            columns: z.ZodRecord<z.ZodString, z.ZodEnum<["string", "string?", "number", "number?", "boolean", "boolean?"]>>;
        }, "strip", z.ZodTypeAny, {
            columns: Record<string, "string" | "number" | "boolean" | "string?" | "number?" | "boolean?">;
            defaultValue?: Record<string, string | number | boolean | null | undefined>[] | null | undefined;
            helpText?: string | undefined;
        }, {
            columns: Record<string, "string" | "number" | "boolean" | "string?" | "number?" | "boolean?">;
            defaultValue?: Record<string, string | number | boolean | null | undefined>[] | null | undefined;
            helpText?: string | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>>, "many">;
    };
    UPLOAD_FILE: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            allowedExtensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
            fileUrls: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                uploadUrl: z.ZodString;
                downloadUrl: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                uploadUrl: string;
                downloadUrl: string;
            }, {
                uploadUrl: string;
                downloadUrl: string;
            }>, "many">>>;
            uploadUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
            downloadUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        }, "strip", z.ZodTypeAny, {
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            allowedExtensions?: string[] | undefined;
            uploadUrl?: string | null | undefined;
            downloadUrl?: string | null | undefined;
            fileUrls?: {
                uploadUrl: string;
                downloadUrl: string;
            }[] | null | undefined;
        }, {
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            allowedExtensions?: string[] | undefined;
            uploadUrl?: string | null | undefined;
            downloadUrl?: string | null | undefined;
            fileUrls?: {
                uploadUrl: string;
                downloadUrl: string;
            }[] | null | undefined;
        }>;
        state: z.ZodObject<{
            files: z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                type: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: string;
                name: string;
            }, {
                type: string;
                name: string;
            }>, "many">>;
            name: z.ZodOptional<z.ZodString>;
            type: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            name?: string | undefined;
            files?: {
                type: string;
                name: string;
            }[] | undefined;
        }, {
            type?: string | undefined;
            name?: string | undefined;
            files?: {
                type: string;
                name: string;
            }[] | undefined;
        }>;
        returns: z.ZodObject<{
            name: z.ZodString;
            type: z.ZodString;
            lastModified: z.ZodNumber;
            size: z.ZodNumber;
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            size: number;
            url: string;
            name: string;
            lastModified: number;
        }, {
            type: string;
            size: number;
            url: string;
            name: string;
            lastModified: number;
        }>;
        supportsMultiple: boolean;
    };
    SEARCH: {
        props: z.ZodObject<{
            results: z.ZodArray<z.ZodObject<{
                value: z.ZodString;
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
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
            }, "strip", z.ZodTypeAny, {
                value: string;
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
            }, {
                value: string;
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
            }>, "many">;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            placeholder: z.ZodOptional<z.ZodString>;
            helpText: z.ZodOptional<z.ZodString>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            results: {
                value: string;
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
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
        }, {
            results: {
                value: string;
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
            defaultValue?: string | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            placeholder?: string | undefined;
        }>;
        state: z.ZodObject<{
            queryTerm: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            queryTerm: string;
        }, {
            queryTerm: string;
        }>;
        returns: z.ZodString;
        supportsMultiple: boolean;
    };
    CONFIRM: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            helpText?: string | undefined;
        }, {
            helpText?: string | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodBoolean;
        exclusive: z.ZodLiteral<true>;
    };
    CONFIRM_IDENTITY: {
        props: z.ZodObject<{
            gracePeriodMs: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            gracePeriodMs?: number | undefined;
        }, {
            gracePeriodMs?: number | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodBoolean;
        exclusive: z.ZodLiteral<true>;
    };
    SELECT_TABLE: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            columns: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                accessorKey: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                label: string;
                accessorKey?: string | undefined;
            }, {
                label: string;
                accessorKey?: string | undefined;
            }>, "many">;
            data: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                data: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined, z.ZodBigInt, z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                    href: z.ZodOptional<z.ZodString>;
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
                    action: z.ZodOptional<z.ZodString>;
                    route: z.ZodOptional<z.ZodString>;
                    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
                }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                    label: z.ZodOptional<z.ZodString>;
                    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                    href: z.ZodOptional<z.ZodString>;
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
                    action: z.ZodOptional<z.ZodString>;
                    route: z.ZodOptional<z.ZodString>;
                    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
                }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                    label: z.ZodOptional<z.ZodString>;
                    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                    href: z.ZodOptional<z.ZodString>;
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
                    action: z.ZodOptional<z.ZodString>;
                    route: z.ZodOptional<z.ZodString>;
                    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
                }, z.ZodTypeAny, "passthrough">>]>, z.ZodAny]>>;
                menu: z.ZodOptional<z.ZodArray<z.ZodIntersection<z.ZodObject<{
                    label: z.ZodString;
                    theme: z.ZodOptional<z.ZodEnum<["default", "danger"]>>;
                }, "strip", z.ZodTypeAny, {
                    label: string;
                    theme?: "default" | "danger" | undefined;
                }, {
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }>]>>, "many">>;
                filterValue: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                key: string;
                data: Record<string, any>;
                menu?: ({
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }))[] | undefined;
                filterValue?: string | undefined;
            }, {
                key: string;
                data: Record<string, any>;
                menu?: ({
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }))[] | undefined;
                filterValue?: string | undefined;
            }>, "many">;
            defaultPageSize: z.ZodOptional<z.ZodNumber>;
            minSelections: z.ZodOptional<z.ZodNumber>;
            maxSelections: z.ZodOptional<z.ZodNumber>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
            isSortable: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
            isFilterable: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
            totalRecords: z.ZodOptional<z.ZodNumber>;
            selectedKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            data: {
                key: string;
                data: Record<string, any>;
                menu?: ({
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }))[] | undefined;
                filterValue?: string | undefined;
            }[];
            columns: {
                label: string;
                accessorKey?: string | undefined;
            }[];
            selectedKeys: string[];
            disabled?: boolean | undefined;
            defaultPageSize?: number | undefined;
            helpText?: string | undefined;
            isFilterable?: boolean | undefined;
            totalRecords?: number | undefined;
            isSortable?: boolean | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
        }, {
            data: {
                key: string;
                data: Record<string, any>;
                menu?: ({
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }))[] | undefined;
                filterValue?: string | undefined;
            }[];
            columns: {
                label: string;
                accessorKey?: string | undefined;
            }[];
            disabled?: boolean | undefined;
            defaultPageSize?: number | undefined;
            helpText?: string | undefined;
            isFilterable?: boolean | undefined;
            totalRecords?: number | undefined;
            isSortable?: boolean | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
            selectedKeys?: string[] | undefined;
        }>;
        state: z.ZodObject<{
            queryTerm: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            sortColumn: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            sortDirection: z.ZodOptional<z.ZodNullable<z.ZodEnum<["asc", "desc"]>>>;
            offset: z.ZodDefault<z.ZodNumber>;
            pageSize: z.ZodNumber;
            isSelectAll: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            offset: number;
            pageSize: number;
            isSelectAll: boolean;
            queryTerm?: string | null | undefined;
            sortColumn?: string | null | undefined;
            sortDirection?: "asc" | "desc" | null | undefined;
        }, {
            pageSize: number;
            queryTerm?: string | null | undefined;
            offset?: number | undefined;
            sortColumn?: string | null | undefined;
            sortDirection?: "asc" | "desc" | null | undefined;
            isSelectAll?: boolean | undefined;
        }>;
        returns: z.ZodUnion<[z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            data: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined, z.ZodBigInt, z.ZodObject<{
                label: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                href: z.ZodOptional<z.ZodString>;
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
                action: z.ZodOptional<z.ZodString>;
                route: z.ZodOptional<z.ZodString>;
                params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                label: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                href: z.ZodOptional<z.ZodString>;
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
                action: z.ZodOptional<z.ZodString>;
                route: z.ZodOptional<z.ZodString>;
                params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                label: z.ZodOptional<z.ZodString>;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                href: z.ZodOptional<z.ZodString>;
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
                action: z.ZodOptional<z.ZodString>;
                route: z.ZodOptional<z.ZodString>;
                params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
            }, z.ZodTypeAny, "passthrough">>]>, z.ZodAny]>>;
            menu: z.ZodOptional<z.ZodArray<z.ZodIntersection<z.ZodObject<{
                label: z.ZodString;
                theme: z.ZodOptional<z.ZodEnum<["default", "danger"]>>;
            }, "strip", z.ZodTypeAny, {
                label: string;
                theme?: "default" | "danger" | undefined;
            }, {
                label: string;
                theme?: "default" | "danger" | undefined;
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
            }>]>>, "many">>;
            filterValue: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            data: Record<string, any>;
            menu?: ({
                label: string;
                theme?: "default" | "danger" | undefined;
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
            }))[] | undefined;
            filterValue?: string | undefined;
        }, {
            key: string;
            data: Record<string, any>;
            menu?: ({
                label: string;
                theme?: "default" | "danger" | undefined;
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
            }))[] | undefined;
            filterValue?: string | undefined;
        }>, "many">, z.ZodArray<z.ZodObject<{
            key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            key: string;
        }, {
            key: string;
        }>, "many">]>;
    };
    SELECT_SINGLE: {
        props: z.ZodObject<{
            options: z.ZodArray<z.ZodObject<{
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
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
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
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
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
            }, z.ZodTypeAny, "passthrough">>, "many">;
            helpText: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodNullable<z.ZodOptional<z.ZodObject<{
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
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
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
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
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
            }, z.ZodTypeAny, "passthrough">>>>;
            searchable: z.ZodOptional<z.ZodBoolean>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            options: z.objectOutputType<{
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
            }, z.ZodTypeAny, "passthrough">[];
            defaultValue?: z.objectOutputType<{
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
            }, z.ZodTypeAny, "passthrough"> | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            searchable?: boolean | undefined;
        }, {
            options: z.objectInputType<{
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
            }, z.ZodTypeAny, "passthrough">[];
            defaultValue?: z.objectInputType<{
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
            }, z.ZodTypeAny, "passthrough"> | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            searchable?: boolean | undefined;
        }>;
        state: z.ZodObject<{
            queryTerm: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            queryTerm: string;
        }, {
            queryTerm: string;
        }>;
        returns: z.ZodObject<{
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
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
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
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
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
        }, z.ZodTypeAny, "passthrough">>;
    };
    SELECT_MULTIPLE: {
        props: z.ZodObject<{
            options: z.ZodArray<z.ZodObject<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            helpText: z.ZodOptional<z.ZodString>;
            defaultValue: z.ZodEffects<z.ZodDefault<z.ZodNullable<z.ZodArray<z.ZodObject<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, z.ZodTypeAny, "passthrough">>, "many">>>, any, z.objectInputType<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, z.ZodTypeAny, "passthrough">[] | null | undefined>;
            minSelections: z.ZodOptional<z.ZodNumber>;
            maxSelections: z.ZodOptional<z.ZodNumber>;
            disabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            options: z.objectOutputType<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, z.ZodTypeAny, "passthrough">[];
            defaultValue?: any;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
        }, {
            options: z.objectInputType<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, z.ZodTypeAny, "passthrough">[];
            defaultValue?: z.objectInputType<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, z.ZodTypeAny, "passthrough">[] | null | undefined;
            disabled?: boolean | undefined;
            helpText?: string | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodArray<z.ZodObject<{
            label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    };
    CREDENTIALS: {
        props: z.ZodObject<{
            params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            params?: Record<string, string> | undefined;
        }, {
            params?: Record<string, string> | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodObject<{
            token: z.ZodString;
            secret: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            token: string;
            secret?: string | undefined;
        }, {
            token: string;
            secret?: string | undefined;
        }>;
    };
    DISPLAY_CODE: {
        props: z.ZodObject<{
            code: z.ZodString;
            language: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            code: string;
            language?: string | undefined;
        }, {
            code: string;
            language?: string | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_HEADING: {
        props: z.ZodObject<{
            level: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>]>>;
            description: z.ZodOptional<z.ZodString>;
            menuItems: z.ZodOptional<z.ZodArray<z.ZodIntersection<z.ZodObject<{
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
            }>]>>, "many">>;
        }, "strip", z.ZodTypeAny, {
            description?: string | undefined;
            level?: 2 | 3 | 4 | undefined;
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
            }))[] | undefined;
        }, {
            description?: string | undefined;
            level?: 2 | 3 | 4 | undefined;
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
            }))[] | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_METADATA: {
        props: z.ZodObject<{
            data: z.ZodArray<z.ZodObject<{
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
            layout: z.ZodDefault<z.ZodOptional<z.ZodEnum<["grid", "list", "card"]>>>;
        }, "strip", z.ZodTypeAny, {
            data: {
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
            layout: "grid" | "list" | "card";
        }, {
            data: {
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
            layout?: "grid" | "list" | "card" | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_MARKDOWN: {
        props: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_HTML: {
        props: z.ZodObject<{
            html: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            html: string;
        }, {
            html: string;
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_IMAGE: {
        props: z.ZodObject<{
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
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_LINK: {
        props: z.ZodIntersection<z.ZodObject<{
            theme: z.ZodOptional<z.ZodEnum<["default", "primary", "secondary", "danger"]>>;
        }, "strip", z.ZodTypeAny, {
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }, {
            theme?: "default" | "primary" | "secondary" | "danger" | undefined;
        }>, z.ZodUnion<[z.ZodObject<{
            href: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            href: string;
        }, {
            href: string;
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
        }>]>]>>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_OBJECT: {
        props: z.ZodObject<{
            data: z.ZodType<KeyValue, z.ZodTypeDef, KeyValue>;
        }, "strip", z.ZodTypeAny, {
            data?: KeyValue;
        }, {
            data?: KeyValue;
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_GRID: {
        props: z.ZodObject<{
            data: z.ZodArray<z.ZodObject<{
                data: z.ZodObject<z.objectUtil.extendShape<{
                    label: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                    image: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                        url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        alt: z.ZodOptional<z.ZodString>;
                        fit: z.ZodOptional<z.ZodEnum<["cover", "contain"]>>;
                        aspectRatio: z.ZodOptional<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        alt?: string | undefined;
                        url?: string | null | undefined;
                        fit?: "cover" | "contain" | undefined;
                        aspectRatio?: number | undefined;
                    }, {
                        alt?: string | undefined;
                        url?: string | null | undefined;
                        fit?: "cover" | "contain" | undefined;
                        aspectRatio?: number | undefined;
                    }>>>;
                    menu: z.ZodOptional<z.ZodArray<z.ZodIntersection<z.ZodObject<{
                        label: z.ZodString;
                        theme: z.ZodOptional<z.ZodEnum<["default", "danger"]>>;
                    }, "strip", z.ZodTypeAny, {
                        label: string;
                        theme?: "default" | "danger" | undefined;
                    }, {
                        label: string;
                        theme?: "default" | "danger" | undefined;
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
                    }>]>>, "many">>;
                    url: z.ZodOptional<z.ZodString>;
                    route: z.ZodOptional<z.ZodString>;
                    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                }, {
                    title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                }>, "strip", z.ZodTypeAny, {
                    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                    label?: string | null | undefined;
                    url?: string | undefined;
                    description?: string | null | undefined;
                    image?: {
                        alt?: string | undefined;
                        url?: string | null | undefined;
                        fit?: "cover" | "contain" | undefined;
                        aspectRatio?: number | undefined;
                    } | null | undefined;
                    route?: string | undefined;
                    menu?: ({
                        label: string;
                        theme?: "default" | "danger" | undefined;
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
                    }))[] | undefined;
                    title?: string | null | undefined;
                }, {
                    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                    label?: string | null | undefined;
                    url?: string | undefined;
                    description?: string | null | undefined;
                    image?: {
                        alt?: string | undefined;
                        url?: string | null | undefined;
                        fit?: "cover" | "contain" | undefined;
                        aspectRatio?: number | undefined;
                    } | null | undefined;
                    route?: string | undefined;
                    menu?: ({
                        label: string;
                        theme?: "default" | "danger" | undefined;
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
                    }))[] | undefined;
                    title?: string | null | undefined;
                }>;
                key: z.ZodString;
                filterValue: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                key: string;
                data: {
                    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                    label?: string | null | undefined;
                    url?: string | undefined;
                    description?: string | null | undefined;
                    image?: {
                        alt?: string | undefined;
                        url?: string | null | undefined;
                        fit?: "cover" | "contain" | undefined;
                        aspectRatio?: number | undefined;
                    } | null | undefined;
                    route?: string | undefined;
                    menu?: ({
                        label: string;
                        theme?: "default" | "danger" | undefined;
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
                    }))[] | undefined;
                    title?: string | null | undefined;
                };
                filterValue?: string | undefined;
            }, {
                key: string;
                data: {
                    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                    label?: string | null | undefined;
                    url?: string | undefined;
                    description?: string | null | undefined;
                    image?: {
                        alt?: string | undefined;
                        url?: string | null | undefined;
                        fit?: "cover" | "contain" | undefined;
                        aspectRatio?: number | undefined;
                    } | null | undefined;
                    route?: string | undefined;
                    menu?: ({
                        label: string;
                        theme?: "default" | "danger" | undefined;
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
                    }))[] | undefined;
                    title?: string | null | undefined;
                };
                filterValue?: string | undefined;
            }>, "many">;
            idealColumnWidth: z.ZodOptional<z.ZodNumber>;
            defaultPageSize: z.ZodOptional<z.ZodNumber>;
            helpText: z.ZodOptional<z.ZodString>;
            isFilterable: z.ZodDefault<z.ZodBoolean>;
            totalRecords: z.ZodOptional<z.ZodNumber>;
            isAsync: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            data: {
                key: string;
                data: {
                    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                    label?: string | null | undefined;
                    url?: string | undefined;
                    description?: string | null | undefined;
                    image?: {
                        alt?: string | undefined;
                        url?: string | null | undefined;
                        fit?: "cover" | "contain" | undefined;
                        aspectRatio?: number | undefined;
                    } | null | undefined;
                    route?: string | undefined;
                    menu?: ({
                        label: string;
                        theme?: "default" | "danger" | undefined;
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
                    }))[] | undefined;
                    title?: string | null | undefined;
                };
                filterValue?: string | undefined;
            }[];
            isFilterable: boolean;
            idealColumnWidth?: number | undefined;
            defaultPageSize?: number | undefined;
            helpText?: string | undefined;
            totalRecords?: number | undefined;
            isAsync?: boolean | undefined;
        }, {
            data: {
                key: string;
                data: {
                    params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                    label?: string | null | undefined;
                    url?: string | undefined;
                    description?: string | null | undefined;
                    image?: {
                        alt?: string | undefined;
                        url?: string | null | undefined;
                        fit?: "cover" | "contain" | undefined;
                        aspectRatio?: number | undefined;
                    } | null | undefined;
                    route?: string | undefined;
                    menu?: ({
                        label: string;
                        theme?: "default" | "danger" | undefined;
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
                    }))[] | undefined;
                    title?: string | null | undefined;
                };
                filterValue?: string | undefined;
            }[];
            idealColumnWidth?: number | undefined;
            defaultPageSize?: number | undefined;
            helpText?: string | undefined;
            isFilterable?: boolean | undefined;
            totalRecords?: number | undefined;
            isAsync?: boolean | undefined;
        }>;
        state: z.ZodObject<{
            queryTerm: z.ZodOptional<z.ZodString>;
            offset: z.ZodDefault<z.ZodNumber>;
            pageSize: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            offset: number;
            pageSize: number;
            queryTerm?: string | undefined;
        }, {
            pageSize: number;
            queryTerm?: string | undefined;
            offset?: number | undefined;
        }>;
        returns: z.ZodNull;
    };
    DISPLAY_TABLE: {
        props: z.ZodObject<{
            helpText: z.ZodOptional<z.ZodString>;
            columns: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                accessorKey: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                label: string;
                accessorKey?: string | undefined;
            }, {
                label: string;
                accessorKey?: string | undefined;
            }>, "many">;
            data: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                data: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined, z.ZodBigInt, z.ZodObject<{
                    label: z.ZodOptional<z.ZodString>;
                    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                    href: z.ZodOptional<z.ZodString>;
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
                    action: z.ZodOptional<z.ZodString>;
                    route: z.ZodOptional<z.ZodString>;
                    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
                }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                    label: z.ZodOptional<z.ZodString>;
                    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                    href: z.ZodOptional<z.ZodString>;
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
                    action: z.ZodOptional<z.ZodString>;
                    route: z.ZodOptional<z.ZodString>;
                    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
                }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                    label: z.ZodOptional<z.ZodString>;
                    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodDate, z.ZodUndefined]>>;
                    href: z.ZodOptional<z.ZodString>;
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
                    action: z.ZodOptional<z.ZodString>;
                    route: z.ZodOptional<z.ZodString>;
                    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodUndefined]>, z.ZodDate]>, z.ZodBigInt]>>>;
                    highlightColor: z.ZodOptional<z.ZodEnum<["red", "orange", "yellow", "green", "blue", "purple", "pink", "gray"]>>;
                }, z.ZodTypeAny, "passthrough">>]>, z.ZodAny]>>;
                menu: z.ZodOptional<z.ZodArray<z.ZodIntersection<z.ZodObject<{
                    label: z.ZodString;
                    theme: z.ZodOptional<z.ZodEnum<["default", "danger"]>>;
                }, "strip", z.ZodTypeAny, {
                    label: string;
                    theme?: "default" | "danger" | undefined;
                }, {
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }>]>>, "many">>;
                filterValue: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                key: string;
                data: Record<string, any>;
                menu?: ({
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }))[] | undefined;
                filterValue?: string | undefined;
            }, {
                key: string;
                data: Record<string, any>;
                menu?: ({
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }))[] | undefined;
                filterValue?: string | undefined;
            }>, "many">;
            orientation: z.ZodDefault<z.ZodEnum<["vertical", "horizontal"]>>;
            defaultPageSize: z.ZodOptional<z.ZodNumber>;
            isSortable: z.ZodDefault<z.ZodBoolean>;
            isFilterable: z.ZodDefault<z.ZodBoolean>;
            totalRecords: z.ZodOptional<z.ZodNumber>;
            isAsync: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            data: {
                key: string;
                data: Record<string, any>;
                menu?: ({
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }))[] | undefined;
                filterValue?: string | undefined;
            }[];
            isFilterable: boolean;
            columns: {
                label: string;
                accessorKey?: string | undefined;
            }[];
            orientation: "vertical" | "horizontal";
            isSortable: boolean;
            defaultPageSize?: number | undefined;
            helpText?: string | undefined;
            totalRecords?: number | undefined;
            isAsync?: boolean | undefined;
        }, {
            data: {
                key: string;
                data: Record<string, any>;
                menu?: ({
                    label: string;
                    theme?: "default" | "danger" | undefined;
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
                }))[] | undefined;
                filterValue?: string | undefined;
            }[];
            columns: {
                label: string;
                accessorKey?: string | undefined;
            }[];
            defaultPageSize?: number | undefined;
            helpText?: string | undefined;
            isFilterable?: boolean | undefined;
            totalRecords?: number | undefined;
            isAsync?: boolean | undefined;
            orientation?: "vertical" | "horizontal" | undefined;
            isSortable?: boolean | undefined;
        }>;
        state: z.ZodObject<{
            queryTerm: z.ZodOptional<z.ZodString>;
            sortColumn: z.ZodOptional<z.ZodString>;
            sortDirection: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
            offset: z.ZodDefault<z.ZodNumber>;
            pageSize: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            offset: number;
            pageSize: number;
            queryTerm?: string | undefined;
            sortColumn?: string | undefined;
            sortDirection?: "asc" | "desc" | undefined;
        }, {
            pageSize: number;
            queryTerm?: string | undefined;
            offset?: number | undefined;
            sortColumn?: string | undefined;
            sortDirection?: "asc" | "desc" | undefined;
        }>;
        returns: z.ZodNull;
    };
    DISPLAY_PROGRESS_STEPS: {
        props: z.ZodObject<{
            steps: z.ZodObject<{
                completed: z.ZodNumber;
                total: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                completed: number;
                total: number;
            }, {
                completed: number;
                total: number;
            }>;
            currentStep: z.ZodOptional<z.ZodString>;
            subTitle: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            steps: {
                completed: number;
                total: number;
            };
            currentStep?: string | undefined;
            subTitle?: string | undefined;
        }, {
            steps: {
                completed: number;
                total: number;
            };
            currentStep?: string | undefined;
            subTitle?: string | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
        immediate: boolean;
    };
    DISPLAY_PROGRESS_INDETERMINATE: {
        props: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        state: z.ZodNull;
        returns: z.ZodNull;
        immediate: boolean;
    };
    DISPLAY_PROGRESS_THROUGH_LIST: {
        props: z.ZodObject<{
            items: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                isComplete: z.ZodBoolean;
                resultDescription: z.ZodUnion<[z.ZodNull, z.ZodString]>;
            }, "strip", z.ZodTypeAny, {
                label: string;
                isComplete: boolean;
                resultDescription: string | null;
            }, {
                label: string;
                isComplete: boolean;
                resultDescription: string | null;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            items: {
                label: string;
                isComplete: boolean;
                resultDescription: string | null;
            }[];
        }, {
            items: {
                label: string;
                isComplete: boolean;
                resultDescription: string | null;
            }[];
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
    DISPLAY_VIDEO: {
        props: z.ZodObject<{
            width: z.ZodOptional<z.ZodEnum<["thumbnail", "small", "medium", "large"]>>;
            height: z.ZodOptional<z.ZodEnum<["thumbnail", "small", "medium", "large"]>>;
            url: z.ZodString;
            loop: z.ZodOptional<z.ZodBoolean>;
            muted: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            width?: "thumbnail" | "small" | "medium" | "large" | undefined;
            height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            loop?: boolean | undefined;
            muted?: boolean | undefined;
        }, {
            url: string;
            width?: "thumbnail" | "small" | "medium" | "large" | undefined;
            height?: "thumbnail" | "small" | "medium" | "large" | undefined;
            loop?: boolean | undefined;
            muted?: boolean | undefined;
        }>;
        state: z.ZodNull;
        returns: z.ZodNull;
    };
};
export type IoMethod = {
    props: z.ZodTypeAny;
    state: z.ZodTypeAny;
    returns: z.ZodTypeAny;
};
export type T_IO_Schema = typeof ioSchema;
export type T_IO_METHOD_NAMES = keyof T_IO_Schema;
export type T_IO_DISPLAY_METHOD_NAMES = keyof typeof DISPLAY_SCHEMA;
export type T_IO_INPUT_METHOD_NAMES = keyof typeof INPUT_SCHEMA;
type SupportsMultipleMap = {
    [MN in T_IO_METHOD_NAMES]: T_IO_Schema[MN] extends {
        supportsMultiple: boolean;
    } ? MN : never;
};
export type T_IO_MULTIPLEABLE_METHOD_NAMES = SupportsMultipleMap[T_IO_METHOD_NAMES];
type T_Fields = 'props' | 'state' | 'returns';
export type T_IO_METHOD<MN extends T_IO_METHOD_NAMES, Field extends T_Fields> = z.infer<T_IO_Schema[MN][Field]>;
export type T_IO_PROPS<MN extends T_IO_METHOD_NAMES> = z.input<T_IO_Schema[MN]['props']>;
export type T_IO_RETURNS<MN extends T_IO_METHOD_NAMES> = z.infer<T_IO_Schema[MN]['returns']>;
export type T_IO_STATE<MN extends T_IO_METHOD_NAMES> = z.infer<T_IO_Schema[MN]['state']>;
export type JSONPrimitive = string | number | boolean | null;
export type RawActionReturnData = Record<string, JSONPrimitive>;
export type IOFunctionReturnType = SerializableRecord | Serializable[] | Serializable | undefined;
export type ParsedActionReturnData = Record<string, JSONPrimitive> | JSONPrimitive;
export type ActionResultSchema = {
    schemaVersion: 0 | 1;
    status: 'SUCCESS' | 'FAILURE';
    data: IOFunctionReturnType | null;
    meta?: any;
};
export type ParsedActionResultSchema = Omit<ActionResultSchema, 'data'> & {
    data: ParsedActionReturnData | null;
};
export {};
