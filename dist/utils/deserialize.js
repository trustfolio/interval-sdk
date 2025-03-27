"use strict";
// TODO: Remove this when all active SDKs support superjson
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripUndefined = exports.deserializeDates = exports.serializeDates = void 0;
function serializeDates(record) {
    const ret = {};
    for (const [key, val] of Object.entries(record)) {
        if (val instanceof Date) {
            ret[key] = val.toISOString();
        }
        else if (val && typeof val === 'object') {
            if (Array.isArray(val)) {
                ret[key] = val.map(v => serializeDates(v));
            }
            else {
                try {
                    ret[key] = serializeDates(val);
                }
                catch { }
            }
        }
        else {
            ret[key] = val;
        }
    }
    return ret;
}
exports.serializeDates = serializeDates;
function deserializeDates(record) {
    const ret = {};
    for (const [key, val] of Object.entries(record)) {
        if (typeof val === 'string') {
            const date = new Date(val);
            if (date.toJSON() === val) {
                ret[key] = date;
            }
            else {
                ret[key] = val;
            }
        }
        else if (val && typeof val === 'object' && !(val instanceof Date)) {
            if (Array.isArray(val)) {
                ret[key] = val.map(v => deserializeDates(v));
            }
            else {
                try {
                    ret[key] = deserializeDates(val);
                }
                catch {
                    ret[key] = val;
                }
            }
        }
        else {
            ret[key] = val;
        }
    }
    return ret;
}
exports.deserializeDates = deserializeDates;
function stripUndefined(obj) {
    if (!obj)
        return obj;
    const newObj = { ...obj };
    for (const [key, val] of Object.entries(newObj)) {
        if (val === undefined) {
            delete newObj[key];
        }
    }
    return newObj;
}
exports.stripUndefined = stripUndefined;
