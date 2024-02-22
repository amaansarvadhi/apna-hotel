import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import Sorter from './Sorter'
import _Table,{ TableProps } from './Table'
import TBody from './TBody'
import Td from './Td'
import TFoot from './TFoot'
import Th from './Th'
import THead from './THead'
import Tr from './Tr'

export type { TableProps } from './Table'
export type { THeadProps } from './THead'
export type { TBodyProps } from './TBody'
export type { TFootProps } from './TFoot'
export type { TrProps } from './Tr'
export type { ThProps } from './Th'
export type { TdProps } from './Td'
export type { SorterProps } from './Sorter'

type CompoundedComponent = ForwardRefExoticComponent<
    TableProps & RefAttributes<HTMLElement>
> & {
    THead: typeof THead
    TBody: typeof TBody
    TFoot: typeof TFoot
    Th: typeof Th
    Tr: typeof Tr
    Td: typeof Td
    Sorter: typeof Sorter
}

const Table = _Table as CompoundedComponent

Table.THead = THead
Table.TBody = TBody
Table.TFoot = TFoot
Table.Th = Th
Table.Tr = Tr
Table.Td = Td
Table.Sorter = Sorter

export { Table }

export default Table
