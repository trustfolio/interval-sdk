"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _WithChoicesIOPromise_validator, _IOGroupPromise_choiceButtons, _WithChoicesIOGroupPromise_innerPromise, _WithChoicesIOGroupPromise_choiceButtons;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithChoicesIOGroupPromise = exports.IOGroupPromise = exports.ExclusiveIOPromise = exports.WithChoicesIOPromise = exports.OptionalMultipleIOPromise = exports.MultipleIOPromise = exports.MultipleableIOPromise = exports.OptionalIOPromise = exports.InputIOPromise = exports.DisplayIOPromise = exports.IOPromise = void 0;
const ioSchema_1 = require("../ioSchema");
const IOComponent_1 = __importDefault(require("./IOComponent"));
const IOError_1 = __importDefault(require("./IOError"));
const zod_1 = require("zod");
const IntervalError_1 = __importDefault(require("./IntervalError"));
/**
 * A custom wrapper class that handles creating the underlying component
 * model when the IO call is to be rendered, and optionally transforming
 * the value received from Interval to a custom component return type.
 *
 * Can be `await`ed, which renders its own component by itself,
 * or rendered as a group along with other IOPromises.
 */
class IOPromise {
    constructor({ renderer, methodName, label, props, valueGetter, onStateChange, validator, displayResolvesImmediately, onPropsUpdate, }) {
        this.renderer = renderer;
        this.methodName = methodName;
        this.label = label;
        this.props = props;
        this.valueGetter = valueGetter;
        this.onStateChange = onStateChange;
        this.validator = validator;
        this.displayResolvesImmediately = displayResolvesImmediately;
        this.onPropsUpdate = onPropsUpdate;
    }
    then(resolve, reject) {
        this.renderer({ components: [this.component] })
            .then(({ returnValue: [result] }) => {
            const parsed = ioSchema_1.ioSchema[this.methodName].returns.parse(result);
            resolve(this.getValue(parsed));
        })
            .catch(err => {
            if (reject) {
                if (err instanceof zod_1.ZodError) {
                    // This should be caught already, primarily here for types
                    reject(new IOError_1.default('BAD_RESPONSE', 'Received invalid response.', {
                        cause: err,
                    }));
                }
                else {
                    reject(err);
                }
            }
        });
    }
    getValue(result) {
        if (this.valueGetter)
            return this.valueGetter(result);
        return result;
    }
    get component() {
        return new IOComponent_1.default({
            methodName: this.methodName,
            label: this.label,
            initialProps: this.props,
            onStateChange: this.onStateChange,
            displayResolvesImmediately: this.displayResolvesImmediately,
            onPropsUpdate: this.onPropsUpdate,
        });
    }
}
exports.IOPromise = IOPromise;
/**
 * A thin subtype of IOPromise that does nothing but mark the component
 * as "display" for display-only components.
 */
class DisplayIOPromise extends IOPromise {
    withChoices(choiceButtons) {
        return new WithChoicesIOPromise({
            innerPromise: this,
            choiceButtons,
        });
    }
}
exports.DisplayIOPromise = DisplayIOPromise;
class InputIOPromise extends IOPromise {
    get component() {
        return new IOComponent_1.default({
            methodName: this.methodName,
            label: this.label,
            initialProps: this.props,
            onStateChange: this.onStateChange,
            validator: this.validator ? this.handleValidation.bind(this) : undefined,
            displayResolvesImmediately: this.displayResolvesImmediately,
            onPropsUpdate: this.onPropsUpdate,
        });
    }
    /* @internal */ async handleValidation(returnValue) {
        // These should be caught already, primarily here for types
        if (returnValue === undefined) {
            return 'This field is required.';
        }
        const parsed = ioSchema_1.ioSchema[this.methodName].returns.safeParse(returnValue);
        if (parsed.success) {
            if (this.validator) {
                return this.validator(this.getValue(parsed.data));
            }
        }
        else {
            // shouldn't be hit, but just in case
            return 'Received invalid value for field.';
        }
    }
    validate(validator) {
        this.validator = validator;
        return this;
    }
    optional(isOptional = true) {
        return isOptional
            ? new OptionalIOPromise({
                renderer: this.renderer,
                methodName: this.methodName,
                label: this.label,
                props: this.props,
                valueGetter: this.valueGetter,
                onStateChange: this.onStateChange,
            })
            : this;
    }
    withChoices(choiceButtons) {
        return new WithChoicesIOPromise({
            innerPromise: this,
            choiceButtons,
        });
    }
}
exports.InputIOPromise = InputIOPromise;
/**
 * A thin subclass of IOPromise that marks its inner component as
 * "optional" and returns `undefined` if not provided by the action runner.
 */
