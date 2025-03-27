"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../utils/table");
const grid_1 = require("../utils/grid");
function displayGrid(props) {
    // Rendering all rows on initialization is necessary for filtering and sorting
    const initialData = 'data' in props && props.data
        ? props.data.map((row, index) => (0, grid_1.gridItemSerializer)({
            key: index.toString(),
            renderItem: props.renderItem,
            row,
        }))
        : [];
    const isAsync = 'getData' in props && !!props.getData;
    return {
        props: {
            ...props,
            data: initialData.slice(0, table_1.TABLE_DATA_BUFFER_SIZE),
            totalRecords: 'data' in props && props.data ? initialData.length : undefined,
            isAsync,
        },
        async onStateChange(newState) {
            let serializedData;
            let totalRecords;
            if (isAsync) {
                const { data, totalRecords: r } = await props.getData(newState);
                serializedData = data.map((row, index) => (0, grid_1.gridItemSerializer)({
                    renderItem: props.renderItem,
                    key: (index + newState.offset).toString(),
                    row,
                }));
                totalRecords = r;
            }
            else {
                const filtered = (0, table_1.filterRows)({
                    queryTerm: newState.queryTerm,
                    data: initialData,
                });
                serializedData = filtered.slice(newState.offset, newState.offset +
                    Math.min(newState.pageSize * 3, table_1.TABLE_DATA_BUFFER_SIZE));
                totalRecords = initialData.length;
            }
            return {
                ...props,
                data: serializedData,
                totalRecords,
                isAsync,
            };
        },
    };
}
exports.default = displayGrid;
