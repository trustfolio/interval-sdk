"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datetime = exports.date = void 0;
function dateToDateObject(d) {
    return {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
    };
}
function dateToDateTimeObject(d) {
    return {
        ...dateToDateObject(d),
        hour: d.getHours(),
        minute: d.getMinutes(),
    };
}
function normalizeDateObject(d) {
    return d && d instanceof Date ? dateToDateObject(d) : d;
}
function normalizeDateTimeObject(d) {
    return d && d instanceof Date ? dateToDateTimeObject(d) : d;
}
function date(props) {
    return {
        props: {
            ...props,
            defaultValue: normalizeDateObject(props.defaultValue),
            min: normalizeDateObject(props.min),
            max: normalizeDateObject(props.max),
        },
        getValue(response) {
            const jsDate = new Date(response.year, response.month - 1, response.day, 0, 0, 0, 0);
            return {
                ...response,
                jsDate,
            };
        },
    };
}
exports.date = date;
function datetime(props) {
    return {
        props: {
            ...props,
            defaultValue: normalizeDateTimeObject(props.defaultValue),
            min: normalizeDateTimeObject(props.min),
            max: normalizeDateTimeObject(props.max),
        },
        getValue(response) {
            const jsDate = new Date(response.year, response.month - 1, response.day, response.hour, response.minute, 0, 0);
            return {
                ...response,
                jsDate,
            };
        },
    };
}
exports.datetime = datetime;