class OptionalIOPromise extends InputIOPromise {
    then(resolve, reject) {
        this.renderer({ components: [this.component] })
            .then(({ returnValue: [result] }) => {
            const parsed = ioSchema_1.ioSchema[this.methodName].returns
                .optional()
                .parse(result);
            resolve(this.getValue(parsed));
        })
            .catch(err => {
            if (reject) {
                if (err instanceof zod_1.ZodError) {
                    // This should be caught already, primarily here for types
                    reject(new IOError_1.default('BAD_RESPONSE', 'Received invalid response.', {
                        cause: err,
                    }));
                }
                else {
                    reject(err);
                }
            }
        });
    }
    get component() {
        return new IOComponent_1.default({
            methodName: this.methodName,
            label: this.label,
            initialProps: this.props,
            onStateChange: this.onStateChange,
            isOptional: true,
            validator: this.validator ? this.handleValidation.bind(this) : undefined,
            displayResolvesImmediately: this.displayResolvesImmediately,
            onPropsUpdate: this.onPropsUpdate,
        });
    }
    /* @internal */ async handleValidation(returnValue) {
        // These should be caught already, primarily here for types
        const parsed = ioSchema_1.ioSchema[this.methodName].returns
            .optional()
            .safeParse(returnValue);
        if (parsed.success) {
            if (this.validator) {
                return this.validator(this.getValue(parsed.data));
            }
        }
        else {
            // shouldn't be hit, but just in case
            return 'Received invalid value for field.';
        }
    }
    getValue(result) {
        if (result === undefined)
            return undefined;
        if (this.valueGetter) {
            return this.valueGetter(result);
        }
        return result;
    }
}
exports.OptionalIOPromise = OptionalIOPromise;
class MultipleableIOPromise extends InputIOPromise {
    constructor({ defaultValueGetter, ...props }) {
        super(props);
        this.defaultValueGetter = defaultValueGetter;
    }
    multiple({ defaultValue, } = {}) {
        let transformedDefaultValue;
        const propsSchema = ioSchema_1.ioSchema[this.methodName].props;
        if (defaultValue && 'defaultValue' in propsSchema.shape) {
            const { defaultValueGetter } = this;
            const potentialDefaultValue = defaultValueGetter
                ? defaultValue.map(dv => defaultValueGetter(dv))
                : defaultValue;
            try {
                const defaultValueSchema = propsSchema.shape.defaultValue;
                transformedDefaultValue = zod_1.z
                    .array(defaultValueSchema.unwrap().unwrap())
                    .parse(potentialDefaultValue);
            }
            catch (err) {
                console.error(`[Interval] Invalid default value found for multiple IO call with label "${this.label}": ${defaultValue}. This default value will be ignored.`);
                console.error(err);
                transformedDefaultValue = undefined;
            }
        }
        return new MultipleIOPromise({
            renderer: this.renderer,
            methodName: this.methodName,
            label: this.label,
            props: this.props,
            valueGetter: this.valueGetter,
            onStateChange: this.onStateChange,
            defaultValue: transformedDefaultValue,
        });
    }
    withChoices(choices) {
        return new WithChoicesIOPromise({
            innerPromise: this,
            choiceButtons: choices,
        });
    }
}
exports.MultipleableIOPromise = MultipleableIOPromise;
class MultipleIOPromise extends InputIOPromise {
    constructor({ defaultValue, valueGetter, ...rest }) {
        super(rest);
        this.getSingleValue = valueGetter;
        this.defaultValue = defaultValue;
    }
    then(resolve, reject) {
        this.renderer({ components: [this.component] })
            .then(({ returnValue: [results] }) => {
            resolve(this.getValue(results));
        })
            .catch(err => {
            if (reject)
                reject(err);
        });
    }
    validate(validator) {
        this.validator = validator;
        return this;
    }
    getValue(results) {
        if (!Array.isArray(results)) {
            results = [results];
        }
        const { getSingleValue } = this;
        if (getSingleValue) {
            return results.map(result => getSingleValue(result));
        }
        return results;
    }
    /* @internal */ async handleValidation(returnValues) {
        // These should be caught already, primarily here for types
        if (!returnValues) {
            return 'This field is required.';
        }
        const parsed = zod_1.z
            .array(ioSchema_1.ioSchema[this.methodName].returns)
            .safeParse(returnValues);
        if (parsed.success) {
            if (this.validator) {
                return this.validator(this.getValue(parsed.data));
            }
        }
        else {
            // shouldn't be hit, but just in case
            return 'Received invalid value for field.';
        }
    }
    get component() {
        return new IOComponent_1.default({
            methodName: this.methodName,
            label: this.label,
            initialProps: this.props,
            onStateChange: this.onStateChange,
            validator: this.validator ? this.handleValidation.bind(this) : undefined,
            isMultiple: true,
            multipleProps: {
                defaultValue: this.defaultValue,
            },
            displayResolvesImmediately: this.displayResolvesImmediately,
            onPropsUpdate: this.onPropsUpdate,
        });
    }
    optional(isOptional = true) {
        return isOptional
            ? new OptionalMultipleIOPromise({
                renderer: this.renderer,
                methodName: this.methodName,
                label: this.label,
                props: this.props,
                valueGetter: this.getSingleValue,
                defaultValue: this.defaultValue,
                onStateChange: this.onStateChange,
            })
            : this;
    }
}
exports.MultipleIOPromise = MultipleIOPromise;
class OptionalMultipleIOPromise extends OptionalIOPromise {
    constructor({ defaultValue, valueGetter, ...rest }) {
        super(rest);
        this.getSingleValue = valueGetter;
        this.defaultValue = defaultValue;
    }
    then(resolve, reject) {
        this.renderer({ components: [this.component] })
            .then(({ returnValue: [results] }) => {
            resolve(this.getValue(results));
        })
            .catch(err => {
            if (reject)
                reject(err);
        });
    }
    validate(validator) {
        this.validator = validator;
        return this;
    }
    getValue(results) {
        if (!results)
            return undefined;
        if (!Array.isArray(results)) {
            results = [results];
        }
        const { getSingleValue } = this;
        if (getSingleValue) {
            return results.map(result => getSingleValue(result));
        }
        return results;
    }
    /* @internal */ async handleValidation(returnValues) {
        // These should be caught already, primarily here for types
        const parsed = zod_1.z
            .array(ioSchema_1.ioSchema[this.methodName].returns)
            .optional()
            .safeParse(returnValues);
        if (parsed.success) {
            if (this.validator) {
                return this.validator(this.getValue(parsed.data));
            }
        }
        else {
            // shouldn't be hit, but just in case
            return 'Received invalid value for field.';
        }
    }
    get component() {
        return new IOComponent_1.default({
            methodName: this.methodName,
            label: this.label,
            initialProps: this.props,
            onStateChange: this.onStateChange,
            validator: this.validator ? this.handleValidation.bind(this) : undefined,
            isMultiple: true,
            isOptional: true,
            multipleProps: {
                defaultValue: this.defaultValue,
            },
            displayResolvesImmediately: this.displayResolvesImmediately,
            onPropsUpdate: this.onPropsUpdate,
        });
    }
}
exports.OptionalMultipleIOPromise = OptionalMultipleIOPromise;
class WithChoicesIOPromise {
    constructor({ innerPromise, choiceButtons, }) {
        _WithChoicesIOPromise_validator.set(this, void 0);
        this.innerPromise = innerPromise;
        this.choiceButtons = choiceButtons.map(b => typeof b === 'string'
            ? { label: b, value: b }
            : b);
    }
    then(resolve, reject) {
        this.innerPromise
            .renderer({
            components: [this.component],
            choiceButtons: this.choiceButtons,
            validator: __classPrivateFieldGet(this, _WithChoicesIOPromise_validator, "f")
                ? this.handleValidation.bind(this)
                : undefined,
        })
            .then(({ returnValue: [result], choice }) => {
            const methodName = this.innerPromise.methodName;
            const parsed = this.innerPromise instanceof MultipleIOPromise ||
                this.innerPromise instanceof OptionalMultipleIOPromise
                ? result
                : this.innerPromise instanceof OptionalIOPromise
                    ? ioSchema_1.ioSchema[methodName].returns.optional().parse(result)
                    : ioSchema_1.ioSchema[methodName].returns.parse(result);
            // Need a cast here because can't really prove statically, the checks above should be correct though
            resolve({
                choice: choice,
                returnValue: this.getValue(parsed),
            });
        })
            .catch(err => {
            if (reject) {
                if (err instanceof zod_1.ZodError) {
                    // This should be caught already, primarily here for types
                    reject(new IOError_1.default('BAD_RESPONSE', 'Received invalid response.', {
                        cause: err,
                    }));
                }
                else {
                    reject(err);
                }
            }
        });
    }
    get getValue() {
        return this.innerPromise.getValue.bind(this.innerPromise);
    }
    get component() {
        return this.innerPromise.component;
    }
    validate(validator) {
        this.innerPromise.validator = undefined;
        __classPrivateFieldSet(this, _WithChoicesIOPromise_validator, validator, "f");
        return this;
    }
    /* @internal */ async handleValidation(returnValues) {
        if (!__classPrivateFieldGet(this, _WithChoicesIOPromise_validator, "f"))
            return;
        this.innerPromise.validator = undefined;
        // Perform basic type validation, for extra safety
        if (this.innerPromise instanceof InputIOPromise ||
            this.innerPromise instanceof OptionalIOPromise ||
            this.innerPromise instanceof MultipleIOPromise ||
            this.innerPromise instanceof OptionalMultipleIOPromise) {
            const innerValidation = await this.innerPromise.handleValidation(returnValues.returnValue[0]);
            if (innerValidation != null) {
                return innerValidation;
            }
        }
        return __classPrivateFieldGet(this, _WithChoicesIOPromise_validator, "f").call(this, {
            choice: returnValues.choice,
            returnValue: returnValues.returnValue[0],
        });
    }
    optional(isOptional = true) {
        if (!(this.innerPromise instanceof InputIOPromise)) {
            throw new IntervalError_1.default(`Invalid chained method call: only input IO methods can be marked as .optional(). Invalid call on the method with label "${this.component.label}".`);
        }
        return isOptional
            ? new WithChoicesIOPromise({
                innerPromise: this.innerPromise.optional(isOptional),
                choiceButtons: this.choiceButtons,
            })
            : this;
    }
    multiple({ defaultValue, } = {}) {
        if (!(this.innerPromise instanceof MultipleableIOPromise)) {
            throw new IntervalError_1.default(`Invalid chained method call: .multiple() is not allowed on the IO method with label "${this.component.label}".`);
        }
        return new WithChoicesIOPromise({
            innerPromise: this.innerPromise.multiple({ defaultValue }),
            choiceButtons: this.choiceButtons,
        });
    }
    withChoices(choices) {
        return new WithChoicesIOPromise({
            innerPromise: this.innerPromise,
            choiceButtons: choices,
        });
    }
}
exports.WithChoicesIOPromise = WithChoicesIOPromise;
_WithChoicesIOPromise_validator = new WeakMap();
/**
 * A thin subclass of IOPromise that does nothing but mark the component
 * as "exclusive" for components that cannot be rendered in a group.
 * Also cannot be optional at this time.
 */
