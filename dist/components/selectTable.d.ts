import Logger from '../classes/Logger';
import { T_IO_PROPS, T_IO_RETURNS, T_IO_STATE } from '../ioSchema';
import { MenuItem, TableColumn } from '../types';
type PublicProps<Row> = Omit<T_IO_PROPS<'SELECT_TABLE'>, 'data' | 'columns'> & {
    data: Row[];
    columns?: (TableColumn<Row> | (string & keyof Row))[];
    rowMenuItems?: (row: Row) => MenuItem[];
    initiallySelected?: (row: Row) => boolean;
};
export default function selectTable(logger: Logger): <Row extends Record<string, any> = any>(props: PublicProps<Row>) => {
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
        totalRecords: number;
        columns: TableColumn<Row>[];
        selectedKeys: string[];
        disabled?: boolean | undefined;
        defaultPageSize?: number | undefined;
        helpText?: string | undefined;
        isFilterable?: boolean | undefined;
        isSortable?: boolean | undefined;
        minSelections?: number | undefined;
        maxSelections?: number | undefined;
        rowMenuItems?: ((row: Row) => MenuItem[]) | undefined;
        initiallySelected?: ((row: Row) => boolean) | undefined;
    };
    getValue(response: T_IO_RETURNS<'SELECT_TABLE'>): Row[];
    onStateChange(newState: T_IO_STATE<'SELECT_TABLE'>): Promise<{
        data: Omit<{
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
        }, "filterValue">[];
        totalRecords: number;
        selectedKeys: string[];
        columns: TableColumn<Row>[];
        disabled?: boolean | undefined;
        defaultPageSize?: number | undefined;
        helpText?: string | undefined;
        isFilterable?: boolean | undefined;
        isSortable?: boolean | undefined;
        minSelections?: number | undefined;
        maxSelections?: number | undefined;
        rowMenuItems?: ((row: Row) => MenuItem[]) | undefined;
        initiallySelected?: ((row: Row) => boolean) | undefined;
    }>;
};
export {};
