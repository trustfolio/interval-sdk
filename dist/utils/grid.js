"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gridItemSerializer = void 0;
const dateFormatter = new Intl.DateTimeFormat('en-US');
function gridItemSerializer({ key, row, renderItem, }) {
    let filterValues = [];
    if (row && typeof row === 'object') {
        filterValues = Object.values(row).map(v => v instanceof Date ? dateFormatter.format(v) : String(v));
    }
    return {
        key,
        data: renderItem(row),
        filterValue: filterValues.join(' ').toLowerCase(),
    };
}
exports.gridItemSerializer = gridItemSerializer;
