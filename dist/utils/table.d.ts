import { internalTableColumn, tableRow, internalTableRow } from '../ioSchema';
import { ColumnKey, MenuItem } from '../types';
import { z } from 'zod';
import { TableColumn } from '../types';
import Logger from '../classes/Logger';
export declare const TABLE_DATA_BUFFER_SIZE = 500;
/**
 * Generates column config from an array of tabular data.
 * If custom columns aren't provided, the keys from `data` are used as headers.
 *
 * Returns an array of label/accessorKey OR label/renderCell.
 */
export declare function columnsBuilder<Row extends z.infer<typeof tableRow>>(props: {
    columns?: (TableColumn<Row> | ColumnKey<Row>)[];
    data?: Row[];
}, logMissingColumn: (column: string) => void): TableColumn<Row>[];
/**
 * Removes the `render` function from column defs before sending data up to the server.
 */
export declare function columnsWithoutRender(columns: TableColumn<any>[]): z.infer<typeof internalTableColumn>[];
export type TableDataFetcher<Row extends z.infer<typeof tableRow>> = (props: {
    queryTerm?: string;
    sortColumn?: string;
    sortDirection?: 'asc' | 'desc';
    offset: number;
    pageSize: number;
}) => Promise<{
    data: Row[];
    totalRecords?: number;
}>;
/**
 * Applies cell renderers to a row.
 */
export declare function tableRowSerializer<Row extends z.infer<typeof tableRow>>({ key, row, columns, menuBuilder, logger, }: {
    key: string;
    row: Row;
    columns: TableColumn<Row>[];
    menuBuilder?: (row: Row) => MenuItem[];
    logger: Logger;
}): z.infer<typeof internalTableRow>;
type IsomorphicTableRow = {
    data: Record<string, any>;
    key: string;
    filterValue?: string;
};
export declare function sortRows<T extends IsomorphicTableRow>({ data, column, direction, }: {
    data: T[];
    column: string | null;
    direction: 'asc' | 'desc' | null;
}): T[];
export declare function filterRows<T extends IsomorphicTableRow>({ queryTerm, data, }: {
    queryTerm?: string | null;
    data: T[];
}): Omit<T, 'filterValue'>[];
export declare function missingColumnMessage(component: string): (column: string) => string;
export {};
