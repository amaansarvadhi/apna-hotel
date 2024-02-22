/** @format */

import { useTranslation } from "react-i18next";

import type { NavMode } from "@/@types/theme";
import MenuItem from "@/components/ui/MenuItem";
import navigationIcon from "@/configs/navigation-icon.config";

import HorizontalMenuNavLink from "./HorizontalMenuNavLink";
import { useLocation } from "react-router-dom";

export type HorizontalMenuItemProps = {
  nav: {
    key: string;
    title: string;
    translateKey: string;
    icon: string;
    path: string;
    isExternalLink?: boolean;
  };
  isLink?: boolean;
  manuVariant: NavMode;
  index?: number;
  activeMenu?: number;
  onClick?: (index: number | undefined) => void;
};

const HorizontalMenuItem = ({
  nav,
  isLink,
  manuVariant,
  index,
  activeMenu,
  onClick,
}: HorizontalMenuItemProps) => {
  const { title, translateKey, icon, path, isExternalLink } = nav;
  const { t } = useTranslation();
  const itemTitle = t(translateKey, title);
  const renderIcon = icon && (
    <span className="text-2xl">{navigationIcon[icon]}</span>
  );
  const location = useLocation();

  return (
    <div>
      {path && isLink ? (
        <HorizontalMenuNavLink
          path={path}
          isExternalLink={isExternalLink}
          icon={false}
        >
          <MenuItem
            variant={manuVariant}
            isActive={index === activeMenu}
            onSelect={() => {
              onClick && onClick(index);
            }}
          >
            <span className="flex items-center gap-2">{itemTitle}</span>
          </MenuItem>
        </HorizontalMenuNavLink>
      ) : (
        <MenuItem
          style={{
            minHeight: "42px",
          }}
          variant={manuVariant}
          isActive={index === activeMenu}
          onSelect={() => {
            onClick && onClick(index);
          }}
        >
          {renderIcon}
          <span>{itemTitle}</span>
        </MenuItem>
      )}
    </div>
  );
};

export default HorizontalMenuItem;
