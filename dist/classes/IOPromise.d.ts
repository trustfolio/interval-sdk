import type { Evt } from 'evt';
import { T_IO_DISPLAY_METHOD_NAMES, T_IO_INPUT_METHOD_NAMES, T_IO_METHOD_NAMES, T_IO_MULTIPLEABLE_METHOD_NAMES, T_IO_PROPS, T_IO_RETURNS, T_IO_STATE } from '../ioSchema';
import IOComponent, { AnyIOComponent, ComponentReturnValue, MaybeMultipleComponentReturnValue } from './IOComponent';
import IOError from './IOError';
import { ComponentRenderer, ComponentsRenderer, GroupIOPromise, MaybeOptionalGroupIOPromise, OptionalGroupIOPromise, ButtonConfig, ChoiceButtonConfig, ChoiceButtonConfigOrShorthand, ComponentsRendererReturn } from '../types';
import { IOClientRenderReturnValues } from './IOClient';
interface IOPromiseProps<MethodName extends T_IO_METHOD_NAMES, Props extends T_IO_PROPS<MethodName> = T_IO_PROPS<MethodName>, ComponentOutput = ComponentReturnValue<MethodName>> {
    renderer: ComponentRenderer<MethodName>;
    methodName: MethodName;
    label: string;
    props: Props;
    onPropsUpdate?: Evt<T_IO_PROPS<MethodName>>;
    valueGetter?: (response: ComponentReturnValue<MethodName>) => ComponentOutput;
    onStateChange?: (incomingState: T_IO_STATE<MethodName>) => Promise<Partial<Props>>;
    validator?: IOPromiseValidator<ComponentOutput> | undefined;
    displayResolvesImmediately?: boolean;
}
/**
 * A custom wrapper class that handles creating the underlying component
 * model when the IO call is to be rendered, and optionally transforming
 * the value received from Interval to a custom component return type.
 *
 * Can be `await`ed, which renders its own component by itself,
 * or rendered as a group along with other IOPromises.
 */
export declare class IOPromise<MethodName extends T_IO_METHOD_NAMES, Props extends T_IO_PROPS<MethodName> = T_IO_PROPS<MethodName>, ComponentOutput = ComponentReturnValue<MethodName>> {
    methodName: MethodName;
    renderer: ComponentRenderer<MethodName>;
    protected label: string;
    protected props: Props;
    protected valueGetter: ((response: ComponentReturnValue<MethodName>) => ComponentOutput) | undefined;
    protected onStateChange: ((incomingState: T_IO_STATE<MethodName>) => Promise<Partial<Props>>) | undefined;
    validator: IOPromiseValidator<ComponentOutput> | undefined;
    protected displayResolvesImmediately: boolean | undefined;
    protected onPropsUpdate: Evt<T_IO_PROPS<MethodName>> | undefined;
    constructor({ renderer, methodName, label, props, valueGetter, onStateChange, validator, displayResolvesImmediately, onPropsUpdate, }: IOPromiseProps<MethodName, Props, ComponentOutput>);
    then(resolve: (output: ComponentOutput) => void, reject?: (err: IOError) => void): void;
    getValue(result: ComponentReturnValue<MethodName>): ComponentOutput;
    get component(): IOComponent<MethodName>;
}
/**
 * A thin subtype of IOPromise that does nothing but mark the component
 * as "display" for display-only components.
 */
export declare class DisplayIOPromise<MethodName extends T_IO_DISPLAY_METHOD_NAMES, Props extends T_IO_PROPS<MethodName> = T_IO_PROPS<MethodName>, ComponentOutput = ComponentReturnValue<MethodName>> extends IOPromise<MethodName, Props, ComponentOutput> {
    withChoices<Choice extends string>(choiceButtons: ChoiceButtonConfigOrShorthand<Choice>[]): WithChoicesIOPromise<MethodName, Props, ComponentOutput, typeof this, Choice>;
}
export declare class InputIOPromise<MethodName extends T_IO_INPUT_METHOD_NAMES, Props extends T_IO_PROPS<MethodName> = T_IO_PROPS<MethodName>, ComponentOutput = ComponentReturnValue<MethodName>> extends IOPromise<MethodName, Props, ComponentOutput> {
    get component(): IOComponent<MethodName>;
    handleValidation(returnValue: MaybeMultipleComponentReturnValue<MethodName> | undefined): Promise<string | undefined>;
    validate(validator: IOPromiseValidator<ComponentOutput>): this;
    optional(isOptional?: true): OptionalIOPromise<MethodName, Props, ComponentOutput>;
    optional(isOptional?: false): InputIOPromise<MethodName, Props, ComponentOutput>;
    optional(isOptional?: boolean): OptionalIOPromise<MethodName, Props, ComponentOutput> | InputIOPromise<MethodName, Props, ComponentOutput>;
    withChoices<Choice extends string>(choiceButtons: ChoiceButtonConfigOrShorthand<Choice>[]): WithChoicesIOPromise<MethodName, Props, ComponentOutput, typeof this, Choice>;
}
/**
 * A thin subclass of IOPromise that marks its inner component as
 * "optional" and returns `undefined` if not provided by the action runner.
 */
