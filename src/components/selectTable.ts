import { T_IO_METHOD } from '../ioSchema'
import component from '../component'
import type { IOPromiseConstructor, IOPromise } from '../io'

export default function selectTable(
  constructor: IOPromiseConstructor<'SELECT_TABLE'>
) {
  return <
    Props extends T_IO_METHOD<'SELECT_TABLE', 'props'>,
    DataList extends Props['data']
  >(
    label: string,
    props: Props
  ) => {
    return constructor(component('SELECT_TABLE', label, props)) as IOPromise<
      'SELECT_TABLE',
      DataList
    >
  }
}
