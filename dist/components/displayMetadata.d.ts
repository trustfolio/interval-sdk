import type { Evt } from 'evt';
import Logger from '../classes/Logger';
import { T_IO_PROPS, Serializable, SerializableRecord, ImageSchema } from '../ioSchema';
import { EventualValue } from '../types';
export interface EventualMetaItem {
    label: string;
    value?: EventualValue<Serializable>;
    url?: EventualValue<string>;
    image?: EventualValue<ImageSchema>;
    route?: EventualValue<string>;
    /** @deprecated Please use `route` instead */
    action?: EventualValue<string>;
    params?: EventualValue<SerializableRecord>;
}
export default function displaymetadata(logger: Logger): (props: Pick<T_IO_PROPS<'DISPLAY_METADATA'>, 'layout'> & {
    data: EventualMetaItem[];
}, onPropsUpdate?: Evt<T_IO_PROPS<'DISPLAY_METADATA'>>) => {
    props: T_IO_PROPS<'DISPLAY_METADATA'>;
};
