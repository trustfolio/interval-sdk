import { T_IO_PROPS, T_IO_RETURNS, DateObject, DateTimeObject } from '../ioSchema';
export declare function date(props: Omit<T_IO_PROPS<'INPUT_DATE'>, 'defaultValue' | 'min' | 'max'> & {
    defaultValue?: DateObject | Date;
    min?: DateObject | Date;
    max?: DateObject | Date;
}): {
    props: {
        defaultValue: {
            year: number;
            month: number;
            day: number;
        } | undefined;
        min: {
            year: number;
            month: number;
            day: number;
        } | undefined;
        max: {
            year: number;
            month: number;
            day: number;
        } | undefined;
        disabled?: boolean | undefined;
        helpText?: string | undefined;
    };
    getValue(response: T_IO_RETURNS<'INPUT_DATE'>): {
        jsDate: Date;
        year: number;
        month: number;
        day: number;
    };
};
export declare function datetime(props: Omit<T_IO_PROPS<'INPUT_DATETIME'>, 'defaultValue' | 'min' | 'max'> & {
    defaultValue?: DateTimeObject | Date;
    min?: DateTimeObject | Date;
    max?: DateTimeObject | Date;
}): {
    props: {
        defaultValue: {
            year: number;
            month: number;
            day: number;
            hour: number;
            minute: number;
        } | undefined;
        min: {
            year: number;
            month: number;
            day: number;
            hour: number;
            minute: number;
        } | undefined;
        max: {
            year: number;
            month: number;
            day: number;
            hour: number;
            minute: number;
        } | undefined;
        disabled?: boolean | undefined;
        helpText?: string | undefined;
    };
    getValue(response: T_IO_RETURNS<'INPUT_DATETIME'>): {
        jsDate: Date;
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
    };
};
