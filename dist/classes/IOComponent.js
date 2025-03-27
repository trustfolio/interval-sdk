"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const ioSchema_1 = require("../ioSchema");
const deserialize_1 = require("../utils/deserialize");
const IOError_1 = __importDefault(require("./IOError"));
/**
 * The internal model underlying each IOPromise, responsible for constructing
 * the data transmitted to Interval for an IO component, and handling responses
 * received from Interval.
 */
class IOComponent {
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
    constructor({ methodName, label, initialProps, onStateChange, isOptional = false, isMultiple = false, validator, multipleProps, displayResolvesImmediately, onPropsUpdate, }) {
        this.resolvesImmediately = false;
        this.handleStateChange = onStateChange;
        this.schema = ioSchema_1.ioSchema[methodName];
        this.validator = validator;
        if (onPropsUpdate) {
            onPropsUpdate.attach(this.setProps.bind(this));
        }
        try {
            initialProps = this.schema.props.parse(initialProps !== null && initialProps !== void 0 ? initialProps : {});
        }
        catch (err) {
            console.error(`[Interval] Invalid props found for IO call with label "${label}":`);
            console.error(err);
            throw err;
        }
        this.instance = {
            methodName,
            label,
            props: initialProps,
            state: null,
            isStateful: !!onStateChange,
            isOptional: isOptional,
            isMultiple: isMultiple,
            multipleProps,
        };
        this.returnValue = new Promise(resolve => {
            this.resolver = resolve;
        });
        this.resolvesImmediately = (0, ioSchema_1.resolvesImmediately)(methodName, {
            displayResolvesImmediately,
        });
    }
    async handleValidation(returnValue) {
        if (this.validator) {
            const message = await this.validator(returnValue);
            this.instance.validationErrorMessage = message;
            return message;
        }
    }
    setReturnValue(value) {
        let requiredReturnSchema = this.schema.returns;
        if (this.instance.isMultiple) {
            requiredReturnSchema = zod_1.z.array(requiredReturnSchema);
        }
        const returnSchema = this.instance.isOptional
            ? requiredReturnSchema
                .nullable()
                .optional()
                // JSON.stringify turns undefined into null in arrays
                .transform(value => value !== null && value !== void 0 ? value : undefined)
            : requiredReturnSchema;
        try {
            let parsed;
            if (value && typeof value === 'object') {
                // TODO: Remove this when all active SDKs support superjson
                if (Array.isArray(value)) {
                    parsed = returnSchema.parse(value.map(v => typeof v === 'object' && !Array.isArray(v)
                        ? (0, deserialize_1.deserializeDates)(v)
                        : v));
                }
                else {
                    parsed = returnSchema.parse((0, deserialize_1.deserializeDates)(value));
                }
            }
            else {
                parsed = returnSchema.parse(value);
            }
            if (this.resolver) {
                this.resolver(parsed);
            }
        }
        catch (err) {
            const ioError = new IOError_1.default('BAD_RESPONSE', 'Received invalid return value', { cause: err });
            throw ioError;
        }
    }
    async setState(newState) {
        try {
            const parsedState = this.schema.state.parse(newState);
            if (this.handleStateChange) {
                this.instance.props = {
                    ...this.instance.props,
                    ...(await this.handleStateChange(parsedState)),
                };
            }
            this.instance.state = parsedState;
            if (parsedState !== null && !this.handleStateChange) {
                console.warn('Received non-null state, but no method was defined to handle.');
            }
            this.onStateChangeHandler && this.onStateChangeHandler();
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                const ioError = new IOError_1.default('BAD_RESPONSE', 'Received invalid state');
                ioError.cause = err;
                throw ioError;
            }
            else {
                const ioError = new IOError_1.default('RESPONSE_HANDLER_ERROR', 'Error in state change handler');
                ioError.cause = err;
                throw ioError;
            }
        }
        return this.instance;
    }
    setProps(newProps) {
        this.instance.props = newProps;
        this.onStateChangeHandler && this.onStateChangeHandler();
    }
    getInstance() {
        return this.instance;
    }
    get label() {
        return this.instance.label;
    }
    onStateChange(handler) {
        this.onStateChangeHandler = handler;
    }
    getRenderInfo() {
        return {
            methodName: this.instance.methodName,
            label: this.instance.label,
            props: this.instance.props,
            isStateful: this.instance.isStateful,
            isOptional: this.instance.isOptional,
            isMultiple: this.instance.isMultiple,
            validationErrorMessage: this.instance.validationErrorMessage,
            multipleProps: this.instance.multipleProps,
        };
    }
}
exports.default = IOComponent;
