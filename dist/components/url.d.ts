import type { T_IO_RETURNS } from '../ioSchema';
export default function urlInput(): {
    getValue(response: T_IO_RETURNS<'INPUT_URL'>): URL;
};
