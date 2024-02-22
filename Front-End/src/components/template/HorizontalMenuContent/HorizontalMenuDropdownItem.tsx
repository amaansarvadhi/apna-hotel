/** @format */

import classNames from "classnames";
import { useTranslation } from "react-i18next";

import Dropdown from "@/components/ui/Dropdown";

import HorizontalMenuNavLink from "./HorizontalMenuNavLink";

export type HorizontalMenuItemProps = {
  nav: {
    key: string;
    title: string;
    translateKey: string;
    icon: string;
    path: string;
    isExternalLink?: boolean;
  };
  icon: boolean;
};

const HorizontalMenuDropdownItem = ({ nav, icon }: HorizontalMenuItemProps) => {
  const { title, translateKey, path, key, isExternalLink } = nav;

  const { t } = useTranslation();

  const itemTitle = t(translateKey, title);

  return (
    <>
      <Dropdown.Item eventKey={key} className={classNames(path && "px-0")}>
        {path ? (
          <HorizontalMenuNavLink
            path={path}
            className={classNames(path && "px-2 py-1")}
            isExternalLink={isExternalLink}
            icon={icon}
          >
            {itemTitle}
          </HorizontalMenuNavLink>
        ) : (
          <span>{itemTitle}</span>
        )}
      </Dropdown.Item>
    </>
  );
};

export default HorizontalMenuDropdownItem;
