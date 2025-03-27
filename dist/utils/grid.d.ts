import { GridItem, InternalGridItem } from '../ioSchema';
export type GridDataFetcher<Row = any> = (props: {
    queryTerm?: string;
    offset: number;
    pageSize: number;
}) => Promise<{
    data: Row[];
    totalRecords?: number;
}>;
export declare function gridItemSerializer<Row = any>({ key, row, renderItem, }: {
    key: string;
    row: Row;
    renderItem: (row: Row) => GridItem;
}): InternalGridItem;