export declare class OptionalIOPromise<MethodName extends T_IO_INPUT_METHOD_NAMES, Props extends T_IO_PROPS<MethodName> = T_IO_PROPS<MethodName>, ComponentOutput = ComponentReturnValue<MethodName>> extends InputIOPromise<MethodName, Props, ComponentOutput | undefined> {
    then(resolve: (output: ComponentOutput | undefined) => void, reject?: (err: IOError) => void): void;
    get component(): IOComponent<MethodName>;
    handleValidation(returnValue: MaybeMultipleComponentReturnValue<MethodName> | undefined): Promise<string | undefined>;
    getValue(result: ComponentReturnValue<MethodName> | undefined): ComponentOutput | undefined;
}
export declare class MultipleableIOPromise<MethodName extends T_IO_MULTIPLEABLE_METHOD_NAMES, Props extends T_IO_PROPS<MethodName> = T_IO_PROPS<MethodName>, ComponentOutput = ComponentReturnValue<MethodName>, DefaultValue = T_IO_PROPS<MethodName> extends {
    defaultValue?: any;
} ? ComponentOutput | null : never> extends InputIOPromise<MethodName, Props, ComponentOutput> {
    defaultValueGetter: ((defaultValue: DefaultValue) => T_IO_RETURNS<MethodName>) | undefined;
    constructor({ defaultValueGetter, ...props }: {
        renderer: ComponentRenderer<MethodName>;
        methodName: MethodName;
        label: string;
        props: Props;
        valueGetter?: (response: ComponentReturnValue<MethodName>) => ComponentOutput;
        defaultValueGetter?: (defaultValue: DefaultValue) => T_IO_RETURNS<MethodName>;
        onStateChange?: (incomingState: T_IO_STATE<MethodName>) => Promise<Partial<Props>>;
        validator?: IOPromiseValidator<ComponentOutput> | undefined;
        displayResolvesImmediately?: boolean;
        onPropsUpdate?: Evt<T_IO_PROPS<MethodName>>;
    });
    multiple({ defaultValue, }?: {
        defaultValue?: DefaultValue[] | null;
    }): MultipleIOPromise<MethodName, Props, ComponentOutput>;
    withChoices<Choice extends string>(choices: ChoiceButtonConfigOrShorthand<Choice>[]): WithChoicesIOPromise<MethodName, Props, ComponentOutput, typeof this, Choice>;
}
export declare class MultipleIOPromise<MethodName extends T_IO_MULTIPLEABLE_METHOD_NAMES, Props extends T_IO_PROPS<MethodName> = T_IO_PROPS<MethodName>, ComponentOutput = ComponentReturnValue<MethodName>> extends InputIOPromise<MethodName, Props, ComponentOutput[]> {
    getSingleValue: ((response: ComponentReturnValue<MethodName>) => ComponentOutput) | undefined;
    defaultValue: T_IO_RETURNS<MethodName>[] | undefined | null;
    constructor({ defaultValue, valueGetter, ...rest }: {
        defaultValue?: T_IO_RETURNS<MethodName>[] | null;
        renderer: ComponentRenderer<MethodName>;
        methodName: MethodName;
        label: string;
        props: Props;
        valueGetter?: (response: ComponentReturnValue<MethodName>) => ComponentOutput;
        onStateChange?: (incomingState: T_IO_STATE<MethodName>) => Promise<Partial<Props>>;
        validator?: IOPromiseValidator<ComponentOutput[]> | undefined;
        onPropsUpdate?: Evt<T_IO_PROPS<MethodName>>;
    });
    then(resolve: (output: ComponentOutput[]) => void, reject?: (err: IOError) => void): void;
    validate(validator: IOPromiseValidator<ComponentOutput[]>): this;
    getValue(results: MaybeMultipleComponentReturnValue<MethodName>): ComponentOutput[];
    handleValidation(returnValues: MaybeMultipleComponentReturnValue<MethodName> | undefined): Promise<string | undefined>;
    get component(): IOComponent<MethodName>;
    optional(isOptional?: true): OptionalMultipleIOPromise<MethodName, Props, ComponentOutput>;
    optional(isOptional?: false): MultipleIOPromise<MethodName, Props, ComponentOutput>;
    optional(isOptional?: boolean): OptionalMultipleIOPromise<MethodName, Props, ComponentOutput> | MultipleIOPromise<MethodName, Props, ComponentOutput>;
}
export declare class OptionalMultipleIOPromise<MethodName extends T_IO_MULTIPLEABLE_METHOD_NAMES, Props extends T_IO_PROPS<MethodName> = T_IO_PROPS<MethodName>, ComponentOutput = ComponentReturnValue<MethodName>> extends OptionalIOPromise<MethodName, Props, ComponentOutput[]> {
    getSingleValue: ((response: ComponentReturnValue<MethodName>) => ComponentOutput) | undefined;
    defaultValue: T_IO_RETURNS<MethodName>[] | undefined | null;
    constructor({ defaultValue, valueGetter, ...rest }: {
        defaultValue?: T_IO_RETURNS<MethodName>[] | null;
        renderer: ComponentRenderer<MethodName>;
        methodName: MethodName;
        label: string;
        props: Props;
        valueGetter?: (response: ComponentReturnValue<MethodName>) => ComponentOutput;
        onStateChange?: (incomingState: T_IO_STATE<MethodName>) => Promise<Partial<Props>>;
        validator?: IOPromiseValidator<ComponentOutput[] | undefined> | undefined;
        onPropsUpdate?: Evt<T_IO_PROPS<MethodName>>;
    });
    then(resolve: (output: ComponentOutput[] | undefined) => void, reject?: (err: IOError) => void): void;
    validate(validator: IOPromiseValidator<ComponentOutput[] | undefined>): this;
    getValue(results: MaybeMultipleComponentReturnValue<MethodName> | undefined): ComponentOutput[] | undefined;
    handleValidation(returnValues: MaybeMultipleComponentReturnValue<MethodName> | undefined): Promise<string | undefined>;
    get component(): IOComponent<MethodName>;
}
export declare class WithChoicesIOPromise<MethodName extends T_IO_METHOD_NAMES, Props extends T_IO_PROPS<MethodName> = T_IO_PROPS<MethodName>, ComponentOutput = ComponentReturnValue<MethodName>, InnerPromise extends IOPromise<MethodName, Props, ComponentOutput> = IOPromise<MethodName, Props, ComponentOutput>, Choice extends string = string> {
    #private;
    innerPromise: InnerPromise;
    choiceButtons: ChoiceButtonConfig[];
    constructor({ innerPromise, choiceButtons, }: {
        innerPromise: InnerPromise;
        choiceButtons: ChoiceButtonConfigOrShorthand<Choice>[];
    });
    then(resolve: (output: {
        choice: Choice;
        returnValue: ComponentOutput;
    }) => void, reject?: (err: IOError) => void): void;
    get getValue(): (result: ComponentReturnValue<MethodName>) => ComponentOutput;
    get component(): IOComponent<MethodName>;
    validate(validator: WithChoicesIOPromiseValidator<Choice, ComponentOutput>): this;
    handleValidation(returnValues: IOClientRenderReturnValues<[
        AnyIOComponent,
        ...AnyIOComponent[]
    ]>): Promise<string | undefined>;
    optional<MethodName extends T_IO_INPUT_METHOD_NAMES, Props extends T_IO_PROPS<MethodName>, ComponentOutput = ComponentReturnValue<MethodName>>(this: WithChoicesIOPromise<MethodName, Props, ComponentOutput, InputIOPromise<MethodName, Props, ComponentOutput>, Choice>, isOptional?: true): WithChoicesIOPromise<MethodName, Props, ComponentOutput | undefined, OptionalIOPromise<MethodName, Props, ComponentOutput>, Choice>;
    optional<MethodName extends T_IO_INPUT_METHOD_NAMES, Props extends T_IO_PROPS<MethodName>, ComponentOutput = ComponentReturnValue<MethodName>>(this: WithChoicesIOPromise<MethodName, Props, ComponentOutput, InputIOPromise<MethodName, Props, ComponentOutput>, Choice>, isOptional?: false): WithChoicesIOPromise<MethodName, Props, ComponentOutput, InputIOPromise<MethodName, Props, ComponentOutput>, Choice>;
    optional<MethodName extends T_IO_INPUT_METHOD_NAMES, Props extends T_IO_PROPS<MethodName>, ComponentOutput = ComponentReturnValue<MethodName>>(this: WithChoicesIOPromise<MethodName, Props, ComponentOutput, InputIOPromise<MethodName, Props, ComponentOutput>, Choice>, isOptional?: boolean): WithChoicesIOPromise<MethodName, Props, ComponentOutput | undefined, OptionalIOPromise<MethodName, Props, ComponentOutput>, Choice> | WithChoicesIOPromise<MethodName, Props, ComponentOutput, InputIOPromise<MethodName, Props, ComponentOutput>, Choice>;
    optional<MethodName extends T_IO_MULTIPLEABLE_METHOD_NAMES, Props extends T_IO_PROPS<MethodName>, ComponentOutput = ComponentReturnValue<MethodName>>(this: WithChoicesIOPromise<MethodName, Props, ComponentOutput[], MultipleIOPromise<MethodName, Props, ComponentOutput>, Choice>, isOptional?: true): WithChoicesIOPromise<MethodName, Props, ComponentOutput[] | undefined, OptionalMultipleIOPromise<MethodName, Props, ComponentOutput>, Choice>;
    optional<MethodName extends T_IO_MULTIPLEABLE_METHOD_NAMES, Props extends T_IO_PROPS<MethodName>, ComponentOutput = ComponentReturnValue<MethodName>>(this: WithChoicesIOPromise<MethodName, Props, ComponentOutput[], MultipleIOPromise<MethodName, Props, ComponentOutput>, Choice>, isOptional?: false): WithChoicesIOPromise<MethodName, Props, ComponentOutput[], MultipleIOPromise<MethodName, Props, ComponentOutput>, Choice>;
    optional<MethodName extends T_IO_MULTIPLEABLE_METHOD_NAMES, Props extends T_IO_PROPS<MethodName>, ComponentOutput = ComponentReturnValue<MethodName>>(this: WithChoicesIOPromise<MethodName, Props, ComponentOutput[], MultipleIOPromise<MethodName, Props, ComponentOutput>, Choice>, isOptional?: boolean): WithChoicesIOPromise<MethodName, Props, ComponentOutput[] | undefined, OptionalMultipleIOPromise<MethodName, Props, ComponentOutput>, Choice> | WithChoicesIOPromise<MethodName, Props, ComponentOutput[], MultipleIOPromise<MethodName, Props, ComponentOutput>, Choice>;
    multiple<MethodName extends T_IO_MULTIPLEABLE_METHOD_NAMES, Props extends T_IO_PROPS<MethodName>, ComponentOutput = ComponentReturnValue<MethodName>, DefaultValue = T_IO_PROPS<MethodName> extends {
        defaultValue?: any;
    } ? ComponentOutput | null : never>(this: WithChoicesIOPromise<MethodName, Props, ComponentOutput, MultipleableIOPromise<MethodName, Props, ComponentOutput, DefaultValue>, Choice>, { defaultValue, }?: {
        defaultValue?: DefaultValue[] | null;
    }): WithChoicesIOPromise<MethodName, Props, ComponentOutput[], MultipleIOPromise<MethodName, Props, ComponentOutput>, Choice>;
    withChoices<Choice extends string>(choices: ChoiceButtonConfigOrShorthand<Choice>[]): WithChoicesIOPromise<MethodName, Props, ComponentOutput, InnerPromise, Choice>;
}
/**
 * A thin subclass of IOPromise that does nothing but mark the component
 * as "exclusive" for components that cannot be rendered in a group.
 * Also cannot be optional at this time.
 */
