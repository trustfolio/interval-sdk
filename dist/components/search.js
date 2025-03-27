"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IOError_1 = __importDefault(require("../classes/IOError"));
function search({ onSearch, initialResults = [], defaultValue, renderResult, disabled = false, ...rest }) {
    let resultBatchIndex = 0;
    let resultMap = new Map([['0', initialResults]]);
    function renderResults(results) {
        return results.map((result, index) => {
            const r = renderResult(result);
            const value = `${resultBatchIndex}:${index}`;
            if (r && typeof r === 'object' && !(r instanceof Date)) {
                return {
                    ...r,
                    value,
                };
            }
            return {
                value,
                label: r.toString(),
            };
        });
    }
    const results = renderResults(initialResults);
    function getDefaultValue(defaultValue) {
        let defaultResults = resultMap.get('default');
        if (!defaultResults) {
            defaultResults = [];
            resultMap.set('default', defaultResults);
        }
        const r = renderResult(defaultValue);
        const value = `default:${defaultResults.length}`;
        defaultResults.push(defaultValue);
        if (r && typeof r == 'object' && !(r instanceof Date)) {
            results.push({
                ...r,
                value,
            });
        }
        else {
            results.push({
                value,
                label: r.toString(),
            });
        }
        return value;
    }
    const props = {
        ...rest,
        defaultValue: defaultValue ? getDefaultValue(defaultValue) : undefined,
        results,
        disabled,
    };
    return {
        props,
        getValue(response) {
            try {
                const [batchIndex, index] = response.split(':');
                const batch = resultMap.get(batchIndex);
                if (!batch)
                    throw new IOError_1.default('BAD_RESPONSE');
                return batch[Number(index)];
            }
            catch (err) {
                if (err instanceof IOError_1.default)
                    throw err;
                throw new IOError_1.default('BAD_RESPONSE');
            }
        },
        getDefaultValue,
        async onStateChange(newState) {
            const results = await onSearch(newState.queryTerm);
            resultBatchIndex++;
            const newIndex = resultBatchIndex.toString();
            resultMap.set(newIndex, results);
            return { results: renderResults(results) };
        },
    };
}
exports.default = search;
