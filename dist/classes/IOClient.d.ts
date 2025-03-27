/// <reference types="node" />
import { z } from 'zod';
import { Evt } from 'evt';
import { T_IO_RESPONSE, T_IO_PROPS, T_IO_RETURNS, T_IO_METHOD_NAMES, T_IO_DISPLAY_METHOD_NAMES, T_IO_INPUT_METHOD_NAMES, T_IO_MULTIPLEABLE_METHOD_NAMES } from '../ioSchema';
import Logger from './Logger';
import { AnyIOComponent } from './IOComponent';
import { ExclusiveIOPromise, IOGroupPromise, IOPromiseValidator, DisplayIOPromise, InputIOPromise, MultipleableIOPromise, WithChoicesIOPromiseValidator } from './IOPromise';
import { IORenderSender, ResponseHandlerFn, MaybeOptionalGroupIOPromise, ExclusiveIOComponentFunction, IOComponentDefinition, DisplayIOComponentFunction, RequiredPropsDisplayIOComponentFunction, InputIOComponentFunction, RequiredPropsInputIOComponentFunction, GroupConfig, ChoiceButtonConfig, RequiredPropsMultipleableInputIOComponentFunction, MultipleableInputIOComponentFunction } from '../types';
interface ClientConfig {
    logger: Logger;
    send: IORenderSender;
    isDemo?: boolean;
    displayResolvesImmediately?: boolean;
}
export type IOClientRenderReturnValues<Components extends [AnyIOComponent, ...AnyIOComponent[]]> = {
    choice?: string;
    returnValue: {
        [Idx in keyof Components]: Components[Idx] extends AnyIOComponent ? z.infer<Components[Idx]['schema']['returns']> | undefined : Components[Idx];
    };
};
export type IOClientRenderValidator<Components extends [AnyIOComponent, ...AnyIOComponent[]]> = IOPromiseValidator<IOClientRenderReturnValues<Components>> | WithChoicesIOPromiseValidator<string, IOClientRenderReturnValues<Components>['returnValue']>;
/**
 * The client class that handles IO calls for a given transaction.
 *
 * Each transaction has its own IOClient which creates the IO argument
 * passed to action handlers that are aware of the transaction in order
 * to transmit IO calls correctly.
 */
