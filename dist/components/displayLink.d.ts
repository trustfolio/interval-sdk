import { SerializableRecord, T_IO_PROPS } from '../ioSchema';
export default function displayLink(props: {
    theme?: T_IO_PROPS<'DISPLAY_LINK'>['theme'];
} & ({
    url: string;
} | {
    route: string;
    params?: SerializableRecord;
} | {
    action: string;
    params?: SerializableRecord;
})): {
    props: {
        theme?: "default" | "primary" | "secondary" | "danger" | undefined;
    } & ({
        url: string;
    } | {
        route: string;
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
    } | {
        action: string;
        params?: Record<string, string | number | bigint | boolean | Date | null | undefined> | undefined;
    } | {
        href: string;
    });
};
