import classNames from "classnames";
import type { ReactNode } from "react";
import type { CommonProps } from "@/@types/common";

interface HeaderProps extends CommonProps {
  headerMiddle?: ReactNode;
}

const Header = (props: HeaderProps) => {
  const { headerMiddle, className } = props;

  return (
    <div
      className={classNames("header", className)}
      style={{ background: "#003b95" }}
    >
      <div
        className="container mx-auto py-4 w-[60%]"
        style={{ background: "#003b95" }}
      >
        <div>{headerMiddle}</div>
      </div>
    </div>
  );
};

export default Header;
