export declare function serializeDates<V extends any>(record: Record<string, V>): Record<string, Exclude<V, Date> | string>;
export declare function deserializeDates<V extends any>(record: Record<string, V>): Record<string, V | Date>;
export declare function stripUndefined<K extends string | number | symbol, V, T extends Record<K, V> | undefined>(obj: T): T;
