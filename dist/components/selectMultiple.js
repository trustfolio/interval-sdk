"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioSchema_1 = require("../ioSchema");
function selectMultiple(logger) {
    return (props) => {
        var _a;
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
        let defaultValue = (_a = props.defaultValue) === null || _a === void 0 ? void 0 : _a.map(d => normalizeOption(d));
        if (defaultValue &&
            defaultValue.every(val => !optionMap.has(getComparisonValue(val.value)))) {
            logger.warn('The defaultValue property must be a subset of the provided options, the provided defaultValue will be discarded.');
            defaultValue = [];
        }
        const stripper = ioSchema_1.labelValue.strip();
        return {
            props: {
                ...props,
                defaultValue: defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.map(o => stripper.parse(o)),
                options: normalizedOptions.map(o => stripper.parse(o)),
            },
            getValue(response) {
                return response.map(r => optionMap.get(getComparisonValue(r.value)));
            },
        };
    };
}
exports.default = selectMultiple;
