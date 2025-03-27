"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../utils/table");
function displayTable(logger) {
    return function displayTable(props) {
        const initialColumns = (0, table_1.columnsBuilder)(props, column => logger.warn((0, table_1.missingColumnMessage)('io.display.table')(column)));
        // Rendering all rows on initialization is necessary for filtering and sorting
        const initialData = 'data' in props && props.data
            ? props.data.map((row, index) => (0, table_1.tableRowSerializer)({
                key: index.toString(),
                row,
                columns: initialColumns,
                menuBuilder: props.rowMenuItems,
                logger,
            }))
            : [];
        const isAsync = 'getData' in props && !!props.getData;
        return {
            props: {
                ...props,
                data: initialData.slice(0, table_1.TABLE_DATA_BUFFER_SIZE),
                totalRecords: 'data' in props && props.data ? initialData.length : undefined,
                columns: (0, table_1.columnsWithoutRender)(initialColumns),
                isAsync,
            },
            async onStateChange(newState) {
                var _a, _b;
                let serializedData;
                let builtColumns;
                let totalRecords;
                if (isAsync) {
                    const { data, totalRecords: r } = await props.getData(newState);
                    builtColumns = (0, table_1.columnsBuilder)({
                        columns: props.columns,
                        data,
                    }, column => logger.warn((0, table_1.missingColumnMessage)('io.display.table')(column)));
                    serializedData = data.map((row, index) => (0, table_1.tableRowSerializer)({
                        key: (index + newState.offset).toString(),
                        row,
                        columns: builtColumns,
                        menuBuilder: props.rowMenuItems,
                        logger,
                    }));
                    totalRecords = r;
                }
                else {
                    const filtered = (0, table_1.filterRows)({
                        queryTerm: newState.queryTerm,
                        data: initialData,
                    });
                    const sorted = (0, table_1.sortRows)({
                        data: filtered,
                        column: (_a = newState.sortColumn) !== null && _a !== void 0 ? _a : null,
                        direction: (_b = newState.sortDirection) !== null && _b !== void 0 ? _b : null,
                    });
                    serializedData = sorted.slice(newState.offset, newState.offset +
                        Math.min(newState.pageSize * 3, table_1.TABLE_DATA_BUFFER_SIZE));
                    builtColumns = initialColumns;
                    totalRecords = sorted.length;
                }
                return {
                    ...props,
                    data: serializedData,
                    totalRecords,
                    isAsync,
                    columns: (0, table_1.columnsWithoutRender)(builtColumns),
                };
            },
        };
    };
}
exports.default = displayTable;