export declare class IOClient {
    logger: Logger;
    send: IORenderSender;
    isDemo: boolean;
    displayResolvesImmediately: boolean | undefined;
    previousInputGroupKey: string | undefined;
    onResponseHandlers: Map<string, ResponseHandlerFn>;
    inlineActionKeys: Set<string>;
    isCanceled: boolean;
    constructor(config: ClientConfig);
    /**
     * Creates a render loop for an IO call.
     *
     * Given a list of components (potentially only one if not rendering a group)
     * this method is responsible for sending the initial render call and handling
     * responses (returns, state updates, or cancellations) from Interval.
     * Resolves when it receives final responses or from Interval,
     * or throws an IOError of kind `CANCELED` if canceled.
     */
    renderComponents<Components extends [AnyIOComponent, ...AnyIOComponent[]]>({ components, validator: groupValidator, choiceButtons, }: {
        components: Components;
        validator?: IOClientRenderValidator<Components>;
        choiceButtons?: ChoiceButtonConfig[];
    }): Promise<IOClientRenderReturnValues<Components>>;
    /**
     * Combines multiple I/O method calls into a single form.
     *
     * Individual I/O methods await within your action until user input is provided, such that each I/O method call results in a distinct step within the generated app. `io.group` allows you to group multiple I/O methods together to request input all at once in a single step.
     *
     * Custom validation can be performed on groups by chaining a `.validate()` method call to the group.
     *
     * **Usage:**
     *
     * ```typescript
     * const [name, email, age] = await io.group([
     *   io.input.text("Name"),
     *   io.input.email("Email"),
     *   io.input.number("Age"),
     * ]);
     *
     * ```
     *
     * ```typescript
     * const { name, email, age } = await io.group({
     *   name: io.input.text("Name"),
     *   email: io.input.email("Email"),
     *   age: io.input.number("Age"),
     * });
     *
     * ```
     */
    group<IOPromises extends [MaybeOptionalGroupIOPromise, ...MaybeOptionalGroupIOPromise[]] | Record<string, MaybeOptionalGroupIOPromise> | MaybeOptionalGroupIOPromise[]>(promises: IOPromises, props?: GroupConfig): IOGroupPromise<IOPromises, IOPromises extends Record<string, MaybeOptionalGroupIOPromise> ? IOPromises extends infer T extends Record<string, MaybeOptionalGroupIOPromise> ? { [K in keyof T]: ReturnType<IOPromises[K]["getValue"]>; } : never : IOPromises extends [MaybeOptionalGroupIOPromise, ...MaybeOptionalGroupIOPromise[]] ? import("./IOPromise").IOGroupReturnValues<IOPromises> : unknown[]>;
    getPromiseProps<MethodName extends T_IO_METHOD_NAMES, Props extends object = T_IO_PROPS<MethodName>, Output = T_IO_RETURNS<MethodName>, DefaultValue = Output>(methodName: MethodName, inputProps?: Props, componentDef?: IOComponentDefinition<MethodName, Props, Output, DefaultValue>, onPropsUpdate?: Evt<T_IO_PROPS<MethodName>>): {
        methodName: MethodName;
        props: T_IO_PROPS<MethodName>;
        valueGetter: (r: T_IO_RETURNS<MethodName>) => Output;
        defaultValueGetter: (defaultValue: DefaultValue) => Output;
        onStateChange: ((newState: import("../ioSchema").T_IO_STATE<MethodName>) => Promise<T_IO_PROPS<MethodName>>) | undefined;
    };
    createIOMethod<MethodName extends T_IO_MULTIPLEABLE_METHOD_NAMES, Props extends object = T_IO_PROPS<MethodName>, Output = T_IO_RETURNS<MethodName>>(methodName: MethodName, config?: {
        propsRequired?: false;
        componentDef?: IOComponentDefinition<MethodName, Props, Output>;
    }): MultipleableInputIOComponentFunction<MethodName, Props, Output>;
    createIOMethod<MethodName extends T_IO_MULTIPLEABLE_METHOD_NAMES, Props extends object = T_IO_PROPS<MethodName>, Output = T_IO_RETURNS<MethodName>>(methodName: MethodName, config: {
        propsRequired?: true;
        componentDef?: IOComponentDefinition<MethodName, Props, Output>;
    }): RequiredPropsMultipleableInputIOComponentFunction<MethodName, Props, Output>;
    createIOMethod<MethodName extends T_IO_DISPLAY_METHOD_NAMES, Props extends object = T_IO_PROPS<MethodName>, Output = T_IO_RETURNS<MethodName>>(methodName: MethodName, config?: {
        propsRequired?: false;
        componentDef?: IOComponentDefinition<MethodName, Props, Output>;
    }): DisplayIOComponentFunction<MethodName, Props, Output>;
    createIOMethod<MethodName extends T_IO_DISPLAY_METHOD_NAMES, Props extends object = T_IO_PROPS<MethodName>, Output = T_IO_RETURNS<MethodName>>(methodName: MethodName, config: {
        propsRequired?: true;
        componentDef?: IOComponentDefinition<MethodName, Props, Output>;
    }): RequiredPropsDisplayIOComponentFunction<MethodName, Props, Output>;
    createIOMethod<MethodName extends T_IO_INPUT_METHOD_NAMES, Props extends object = T_IO_PROPS<MethodName>, Output = T_IO_RETURNS<MethodName>>(methodName: MethodName, config?: {
        propsRequired?: false;
        componentDef?: IOComponentDefinition<MethodName, Props, Output>;
    }): InputIOComponentFunction<MethodName, Props, Output>;
    createIOMethod<MethodName extends T_IO_INPUT_METHOD_NAMES, Props extends object = T_IO_PROPS<MethodName>, Output = T_IO_RETURNS<MethodName>>(methodName: MethodName, config: {
        propsRequired?: true;
        componentDef?: IOComponentDefinition<MethodName, Props, Output>;
    }): RequiredPropsInputIOComponentFunction<MethodName, Props, Output>;
    createExclusiveIOMethod<MethodName extends T_IO_INPUT_METHOD_NAMES, Props extends object = T_IO_PROPS<MethodName>, Output = T_IO_RETURNS<MethodName>>(methodName: MethodName, { componentDef, demoUnsupported, }?: {
        componentDef?: IOComponentDefinition<MethodName, Props, Output>;
        demoUnsupported?: boolean;
    }): ExclusiveIOComponentFunction<MethodName, Props, Output>;
    createCredentialsIOMethod<Props extends object = T_IO_PROPS<'CREDENTIALS'>>(): (serviceName: string, props?: Props) => ExclusiveIOPromise<"CREDENTIALS", {
        params?: Record<string, string> | undefined;
    }, {
        token: string;
        secret?: string | undefined;
    }>;
    /**
     * The namespace of I/O methods available in action handlers.
     */
    get io(): {
        group: <IOPromises extends Record<string, MaybeOptionalGroupIOPromise> | [MaybeOptionalGroupIOPromise, ...MaybeOptionalGroupIOPromise[]] | MaybeOptionalGroupIOPromise[]>(promises: IOPromises, props?: GroupConfig | undefined) => IOGroupPromise<IOPromises, IOPromises extends Record<string, MaybeOptionalGroupIOPromise> ? IOPromises extends infer T extends Record<string, MaybeOptionalGroupIOPromise> ? { [K in keyof T]: ReturnType<IOPromises[K]["getValue"]>; } : never : IOPromises extends [MaybeOptionalGroupIOPromise, ...MaybeOptionalGroupIOPromise[]] ? import("./IOPromise").IOGroupReturnValues<IOPromises> : unknown[]>;
        /**
         * Requests confirmation of an action using a full-screen dialog box.
         *
         * **Note:** `io.confirm` is not supported within an `io.group`.
         *
         * **Usage:**
         *
         * ```typescript
         * const shouldDelete = await io.confirm("Delete this user account?", {
         *   helpText: "All of their data will be deleted immediately.",
         * });
         * ```
         */
        confirm: ExclusiveIOComponentFunction<"CONFIRM", {
            helpText?: string | undefined;
        }, boolean>;
        /**
         * Requests multi-factor authentication or password confirmation of the person running the action.
         *
         * **Note:** `io.confirmIdentity` is not supported within an `io.group`.
         *
         * **Usage:**
         *
         * ```typescript
         * const shouldDelete = await io.confirmIdentity("This is a sensitive action.");
         * ```
         */
        confirmIdentity: ExclusiveIOComponentFunction<"CONFIRM_IDENTITY", {
            gracePeriodMs?: number | undefined;
        }, boolean>;
        /**
         * Allows searching for arbitrary results from a search box.
         *
         * **Usage:**
         *
         * ```typescript
         * const user = await io.search("Search for a user", {
         *   renderResult: user => ({
         *     label: user.name,
         *     description: user.email,
         *     image: {
         *       url: user.avatar,
         *       size: "small",
         *     },
         *   }),
         *   onSearch: async query => {
         *     return users.filter(user => user.name.includes(query));
         *   },
         * });
         * ```
         */
        search: <Result = any>(label: string, props: {
            placeholder?: string | undefined;
            helpText?: string | undefined;
            disabled?: boolean | undefined;
            initialResults?: Result[] | undefined;
            defaultValue?: Result | undefined;
            renderResult: (result: Result) => string | number | boolean | Date | {
                label: string | number | boolean | Date;
                description?: string | undefined;
                image?: {
                    url: string;
                    alt?: string | undefined;
                    size?: "thumbnail" | "small" | "medium" | "large" | undefined;
                    width?: "thumbnail" | "small" | "medium" | "large" | undefined;
                    height?: "thumbnail" | "small" | "medium" | "large" | undefined;
                } | undefined;
                imageUrl?: string | undefined;
            };
            onSearch: (query: string) => Promise<Result[]>;
        }) => MultipleableIOPromise<"SEARCH", {
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
        }, Result, Result | null>;
        /**
         * The namespace for methods to collect user input.
         */
        input: {
            /**
             * Requests a string value.
             *
             * **Usage:**
             *
             * ```typescript
             * const text = await io.input.text("Company name", {
             *   placeholder: "Acme Inc.",
             * });
             * ```
             */
            text: InputIOComponentFunction<"INPUT_TEXT", {
                defaultValue?: string | null | undefined;
                disabled?: boolean | undefined;
                helpText?: string | undefined;
                placeholder?: string | undefined;
                multiline?: boolean | undefined;
                lines?: number | undefined;
                minLength?: number | undefined;
                maxLength?: number | undefined;
            }, string>;
            /**
             * Requests a boolean value.
             *
             * **Usage:**
             *
             * ```typescript
             * const shouldSubscribe = await io.input.boolean("Subscribe to our newsletter?");
             * ```
             */
            boolean: InputIOComponentFunction<"INPUT_BOOLEAN", {
                defaultValue?: boolean | null | undefined;
                disabled?: boolean | undefined;
                helpText?: string | undefined;
            }, boolean>;
            /**
             * Requests a numeric value.
             *
             * **Usage:**
             *
             * ```typescript
             * const amount = await io.input.number("Amount", {
             *   helpText: "Enter a number between one and ten.",
             *   min: 1,
             *   max: 10,
             * });
             * ```
             */
            number: InputIOComponentFunction<"INPUT_NUMBER", {
                defaultValue?: number | null | undefined;
                disabled?: boolean | undefined;
                helpText?: string | undefined;
                placeholder?: string | undefined;
                min?: number | undefined;
                max?: number | undefined;
                prepend?: string | undefined;
                decimals?: number | undefined;
                currency?: "USD" | "CAD" | "EUR" | "GBP" | "AUD" | "CNY" | "JPY" | undefined;
            }, number>;
            /**
             * Requests a numeric value within a range using a slider input.
             *
             * **Usage:**
             *
             * ```typescript
             * const amount = await io.input.range("Amount", {
             *   helpText: "Select a number between one and ten.",
             *   min: 1,
             *   max: 10,
             * });
             */
            slider: InputIOComponentFunction<"INPUT_SLIDER", {
                min: number;
                max: number;
                defaultValue?: number | null | undefined;
                disabled?: boolean | undefined;
                helpText?: string | undefined;
                step?: number | undefined;
            }, number>;
            /**
             * Requests an email address.
             *
             * **Usage:**
             *
             * ```typescript
             * const email = await io.input.email("Email address", {
             *   helpText: "Please provide your work email.",
             *   placeholder: "you@example.com",
             * });
             * ```
             */
            email: InputIOComponentFunction<"INPUT_EMAIL", {
                defaultValue?: string | null | undefined;
                disabled?: boolean | undefined;
                helpText?: string | undefined;
                placeholder?: string | undefined;
            }, string>;
            /**
             * Requests rich text input and returns a string of HTML.
             *
             * **Usage:**
             *
             * ```typescript
             * const body = await io.input.richText("Email body", {
             *   helpText: "Please include user activation information.",
             * });
             * ```
             */
            richText: InputIOComponentFunction<"INPUT_RICH_TEXT", {
                defaultValue?: string | null | undefined;
                disabled?: boolean | undefined;
                helpText?: string | undefined;
                placeholder?: string | undefined;
            }, {
                html: string;
                json?: any;
            }>;
            /**
             * Requests a URL.
             *
             * The URL is validated and an error is shown if the provided value is not a URL. You can perform additional URL validation by using the validation API with `.validate()`.
             *
             * **Usage:**
             *
             * ```typescript
             * const redirectUrl = await io.input.url("Redirect URL", {
             *   helpText: "Please provide a URL for the redirect.",
             *   placeholder: "https://example.com",
             *   allowedProtocols: ["https"],
             * });
             *
             *  return redirectUrl.href;
             * ```
             */
            url: InputIOComponentFunction<"INPUT_URL", {
                defaultValue?: string | null | undefined;
                disabled?: boolean | undefined;
                helpText?: string | undefined;
                placeholder?: string | undefined;
                allowedProtocols?: string[] | undefined;
            }, URL>;
            /**
             * Requests a date.
             *
             * **Usage:**
             *
             * ```typescript
             * const date = await io.input.date("Date");
             * ```
             */
            date: InputIOComponentFunction<"INPUT_DATE", Omit<{
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
            }, "defaultValue" | "min" | "max"> & {
                defaultValue?: Date | {
                    year: number;
                    month: number;
                    day: number;
                } | undefined;
                min?: Date | {
                    year: number;
                    month: number;
                    day: number;
                } | undefined;
                max?: Date | {
                    year: number;
                    month: number;
                    day: number;
                } | undefined;
            }, {
                jsDate: Date;
                year: number;
                month: number;
                day: number;
            }>;
            /**
             * Requests a time.
             *
             * **Usage:**
             *
             * ```typescript
             * const time = await io.input.time("Time");
             * ```
             */
            time: InputIOComponentFunction<"INPUT_TIME", {
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
                hour: number;
                minute: number;
            }>;
            /**
             * Requests a date & time.
             *
             * **Usage:**
             *
             * ```typescript
             * const datetime = await io.input.datetime("Date & time");
             * ```
             */
            datetime: InputIOComponentFunction<"INPUT_DATETIME", Omit<{
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
            }, "defaultValue" | "min" | "max"> & {
                defaultValue?: Date | {
                    year: number;
                    month: number;
                    day: number;
                    hour: number;
                    minute: number;
                } | undefined;
                min?: Date | {
                    year: number;
                    month: number;
                    day: number;
                    hour: number;
                    minute: number;
                } | undefined;
                max?: Date | {
                    year: number;
                    month: number;
                    day: number;
                    hour: number;
                    minute: number;
                } | undefined;
            }, {
                jsDate: Date;
                year: number;
                month: number;
                day: number;
                hour: number;
                minute: number;
            }>;
            /**
             * Prompts the app user to select and upload a file.
             *
             * The resulting object points to a temporary file that expires after the action finishes running. You can access its contents in your action and optionally persist the file elsewhere if it should live longer.
             *
             * You may upload the file directly to your own S3-compatible API by providing custom presigned upload and download URLs via the `generatePresignedUrls` property.
             *
             * **Usage:**
             *
             * ```typescript
             * const datetime = await io.input.datetime("Date & time");
             * ```
             */
            file: MultipleableInputIOComponentFunction<"UPLOAD_FILE", {
                disabled?: boolean | undefined;
                helpText?: string | undefined;
                allowedExtensions?: string[] | undefined;
                uploadUrl?: string | null | undefined;
                downloadUrl?: string | null | undefined;
                fileUrls?: {
                    uploadUrl: string;
                    downloadUrl: string;
                }[] | null | undefined;
            } & {
                generatePresignedUrls?: ((state: {
                    type: string;
                    name: string;
                }) => Promise<{
                    uploadUrl: string;
                    downloadUrl: string;
                }>) | undefined;
            }, {
                lastModified: Date;
                extension: string;
                url(): Promise<string>;
                text(): Promise<string>;
                json(): Promise<any>;
                buffer(): Promise<Buffer>;
                type: string;
                size: number;
                name: string;
            }>;
        };
        /**
         * The namespace for methods which allow users to select items from a predefined list.
         */
        select: {
            /**
             * Prompts the app user to select a single value from a set of provided values.
             *
             * **Usage:**
             *
             * ```typescript
             * const currency = await io.select.single("Currency", {
             *   options: [
             *     { label: "US Dollar", value: "USD" },
             *     { label: "Canadian Dollar", value: "CAD" },
             *     { label: "Euro", value: "EUR" },
             *   ],
             *   defaultValue: "USD",
             *   helpText: "Currency for this transaction",
             * });
             *
             * const currencyCode = currency.value;
             * ```
             */
            single: <Option extends string | number | boolean | Date | z.objectOutputType<{
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
            }, z.ZodTypeAny, "passthrough">>(label: string, props: {
                disabled?: boolean | undefined;
                helpText?: string | undefined;
                searchable?: boolean | undefined;
                options: Option[];
                defaultValue?: Option | undefined;
            }) => InputIOPromise<"SELECT_SINGLE", {
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
            }, Option>;
            /**
             * Prompts the app user to select a number of values from a set of provided values.
             *
             * **Usage:**
             *
             * ```typescript
             * const condiments = await io.select.multiple("Condiments", {
             *   options: [
             *     { label: "Ketchup", value: 0 },
             *     { label: "Mustard", value: 1 },
             *     { label: "Mayo", value: 2 },
             *   ],
             *   defaultValue: [
             *     { label: "Ketchup", value: 0 },
             *     { label: "Mustard", value: 1 },
             *   ],
             *   helpText: "What goes on it?",
             * });
             *
             * const condimentIds = condiments.map(condiment => condiment.value);
             * ```
             */
            multiple: <Option_1 extends string | number | boolean | Date | z.objectOutputType<{
                label: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodDate]>;
            }, z.ZodTypeAny, "passthrough">>(label: string, props: {
                disabled?: boolean | undefined;
                helpText?: string | undefined;
                minSelections?: number | undefined;
                maxSelections?: number | undefined;
                options: Option_1[];
                defaultValue?: Option_1[] | undefined;
            }) => InputIOPromise<"SELECT_MULTIPLE", {
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
            }, Option_1[]>;
            /**
             * Prompts the app user to select a number of values from an array of tabular data.
             *
             * **Usage:**
             *
             * ```typescript
             * const albums = await io.select.table("Select your favorites", {
             *   data: [
             *     {
             *       album: "Exile on Main Street",
             *       artist: "The Rolling Stones",
             *       year: 1972,
             *     },
             *     {
             *       artist: "Michael Jackson",
             *       album: "Thriller",
             *       year: 1982,
             *     },
             *     {
             *       album: "Enter the Wu-Tang (36 Chambers)",
             *       artist: "Wu-Tang Clan",
             *       year: 1993,
             *     },
             *   ],
             * });
             * ```
             */
            table: <Row extends Record<string, any> = any>(label: string, props: {
                disabled?: boolean | undefined;
                defaultPageSize?: number | undefined;
                helpText?: string | undefined;
                isFilterable?: boolean | undefined;
                totalRecords?: number | undefined;
                isSortable?: boolean | undefined;
                minSelections?: number | undefined;
                maxSelections?: number | undefined;
                selectedKeys?: string[] | undefined;
                data: Row[];
                columns?: (import("../types").TableColumn<Row> | (string & keyof Row))[] | undefined;
                rowMenuItems?: ((row: Row) => import("../types").MenuItem[]) | undefined;
                initiallySelected?: ((row: Row) => boolean) | undefined;
            }) => InputIOPromise<"SELECT_TABLE", {
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
            }, Row[]>;
        };
        /**
         * The namespace for methods that display information to the user. These methods return `null` and can be used inside pages as well as actions.
         */
        display: {
            /**
             * Displays a block of code to the action user.
             *
             * **Usage:**
             *
             * ```typescript
             * await io.display.code("Check out the source code", {
             *   code: 'console.log("Hello world!")',
             *   language: "javascript",
             * });
             * ```
             */
            code: RequiredPropsDisplayIOComponentFunction<"DISPLAY_CODE", {
                code: string;
                language?: string | undefined;
            }, null>;
            /**
             * Displays a heading to the action user.
             *
             * **Usage:**
             *
             * ```typescript
             * await io.display.heading("User created!", {
             *   description: "Updated 5 minutes ago",
             *   menuItems: [
             *     {
             *       label: "Edit user",
             *       action: "edit_user",
             *       params: { userId: 12 },
             *     },
             *   ],
             * });
             * ```
             */
            heading: DisplayIOComponentFunction<"DISPLAY_HEADING", {
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
            }, null>;
            /**
             * Displays rendered markdown to the action user. Accepts GitHub Flavored Markdown.
             *
             * **Usage:**
             *
             * ```typescript
             * await io.display.markdown("**Warning:** This _will_ erase user data.");
             * ```
             */
            markdown: DisplayIOComponentFunction<"DISPLAY_MARKDOWN", {}, null>;
            /**
             * Displays rendered HTML to the action user.
             *
             * **Usage:**
             *
             * ```typescript
             * await io.display.html("Message body", {
             *   html: `<p>Hello, <b>world</b>!<p>`
             * });
             * ```
             */
            html: DisplayIOComponentFunction<"DISPLAY_HTML", {
                html: string;
            }, null>;
            /**
             * Displays an image to the action user.
             *
             * One of `url` or `buffer` must be provided.
             *
             * **Usage:**
             *
             * ```typescript
             * await io.display.image("An animated gif", {
             *   url: "https://media.giphy.com/media/26ybw6AltpBRmyS76/giphy.gif",
             *   alt: "Man makes like he's going to jump on a skateboard but doesn't",
             *   size: "medium",
             * });
             * ```
             */
            image: RequiredPropsDisplayIOComponentFunction<"DISPLAY_IMAGE", {
                alt?: string | undefined;
                width?: "thumbnail" | "small" | "medium" | "large" | undefined;
                height?: "thumbnail" | "small" | "medium" | "large" | undefined;
                size?: "thumbnail" | "small" | "medium" | "large" | undefined;
            } & ({
                url: string;
            } | {
                buffer: Buffer;
            }), null>;
            /**
             * Displays a series of label/value pairs in a variety of layout options.
             *
             * **Usage:**
             *
             * ```typescript
             * await io.display.metadata("User info", {
             *   layout: "card",
             *   data: [
             *     {
             *       label: "Name",
             *       value: `${user.firstName} ${user.lastName}`,
             *     },
             *     {
             *       label: "Email",
             *       value: user.email,
             *       url: `mailto:${user.email}`,
             *     },
             *     {
             *       label: "Friends",
             *       value: user.friends.length,
             *     },
             *   ],
             * });
             * ```
             */
            metadata: RequiredPropsDisplayIOComponentFunction<"DISPLAY_METADATA", Pick<{
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
            }, "layout"> & {
                data: import("../components/displayMetadata").EventualMetaItem[];
            }, null>;
            /**
             * Displays a button-styled action link to the action user. Can link to an external URL or to another action or page.
             *
             * **Usage:**
             *
             * ```typescript
             * await io.display.link("Run another action", {
             *   route: "usefulAction",
             *   theme: "danger",
             * });
             * ```
             */
            link: RequiredPropsDisplayIOComponentFunction<"DISPLAY_LINK", {
                theme?: "default" | "primary" | "secondary" | "danger" | undefined;
            } & ({
                url: string;
            } | {
                route: string;
                params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
            } | {
                action: string;
                params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
            }), null>;
            /**
             * Displays an object of nested arbitrary data to the action user.
             *
             * **Usage:**
             *
             * ```typescript
             * await io.display.object("Example object", {
             *   data: [
             *     {
             *       album: "Exile on Main Street",
             *       artist: "The Rolling Stones",
             *       year: 1972,
             *     },
             *   ],
             * });
             * ```
             */
            object: RequiredPropsDisplayIOComponentFunction<"DISPLAY_OBJECT", {
                data?: object | import("../ioSchema").Literal | {
                    [key: string]: object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | any)[])[])[])[])[])[])[])[])[])[])[];
                } | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | (object | import("../ioSchema").Literal | any | any)[])[])[])[])[])[])[])[])[])[])[];
            }, null>;
            /**
             * Displays tabular data.
             *
             * **Usage:**
             *
             * ```typescript
             * await io.display.table("Albums", {
             *   helpText: "Includes the artist and its year of release.",
             *   data: [
             *     {
             *       album: "Exile on Main Street",
             *       artist: "The Rolling Stones",
             *       year: 1972,
             *     },
             *     {
             *       album: "Thriller",
             *       artist: "Michael Jackson",
             *       year: 1982,
             *     },
             *     {
             *       album: "Enter the Wu-Tang (36 Chambers)",
             *       artist: "Wu-Tang Clan",
             *       year: 1993,
             *     },
             *   ],
             * });
             * ```
             */
            table: <Row_1 extends Record<string, any> = any>(label: string, props: {
                defaultPageSize?: number | undefined;
                helpText?: string | undefined;
                isFilterable?: boolean | undefined;
                orientation?: "vertical" | "horizontal" | undefined;
                isSortable?: boolean | undefined;
                columns?: (import("../types").TableColumn<Row_1> | (string & keyof Row_1))[] | undefined;
                rowMenuItems?: ((row: Row_1) => import("../types").MenuItem[]) | undefined;
                data: Row_1[];
            } | {
                defaultPageSize?: number | undefined;
                helpText?: string | undefined;
                isFilterable?: boolean | undefined;
                orientation?: "vertical" | "horizontal" | undefined;
                isSortable?: boolean | undefined;
                columns?: (import("../types").TableColumn<Row_1> | (string & keyof Row_1))[] | undefined;
                rowMenuItems?: ((row: Row_1) => import("../types").MenuItem[]) | undefined;
                getData: import("../utils/table").TableDataFetcher<Row_1>;
            }) => DisplayIOPromise<"DISPLAY_TABLE", {
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
            }, null>;
            /**
             * Displays data in a grid layout.
             *
             * Grid items can include a label, description, image, and options menu, and can optionally link to another page, action, or external URL.
             *
             * Grid item size can be controlled using the idealColumnWidth property. Interval will calculate a column width that is as close as possible to that number while factoring in gutter size and window width.
             *
             * Images default to a 16:9 aspect ratio with `object-fit` set to cover, and can be customized via the `image.aspectRatio` and `image.fit` properties respectively in the renderItem callback.
             *
             * **Usage:**
             *
             * ```typescript
             * await io.display.grid("Albums", {
             *   idealColumnWidth: 180,
             *   data: [
             *     {
             *       album: "Exile on Main Street",
             *       artist: "The Rolling Stones",
             *       imageUrl:
             *         "https://upload.wikimedia.org/wikipedia/en/c/ca/ExileMainSt.jpg",
             *       spotifyId: "1D0PTM0bg7skufClSUOxTP",
             *     },
             *     {
             *       album: "Thriller",
             *       artist: "Michael Jackson",
             *       imageUrl:
             *         "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png",
             *       spotifyId: "2ANVost0y2y52ema1E9xAZ",
             *     },
             *     {
             *       album: "Enter the Wu-Tang (36 Chambers)",
             *       artist: "Wu-Tang Clan",
             *       imageUrl:
             *         "https://upload.wikimedia.org/wikipedia/en/5/53/Wu-TangClanEntertheWu-Tangalbumcover.jpg",
             *       spotifyId: "6acGx168JViE5LLFR1rGRE",
             *     },
             *   ],
             *   renderItem: row => ({
             *     label: row.album,
             *     description: row.artist,
             *     image: {
             *       url: row.imageUrl,
             *       aspectRatio: 1,
             *     },
             *   }),
             * });
             * ```
             */
            grid: <Row_2 = any>(label: string, props: {
                idealColumnWidth?: number | undefined;
                defaultPageSize?: number | undefined;
                helpText?: string | undefined;
                isFilterable?: boolean | undefined;
                renderItem: (row: Row_2) => {
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
                } & {
                    title?: string | null | undefined;
                };
                data: Row_2[];
            } | {
                idealColumnWidth?: number | undefined;
                defaultPageSize?: number | undefined;
                helpText?: string | undefined;
                isFilterable?: boolean | undefined;
                renderItem: (row: Row_2) => {
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
                } & {
                    title?: string | null | undefined;
                };
                getData: import("../utils/grid").GridDataFetcher<Row_2>;
            }) => DisplayIOPromise<"DISPLAY_GRID", {
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
            }, null>;
            /**
             * Displays a video to the action user. One of url or buffer must be provided.
             *
             * **Usage:**
             *
             * ```typescript
             * await io.display.video("A video", {
             *   url: "https://upload.wikimedia.org/wikipedia/commons/a/ad/The_Kid_scenes.ogv",
             *   size: "medium",
             *   muted: true,
             * });
             * ```
             */
            video: RequiredPropsDisplayIOComponentFunction<"DISPLAY_VIDEO", {
                width?: "thumbnail" | "small" | "medium" | "large" | undefined;
                height?: "thumbnail" | "small" | "medium" | "large" | undefined;
                size?: "thumbnail" | "small" | "medium" | "large" | undefined;
                muted?: boolean | undefined;
                loop?: boolean | undefined;
            } & ({
                url: string;
            } | {
                buffer: Buffer;
            }), null>;
        };
        experimental: {
            spreadsheet: <Columns extends Record<string, "string" | "number" | "boolean" | "string?" | "number?" | "boolean?">>(label: string, props: {
                helpText?: string | undefined;
                columns: Columns;
                defaultValue?: { [key in keyof Columns]: z.TypeOf<{
                    number: z.ZodNumber;
                    'number?': z.ZodNullable<z.ZodNumber>;
                    string: z.ZodString;
                    'string?': z.ZodNullable<z.ZodString>;
                    boolean: z.ZodBoolean;
                    'boolean?': z.ZodNullable<z.ZodBoolean>;
                }[Columns[key]]>; }[] | undefined;
            }) => InputIOPromise<"INPUT_SPREADSHEET", {
                columns: Record<string, "string" | "number" | "boolean" | "string?" | "number?" | "boolean?">;
                defaultValue?: Record<string, string | number | boolean | null | undefined>[] | null | undefined;
                helpText?: string | undefined;
            }, { [key_1 in keyof Columns]: z.TypeOf<{
                number: z.ZodNumber;
                'number?': z.ZodNullable<z.ZodNumber>;
                string: z.ZodString;
                'string?': z.ZodNullable<z.ZodString>;
                boolean: z.ZodBoolean;
                'boolean?': z.ZodNullable<z.ZodBoolean>;
            }[Columns[key_1]]>; }[]>;
            /**
             * Requests OAuth credentials from a third-party service.
             *
             * **Usage:**
             *
             * ```typescript
             * const { token } = await io.credentials('github');
             * ```
             */
            credentials: (serviceName: string, props?: {
                params?: Record<string, string> | undefined;
            } | undefined) => ExclusiveIOPromise<"CREDENTIALS", {
                params?: Record<string, string> | undefined;
            }, {
                token: string;
                secret?: string | undefined;
            }>;
        };
    };
    onResponse(result: T_IO_RESPONSE): void;
}
export {};
