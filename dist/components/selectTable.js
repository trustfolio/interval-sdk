"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../utils/table");
function selectTable(logger) {
    return function (props) {
        const columns = (0, table_1.columnsBuilder)(props, column => logger.warn((0, table_1.missingColumnMessage)('io.select.table')(column)));
        let selectedKeys = [];
        // Rendering all rows on initialization is necessary for filtering and sorting
        const data = props.data.map((row, index) => {
            var _a;
            const rowData = (0, table_1.tableRowSerializer)({
                key: index.toString(),
                row,
                columns,
                menuBuilder: props.rowMenuItems,
                logger,
            });
            if ((_a = props.initiallySelected) === null || _a === void 0 ? void 0 : _a.call(props, row)) {
                selectedKeys.push(rowData.key);
            }
            return rowData;
        });
        return {
            props: {
                ...props,
                data: data.slice(0, table_1.TABLE_DATA_BUFFER_SIZE),
                totalRecords: data.length,
                columns,
                selectedKeys,
            },
            getValue(response) {
                const indices = response.map(({ key }) => Number(key));
                const rows = props.data.filter((_, idx) => indices.includes(idx));
                return rows;
            },
            async onStateChange(newState) {
                var _a, _b;
                const filtered = (0, table_1.filterRows)({ queryTerm: newState.queryTerm, data });
                const sorted = (0, table_1.sortRows)({
                    data: filtered,
                    column: (_a = newState.sortColumn) !== null && _a !== void 0 ? _a : null,
                    direction: (_b = newState.sortDirection) !== null && _b !== void 0 ? _b : null,
                });
                let selectedKeys = [];
                if (newState.isSelectAll) {
                    selectedKeys = sorted.map(({ key }) => key);
                }
                return {
                    ...props,
                    data: sorted.slice(newState.offset, newState.offset + table_1.TABLE_DATA_BUFFER_SIZE),
                    totalRecords: sorted.length,
                    selectedKeys,
                    columns,
                };
            },
        };
    };
}
exports.default = selectTable;
