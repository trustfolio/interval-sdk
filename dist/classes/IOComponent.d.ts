import { z } from 'zod';
import { Evt } from 'evt';
import { ioSchema, T_IO_DISPLAY_METHOD_NAMES, T_IO_METHOD_NAMES, T_IO_PROPS, T_IO_RETURNS, T_IO_STATE } from '../ioSchema';
import { IOPromiseValidator } from './IOPromise';
type IoSchema = typeof ioSchema;
export interface ComponentInstance<MN extends keyof IoSchema> {
    methodName: MN;
    label: string;
    props?: T_IO_PROPS<MN>;
    state: T_IO_STATE<MN>;
    isStateful?: boolean;
    isOptional?: boolean;
    isMultiple?: boolean;
    validationErrorMessage?: string | undefined;
    multipleProps?: {
        defaultValue?: T_IO_RETURNS<MN>[] | null;
    };
}
export type ComponentRenderInfo<MN extends keyof IoSchema> = Omit<ComponentInstance<MN>, 'state'>;
export type ComponentReturnValue<MN extends keyof IoSchema> = T_IO_RETURNS<MN>;
export type MaybeMultipleComponentReturnValue<MN extends keyof IoSchema> = T_IO_RETURNS<MN> | T_IO_RETURNS<MN>[];
export type IOComponentMap = {
    [MethodName in T_IO_METHOD_NAMES]: IOComponent<MethodName>;
};
export type AnyIOComponent = IOComponentMap[keyof IoSchema];
export type DisplayComponentMap = {
    [MethodName in T_IO_DISPLAY_METHOD_NAMES]: IOComponent<MethodName>;
};
export type AnyDisplayComponent = DisplayComponentMap[T_IO_DISPLAY_METHOD_NAMES];
/**
 * The internal model underlying each IOPromise, responsible for constructing
 * the data transmitted to Interval for an IO component, and handling responses
 * received from Interval.
 */
export default class IOComponent<MethodName extends T_IO_METHOD_NAMES> {
    schema: IoSchema[MethodName];
    instance: ComponentInstance<MethodName>;
    resolver: ((v: MaybeMultipleComponentReturnValue<MethodName> | undefined) => void) | undefined;
    returnValue: Promise<MaybeMultipleComponentReturnValue<MethodName> | undefined>;
    onStateChangeHandler: (() => void) | undefined;
    handleStateChange: ((incomingState: z.infer<IoSchema[MethodName]['state']>) => Promise<Partial<z.input<IoSchema[MethodName]['props']>>>) | undefined;
    onPropsUpdate: (() => T_IO_PROPS<MethodName>) | undefined;
    validator: IOPromiseValidator<MaybeMultipleComponentReturnValue<MethodName> | undefined> | undefined;
    resolvesImmediately: boolean;
    /**
     * @param options.methodName - The component's method name from ioSchema, used
     * to determine the valid types for communication with Interval.
     * @param options.label - The UI label to be displayed to the action runner.
     * @param options.initialProps - The properties send to Interval for the initial
     * render call.
     * @param options.handleStateChange - A handler that converts new state received
     * from Interval into a new set of props.
     * @param options.isOptional - If true, the input can be omitted by the action
     * runner, in which case the component will accept and return `undefined`.
     */
    constructor({ methodName, label, initialProps, onStateChange, isOptional, isMultiple, validator, multipleProps, displayResolvesImmediately, onPropsUpdate, }: {
        methodName: MethodName;
        label: string;
        initialProps?: T_IO_PROPS<MethodName>;
        onStateChange?: (incomingState: T_IO_STATE<MethodName>) => Promise<Partial<T_IO_PROPS<MethodName>>>;
        isOptional?: boolean;
        isMultiple?: boolean;
        validator?: IOPromiseValidator<MaybeMultipleComponentReturnValue<MethodName> | undefined>;
        multipleProps?: {
            defaultValue?: T_IO_RETURNS<MethodName>[] | null;
        };
        displayResolvesImmediately?: boolean;
        onPropsUpdate?: Evt<T_IO_PROPS<MethodName>>;
    });
    handleValidation(returnValue: MaybeMultipleComponentReturnValue<MethodName> | undefined): Promise<string | undefined>;
    setReturnValue(value: z.input<IoSchema[MethodName]['returns']>): void;
    setState(newState: z.infer<IoSchema[MethodName]['state']>): Promise<ComponentInstance<MethodName>>;
    setProps(newProps: z.input<IoSchema[MethodName]['props']>): void;
    getInstance(): ComponentInstance<MethodName>;
    get label(): string;
    onStateChange(handler: () => void): void;
    getRenderInfo(): ComponentRenderInfo<MethodName>;
}
export {};
