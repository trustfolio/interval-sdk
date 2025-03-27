import { z } from 'zod';
import Logger from '../classes/Logger';
import { tableRow, T_IO_PROPS, T_IO_STATE } from '../ioSchema';
import { MenuItem, TableColumn } from '../types';
import { TableDataFetcher } from '../utils/table';
type PublicProps<Row extends z.infer<typeof tableRow>> = Omit<T_IO_PROPS<'DISPLAY_TABLE'>, 'data' | 'columns' | 'totalRecords' | 'isAsync'> & {
    columns?: (TableColumn<Row> | (string & keyof Row))[];
    rowMenuItems?: (row: Row) => MenuItem[];
} & ({
    data: Row[];
} | {
    getData: TableDataFetcher<Row>;
});
export default function displayTable(logger: Logger): <Row extends Record<string, any> = any>(props: PublicProps<Row>) => {
    props: {
        data: {
            key: string;
            data: Record<string, any>;
            menu?: ({
                label: string;
                theme?: "default" | "danger" | undefined;
            } & (({
                params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                disabled?: boolean | undefined;
            } & ({
                route: string;
            } | {
                action: string;
            })) | {
                url: string;
                disabled?: boolean | undefined;
            } | {
                disabled: true;
            }))[] | undefined;
            filterValue?: string | undefined;
        }[];
        columns: {
            label: string;
            accessorKey?: string | undefined;
        }[];
        defaultPageSize?: number | undefined;
        helpText?: string | undefined;
        isFilterable?: boolean | undefined;
        totalRecords?: number | undefined;
        isAsync?: boolean | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        isSortable?: boolean | undefined;
    };
    onStateChange(newState: T_IO_STATE<'DISPLAY_TABLE'>): Promise<{
        data: {
            key: string;
            data: Record<string, any>;
            menu?: ({
                label: string;
                theme?: "default" | "danger" | undefined;
            } & (({
                params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                disabled?: boolean | undefined;
            } & ({
                route: string;
            } | {
                action: string;
            })) | {
                url: string;
                disabled?: boolean | undefined;
            } | {
                disabled: true;
            }))[] | undefined;
            filterValue?: string | undefined;
        }[];
        totalRecords: number | undefined;
        isAsync: boolean;
        columns: {
            label: string;
            accessorKey?: string | undefined;
        }[];
        defaultPageSize?: number | undefined;
        helpText?: string | undefined;
        isFilterable?: boolean | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        isSortable?: boolean | undefined;
        rowMenuItems?: ((row: Row) => MenuItem[]) | undefined;
    } | {
        data: {
            key: string;
            data: Record<string, any>;
            menu?: ({
                label: string;
                theme?: "default" | "danger" | undefined;
            } & (({
                params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                disabled?: boolean | undefined;
            } & ({
                route: string;
            } | {
                action: string;
            })) | {
                url: string;
                disabled?: boolean | undefined;
            } | {
                disabled: true;
            }))[] | undefined;
            filterValue?: string | undefined;
        }[];
        totalRecords: number | undefined;
        isAsync: boolean;
        columns: {
            label: string;
            accessorKey?: string | undefined;
        }[];
        defaultPageSize?: number | undefined;
        helpText?: string | undefined;
        isFilterable?: boolean | undefined;
        orientation?: "vertical" | "horizontal" | undefined;
        isSortable?: boolean | undefined;
        rowMenuItems?: ((row: Row) => MenuItem[]) | undefined;
        getData: TableDataFetcher<Row>;
    }>;
};
export {};
