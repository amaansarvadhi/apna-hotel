/** @format */

import classNames from "classnames";
import type { PropsWithChildren } from "react";
import { GoArrowRight } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

export type HorizontalMenuNavLinkProps = PropsWithChildren<{
  path: string;
  isExternalLink?: boolean;
  className?: string;
  icon: boolean;
}>;

const HorizontalMenuNavLink = ({
  path,
  children,
  isExternalLink,
  className,
  icon,
}: HorizontalMenuNavLinkProps) => {
  const location = useLocation();

  return (
    <Link
      className={classNames("w-full flex items-center   bg-white", className)}
      to={path}
      target={isExternalLink ? "_blank" : ""}
    >
      <span className="group relative">
        <span
          style={{
            fontSize: "14px",
          }}
          className={` flex  items-center ${path === location.pathname ? "text-indigo-600 font-semibold" : "text-#696774"}   group-hover:${path === location.pathname ? "text-indigo-600 font-semibold" : "text-black"} group-hover:font-semibold transition-colors`}
        >
          {children}
        </span>
      </span>
    </Link>
  );
};

export default HorizontalMenuNavLink;
