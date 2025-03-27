"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.missingColumnMessage = exports.filterRows = exports.sortRows = exports.tableRowSerializer = exports.columnsWithoutRender = exports.columnsBuilder = exports.TABLE_DATA_BUFFER_SIZE = void 0;
const image_1 = require("./image");
exports.TABLE_DATA_BUFFER_SIZE = 500;
/**
 * Generates column config from an array of tabular data.
 * If custom columns aren't provided, the keys from `data` are used as headers.
 *
 * Returns an array of label/accessorKey OR label/renderCell.
 */
function columnsBuilder(props, logMissingColumn) {
    const dataColumns = props.data
        ? new Set(props.data.flatMap(record => Object.keys(record)))
        : new Set();
    if (!props.columns) {
        const labels = Array.from(dataColumns.values());
        return labels.map(label => ({
            label,
            accessorKey: label,
        }));
    }
    return props.columns.map(column => {
        var _a;
        const accessorKey = typeof column === 'string' ? column : column.accessorKey;
        if (accessorKey && ((_a = props.data) === null || _a === void 0 ? void 0 : _a.length) && !dataColumns.has(accessorKey)) {
            logMissingColumn(accessorKey);
        }
        if (typeof column === 'string') {
            return {
                label: column,
                accessorKey: column,
            };
        }
        else {
            return column;
        }
    });
}
exports.columnsBuilder = columnsBuilder;
/**
 * Removes the `render` function from column defs before sending data up to the server.
 */
function columnsWithoutRender(columns) {
    return columns.map(({ renderCell, ...column }) => column);
}
exports.columnsWithoutRender = columnsWithoutRender;
const dateFormatter = new Intl.DateTimeFormat('en-US');
/**
 * Applies cell renderers to a row.
 */
function tableRowSerializer({ key, row, columns, menuBuilder, logger, }) {
    var _a, _b, _c;
    const renderedRow = {};
    const filterValues = [];
    for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const key = (_a = col.accessorKey) !== null && _a !== void 0 ? _a : i.toString();
        const val = (_c = (_b = col.renderCell) === null || _b === void 0 ? void 0 : _b.call(col, row)) !== null && _c !== void 0 ? _c : (col.accessorKey ? row[col.accessorKey] : null);
        if (val && typeof val === 'object' && 'image' in val) {
            const image = val.image;
            if (image && typeof image === 'object') {
                if (image.size) {
                    if (!image.width) {
                        image.width = image.size;
                    }
                    if (!image.height) {
                        image.height = image.size;
                    }
                }
                if ('buffer' in image) {
                    const { buffer, ...rest } = image;
                    try {
                        val.image = {
                            ...rest,
                            url: (0, image_1.bufferToDataUrl)(buffer),
                        };
                    }
                    catch (err) {
                        logger.error(err);
                        delete val.image;
                    }
                }
            }
        }
        if (val && typeof val === 'object' && 'label' in val) {
            if (val.label === undefined) {
                val.label = null;
            }
            else if (val.label) {
                filterValues.push(val.label instanceof Date
                    ? dateFormatter.format(val.label)
                    : String(val.label));
            }
        }
        else if (val instanceof Date) {
            filterValues.push(dateFormatter.format(val));
        }
        else {
            filterValues.push(String(val));
        }
        renderedRow[key] = val;
    }
    return {
        key,
        data: renderedRow,
        filterValue: filterValues.join(' ').toLowerCase(),
        menu: menuBuilder ? menuBuilder(row) : undefined,
    };
}
exports.tableRowSerializer = tableRowSerializer;
function sortRows({ data, column, direction, }) {
    if (column === null || direction === null) {
        return data.sort((a, b) => Number(a.key) - Number(b.key));
    }
    return data.sort((a, b) => {
        var _a, _b;
        if (column === null)
            return 0;
        const sortA = (_a = getSortableValue(direction === 'desc' ? b : a, column)) !== null && _a !== void 0 ? _a : null;
        const sortB = (_b = getSortableValue(direction === 'desc' ? a : b, column)) !== null && _b !== void 0 ? _b : null;
        if (sortA === null && sortB === null)
            return 0;
        if (sortA === null)
            return 1;
        if (sortB === null)
            return -1;
        if (typeof sortA === 'string' && typeof sortB === 'string') {
            return sortA.localeCompare(sortB, undefined, { numeric: true });
        }
        if (sortA < sortB)
            return -1;
        if (sortA > sortB)
            return 1;
        return 0;
    });
}
exports.sortRows = sortRows;
function getSortableValue(row, sortByColumn) {
    var _a;
    let sortVal;
    if (row !== null && 'data' in row && row.data) {
        if (sortByColumn in row.data) {
            sortVal = (_a = row.data[sortByColumn]) !== null && _a !== void 0 ? _a : null;
        }
    }
    if (sortVal && typeof sortVal === 'object') {
        if ('value' in sortVal) {
            return sortVal.value;
        }
        if ('label' in sortVal) {
            return sortVal.label;
        }
    }
    return sortVal;
}
function filterRows({ queryTerm, data, }) {
    if (!queryTerm)
        return data;
    return (data
        .filter(row => {
        if ('filterValue' in row && typeof row.filterValue === 'string') {
            return row.filterValue.includes(queryTerm.toLowerCase());
        }
        return true;
    })
        // filterValue is unnecessary beyond this point
        .map(({ filterValue, ...row }) => row));
}
exports.filterRows = filterRows;
function missingColumnMessage(component) {
    return (column) => `Provided column "${column}" not found in data for ${component}`;
}
exports.missingColumnMessage = missingColumnMessage;
