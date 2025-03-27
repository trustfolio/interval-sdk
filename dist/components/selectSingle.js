"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioSchema_1 = require("../ioSchema");
function selectSingle(logger) {
    return (props) => {
        function normalizeOption(option) {
            if (typeof option === 'string' ||
                typeof option === 'number' ||
                typeof option === 'boolean' ||
                option instanceof Date) {
                return {
                    label: option,
                    value: option,
                };
            }
            else {
                return option;
            }
        }
        function getComparisonValue(value) {
            if (value instanceof Date) {
                return `date:${value.valueOf()}`;
            }
            return `${typeof value}:${value}`;
        }
        const normalizedOptions = props.options.map(option => normalizeOption(option));
        const optionMap = new Map(normalizedOptions.map((o, i) => [
            getComparisonValue(o.value),
            props.options[i],
        ]));
        const stripper = ioSchema_1.richSelectOption.strip();
        let defaultValue = props.defaultValue
            ? normalizeOption(props.defaultValue)
            : undefined;
        if (defaultValue &&
            !optionMap.has(getComparisonValue(defaultValue.value))) {
            logger.warn('The defaultValue property must be a value in the provided options, the provided defaultValue will be discarded.');
            defaultValue = undefined;
        }
        return {
            props: {
                ...props,
                defaultValue: defaultValue ? stripper.parse(defaultValue) : undefined,
                options: normalizedOptions.map(o => stripper.parse(o)),
            },
            getValue(response) {
                return optionMap.get(getComparisonValue(response.value));
            },
        };
    };
}
exports.default = selectSingle;
