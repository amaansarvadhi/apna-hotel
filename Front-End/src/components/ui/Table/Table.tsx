/** @format */

import { forwardRef } from "react";
import classNames from "classnames";
import type { ComponentPropsWithRef, ElementType } from "react";

export interface TableProps extends ComponentPropsWithRef<"table"> {
  asElement?: ElementType;
  borderlessRow?: boolean;
  compact?: boolean;
  hoverable?: boolean;
  overflow?: boolean;
  overflowY?: boolean;
}

const Table = forwardRef<HTMLElement, TableProps>((props, ref) => {
  const {
    asElement: Component = "table",
    borderlessRow,
    children,
    className,
    compact = false,
    hoverable = true,
    overflow = true,
    overflowY = true,
    ...rest
  } = props;

  const tableClass = classNames(
    Component === "table" ? "table-default" : "table-flex",
    hoverable && "table-hover",
    compact && "table-compact",
    borderlessRow && "borderless-row",
    className,
  );

  return (
    // <div
    //   className={classNames(
    //     overflow && "overflow-x-auto",
    //     overflowY && "h-[45rem]",
    //   )}
    // >
    <Component className={tableClass} {...rest} ref={ref}>
      {children}
    </Component>
    // </div>
  );
});

Table.displayName = "Table";

export default Table;