class ExclusiveIOPromise extends IOPromise {
    get component() {
        return new IOComponent_1.default({
            methodName: this.methodName,
            label: this.label,
            initialProps: this.props,
            onStateChange: this.onStateChange,
            isOptional: false,
            validator: this.validator ? this.handleValidation.bind(this) : undefined,
            displayResolvesImmediately: this.displayResolvesImmediately,
            onPropsUpdate: this.onPropsUpdate,
        });
    }
    /* @internal */ async handleValidation(returnValue) {
        // These should be caught already, primarily here for types
        if (returnValue === undefined) {
            return 'This field is required.';
        }
        const parsed = ioSchema_1.ioSchema[this.methodName].returns.safeParse(returnValue);
        if (parsed.success) {
            if (this.validator) {
                return this.validator(this.getValue(parsed.data));
            }
        }
        else {
            // shouldn't be hit, but just in case
            return 'Received invalid value for field.';
        }
    }
    validate(validator) {
        this.validator = validator;
        return this;
    }
}
exports.ExclusiveIOPromise = ExclusiveIOPromise;
class IOGroupPromise {
    constructor(config) {
        var _a, _b;
        _IOGroupPromise_choiceButtons.set(this, void 0);
        this.promises = config.promises;
        this.renderer = config.renderer;
        __classPrivateFieldSet(this, _IOGroupPromise_choiceButtons, config.continueButton
            ? [
                {
                    label: (_a = config.continueButton.label) !== null && _a !== void 0 ? _a : 'Continue',
                    value: (_b = config.continueButton.label) !== null && _b !== void 0 ? _b : 'Continue',
                    theme: config.continueButton.theme,
                },
            ]
            : undefined, "f");
    }
    /* @internal */ get components() {
        return this.promiseValues.map(p => p.component);
    }
    /* @internal */ get promiseValues() {
        return Array.isArray(this.promises)
            ? this.promises
            : Object.values(this.promises);
    }
    then(resolve, reject) {
        this.renderer({
            components: this.components,
            validator: this.validator ? this.handleValidation.bind(this) : undefined,
            choiceButtons: __classPrivateFieldGet(this, _IOGroupPromise_choiceButtons, "f"),
        })
            .then(response => {
            resolve(this.getValues(response));
        })
            .catch(err => {
            if (reject)
                reject(err);
        });
    }
    /* @internal */ getValues({ returnValue, }) {
        let returnValues = returnValue.map((val, i) => this.promiseValues[i].getValue(val));
        if (Array.isArray(this.promises)) {
            return returnValues;
        }
        else {
            const keys = Object.keys(this.promises);
            return Object.fromEntries(returnValues.map((val, i) => [keys[i], val]));
        }
    }
    validate(validator) {
        this.validator = validator;
        return this;
    }
    // These types aren't as tight as they could be, but
    // TypeScript doesn't like IOGroupComponents defined above here
    /* @internal */ async handleValidation(returnValues) {
        if (!this.validator)
            return;
        const promiseValues = this.promiseValues;
        const values = returnValues.returnValue.map((v, index) => promiseValues[index].getValue(v));
        if (Array.isArray(this.promises)) {
            return this.validator(values);
        }
        else {
            const keys = Object.keys(this.promises);
            const valueMap = Object.fromEntries(values.map((val, i) => [keys[i], val]));
            return this.validator(valueMap);
        }
    }
    withChoices(choices
    // @ts-ignore
    ) {
        return new WithChoicesIOGroupPromise({
            innerPromise: this,
            choiceButtons: choices,
            validator: this.validator,
        });
    }
}
exports.IOGroupPromise = IOGroupPromise;
_IOGroupPromise_choiceButtons = new WeakMap();
class WithChoicesIOGroupPromise {
    constructor(config) {
        var _a;
        _WithChoicesIOGroupPromise_innerPromise.set(this, void 0);
        _WithChoicesIOGroupPromise_choiceButtons.set(this, void 0);
        __classPrivateFieldSet(this, _WithChoicesIOGroupPromise_innerPromise, config.innerPromise, "f");
        __classPrivateFieldSet(this, _WithChoicesIOGroupPromise_choiceButtons, (_a = config.choiceButtons) === null || _a === void 0 ? void 0 : _a.map(b => typeof b === 'string'
            ? { label: b, value: b }
            : b), "f");
        const innerValidator = config.validator;
        if (innerValidator) {
            this.validator = ({ choice, returnValue }) => {
                return innerValidator(returnValue);
            };
        }
    }
    then(resolve, reject) {
        __classPrivateFieldGet(this, _WithChoicesIOGroupPromise_innerPromise, "f")
            .renderer({
            components: __classPrivateFieldGet(this, _WithChoicesIOGroupPromise_innerPromise, "f").components,
            validator: this.validator
                ? this.handleValidation.bind(this)
                : undefined,
            choiceButtons: __classPrivateFieldGet(this, _WithChoicesIOGroupPromise_choiceButtons, "f"),
        })
            .then(response => {
            const returnValue = __classPrivateFieldGet(this, _WithChoicesIOGroupPromise_innerPromise, "f").getValues(response);
            resolve({
                choice: response.choice,
                returnValue,
            });
        })
            .catch(err => {
            if (reject)
                reject(err);
        });
    }
    validate(validator) {
        this.validator = validator;
        return this;
    }
    // These types aren't as tight as they could be, but
    // TypeScript doesn't like IOGroupComponents defined above here
    /* @internal */ async handleValidation(returnValues) {
        if (!this.validator)
            return;
        const promiseValues = __classPrivateFieldGet(this, _WithChoicesIOGroupPromise_innerPromise, "f").promiseValues;
        const values = returnValues.returnValue.map((v, index) => promiseValues[index].getValue(v));
        if (Array.isArray(__classPrivateFieldGet(this, _WithChoicesIOGroupPromise_innerPromise, "f").promises)) {
            return this.validator({
                choice: returnValues.choice,
                returnValue: values,
            });
        }
        else {
            const keys = Object.keys(__classPrivateFieldGet(this, _WithChoicesIOGroupPromise_innerPromise, "f").promises);
            const valueMap = Object.fromEntries(values.map((val, i) => [keys[i], val]));
            return this.validator({
                choice: returnValues.choice,
                returnValue: valueMap,
            });
        }
    }
    withChoices(choices) {
        return new WithChoicesIOGroupPromise({
            innerPromise: __classPrivateFieldGet(this, _WithChoicesIOGroupPromise_innerPromise, "f"),
            choiceButtons: choices,
        });
    }
}
exports.WithChoicesIOGroupPromise = WithChoicesIOGroupPromise;
_WithChoicesIOGroupPromise_innerPromise = new WeakMap(), _WithChoicesIOGroupPromise_choiceButtons = new WeakMap();