export declare class ExclusiveIOPromise<MethodName extends T_IO_INPUT_METHOD_NAMES, Props extends T_IO_PROPS<MethodName> = T_IO_PROPS<MethodName>, ComponentOutput = ComponentReturnValue<MethodName>> extends IOPromise<MethodName, Props, ComponentOutput> {
    get component(): IOComponent<MethodName>;
    handleValidation(returnValue: MaybeMultipleComponentReturnValue<MethodName> | undefined): Promise<string | undefined>;
    validate(validator: IOPromiseValidator<ComponentOutput>): this;
}
export type IOGroupReturnValues<IOPromises extends Record<string, MaybeOptionalGroupIOPromise> | [MaybeOptionalGroupIOPromise, ...MaybeOptionalGroupIOPromise[]]> = {
    [Idx in keyof IOPromises]: IOPromises[Idx] extends GroupIOPromise | OptionalGroupIOPromise ? ReturnType<IOPromises[Idx]['getValue']> : IOPromises[Idx];
};
export type IOGroupComponents<IOPromises extends [
    MaybeOptionalGroupIOPromise,
    ...MaybeOptionalGroupIOPromise[]
]> = {
    [Idx in keyof IOPromises]: IOPromises[Idx] extends GroupIOPromise | OptionalGroupIOPromise ? IOPromises[Idx]['component'] : IOPromises[Idx];
};
export type IOPromiseValidator<ComponentOutput> = (returnValue: ComponentOutput) => string | undefined | Promise<string | undefined>;
export type WithChoicesIOPromiseValidator<Choice extends string, ComponentOutput> = (props: {
    choice: Choice;
    returnValue: ComponentOutput;
}) => string | undefined | Promise<string | undefined>;
export declare class IOGroupPromise<IOPromises extends Record<string, MaybeOptionalGroupIOPromise> | MaybeOptionalGroupIOPromise[], ReturnValues = IOPromises extends Record<string, MaybeOptionalGroupIOPromise> ? {
    [K in keyof IOPromises]: ReturnType<IOPromises[K]['getValue']>;
} : IOPromises extends [
    MaybeOptionalGroupIOPromise,
    ...MaybeOptionalGroupIOPromise[]
] ? IOGroupReturnValues<IOPromises> : unknown[]> {
    #private;
    promises: IOPromises;
    renderer: ComponentsRenderer;
    validator: IOPromiseValidator<ReturnValues> | undefined;
    constructor(config: {
        promises: IOPromises;
        renderer: ComponentsRenderer;
        /** @deprecated Please use the chained .withSubmit() method instead. */
        continueButton?: ButtonConfig;
    });
    get components(): [AnyIOComponent, ...AnyIOComponent[]];
    get promiseValues(): MaybeOptionalGroupIOPromise[];
    then(resolve: (output: ReturnValues) => void, reject?: (err: IOError) => void): void;
    getValues({ returnValue, }: ComponentsRendererReturn<[
        AnyIOComponent,
        ...AnyIOComponent[]
    ]>): ReturnValues;
    validate(validator: IOPromiseValidator<ReturnValues> | undefined): this;
    handleValidation(returnValues: IOClientRenderReturnValues<[
        AnyIOComponent,
        ...AnyIOComponent[]
    ]>): Promise<string | undefined>;
    withChoices<Choice extends string>(choices: ChoiceButtonConfigOrShorthand<Choice>[]): WithChoicesIOGroupPromise<IOPromises, ReturnValues, typeof this, Choice>;
}
export declare class WithChoicesIOGroupPromise<IOPromises extends Record<string, MaybeOptionalGroupIOPromise> | MaybeOptionalGroupIOPromise[], ReturnValues = IOPromises extends Record<string, MaybeOptionalGroupIOPromise> ? {
    [K in keyof IOPromises]: ReturnType<IOPromises[K]['getValue']>;
} : IOPromises extends [
    MaybeOptionalGroupIOPromise,
    ...MaybeOptionalGroupIOPromise[]
] ? IOGroupReturnValues<IOPromises> : unknown[], InnerPromise extends IOGroupPromise<IOPromises, ReturnValues> = IOGroupPromise<IOPromises, ReturnValues>, Choice extends string = string> {
    #private;
    validator: WithChoicesIOPromiseValidator<Choice, ReturnValues> | undefined;
    constructor(config: {
        innerPromise: InnerPromise;
        choiceButtons?: ChoiceButtonConfigOrShorthand<Choice>[];
        validator?: IOPromiseValidator<ReturnValues>;
    });
    then(resolve: (output: {
        choice: Choice;
        returnValue: ReturnValues;
    }) => void, reject?: (err: IOError) => void): void;
    validate(validator: WithChoicesIOPromiseValidator<Choice, ReturnValues> | undefined): this;
    handleValidation(returnValues: IOClientRenderReturnValues<[
        AnyIOComponent,
        ...AnyIOComponent[]
    ]>): Promise<string | undefined>;
    withChoices<Choice extends string>(choices: ChoiceButtonConfigOrShorthand<Choice>[]): WithChoicesIOGroupPromise<IOPromises, ReturnValues, InnerPromise, Choice>;
}
export {};
