export declare function asyncTable(numRows: number): import("../../classes/IOPromise").DisplayIOPromise<"DISPLAY_TABLE", {
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
}, null>;
