import { T_IO_PROPS, T_IO_STATE, GridItem } from '../ioSchema';
import { GridDataFetcher } from '../utils/grid';
type PublicProps<Row = any> = Omit<T_IO_PROPS<'DISPLAY_GRID'>, 'data' | 'totalRecords' | 'isAsync'> & {
    renderItem: (row: Row) => GridItem & {
        /** @deprecated Please use `label` instead. */
        title?: string | null;
    };
} & ({
    data: Row[];
} | {
    getData: GridDataFetcher<Row>;
});
export default function displayGrid<Row = any>(props: PublicProps<Row>): {
    props: {
        data: {
            key: string;
            data: {
                params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                label?: string | null | undefined;
                url?: string | undefined;
                description?: string | null | undefined;
                image?: {
                    alt?: string | undefined;
                    url?: string | null | undefined;
                    fit?: "cover" | "contain" | undefined;
                    aspectRatio?: number | undefined;
                } | null | undefined;
                route?: string | undefined;
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
                title?: string | null | undefined;
            };
            filterValue?: string | undefined;
        }[];
        idealColumnWidth?: number | undefined;
        defaultPageSize?: number | undefined;
        helpText?: string | undefined;
        isFilterable?: boolean | undefined;
        totalRecords?: number | undefined;
        isAsync?: boolean | undefined;
    };
    onStateChange(newState: T_IO_STATE<'DISPLAY_GRID'>): Promise<{
        data: {
            key: string;
            data: {
                params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                label?: string | null | undefined;
                url?: string | undefined;
                description?: string | null | undefined;
                image?: {
                    alt?: string | undefined;
                    url?: string | null | undefined;
                    fit?: "cover" | "contain" | undefined;
                    aspectRatio?: number | undefined;
                } | null | undefined;
                route?: string | undefined;
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
                title?: string | null | undefined;
            };
            filterValue?: string | undefined;
        }[];
        totalRecords: number | undefined;
        isAsync: boolean;
        idealColumnWidth?: number | undefined;
        defaultPageSize?: number | undefined;
        helpText?: string | undefined;
        isFilterable?: boolean | undefined;
        renderItem: (row: Row) => {
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
            label?: string | null | undefined;
            url?: string | undefined;
            description?: string | null | undefined;
            image?: {
                alt?: string | undefined;
                url?: string | null | undefined;
                fit?: "cover" | "contain" | undefined;
                aspectRatio?: number | undefined;
            } | null | undefined;
            route?: string | undefined;
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
        } & {
            /** @deprecated Please use `label` instead. */
            title?: string | null | undefined;
        };
    } | {
        data: {
            key: string;
            data: {
                params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
                label?: string | null | undefined;
                url?: string | undefined;
                description?: string | null | undefined;
                image?: {
                    alt?: string | undefined;
                    url?: string | null | undefined;
                    fit?: "cover" | "contain" | undefined;
                    aspectRatio?: number | undefined;
                } | null | undefined;
                route?: string | undefined;
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
                title?: string | null | undefined;
            };
            filterValue?: string | undefined;
        }[];
        totalRecords: number | undefined;
        isAsync: boolean;
        idealColumnWidth?: number | undefined;
        defaultPageSize?: number | undefined;
        helpText?: string | undefined;
        isFilterable?: boolean | undefined;
        renderItem: (row: Row) => {
            params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
            label?: string | null | undefined;
            url?: string | undefined;
            description?: string | null | undefined;
            image?: {
                alt?: string | undefined;
                url?: string | null | undefined;
                fit?: "cover" | "contain" | undefined;
                aspectRatio?: number | undefined;
            } | null | undefined;
            route?: string | undefined;
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
        } & {
            /** @deprecated Please use `label` instead. */
            title?: string | null | undefined;
        };
        getData: GridDataFetcher<Row>;
    }>;
};
export {};
