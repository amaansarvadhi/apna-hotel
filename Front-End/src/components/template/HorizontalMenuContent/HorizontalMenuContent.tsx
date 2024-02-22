/** @format */

import type { NavMode } from "@/@types/theme";
import AuthorityCheck from "@/components/shared/AuthorityCheck";
import Dropdown from "@/components/ui/Dropdown";
import navigationConfig from "@/configs/navigation.config";
import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
} from "@/constants/navigation.constant";

import HorizontalMenuDropdownItem from "./HorizontalMenuDropdownItem";
import HorizontalMenuItem from "./HorizontalMenuItem";

import "./menu.css";
// eslint-disable-next-line import/order
import { GoArrowRight } from "react-icons/go";
import { useState } from "react";

type HorizontalMenuContentProps = {
  manuVariant: NavMode;
  userAuthority?: string[];
  pagePermission?: string[];
  subPagePermission?: string[];
};

const HorizontalMenuContent = ({
  manuVariant,
  userAuthority = [],
  pagePermission = [],
  subPagePermission = [],
}: HorizontalMenuContentProps) => {
  const [activeMenu, setActiveMenu] = useState<number | undefined>(0);

  const menuSelect = (index: number | undefined) => {
    setActiveMenu(index);
  };

  return (
    <span className="flex items-center">
      {navigationConfig.map((nav, index) => {
        if (
          nav?.type === NAV_ITEM_TYPE_TITLE ||
          nav?.type === NAV_ITEM_TYPE_COLLAPSE
        ) {
          return (
            <AuthorityCheck
              key={nav.key}
              pageKey={nav.key}
              authority={nav.authority}
              userAuthority={userAuthority}
              pagePermission={pagePermission}
              page={"main"}
            >
              <div
                className={
                  nav?.subMenu[0]?.subMenu?.length > 0
                    ? "header-mega-menu text-indigo-600 font-extrabold"
                    : "header-mega-menu-default"
                }
              >
                <Dropdown
                  trigger="hover"
                  renderTitle={
                    <HorizontalMenuItem
                      manuVariant={manuVariant}
                      nav={nav}
                      index={index}
                      activeMenu={activeMenu}
                      onClick={menuSelect}
                    />
                  }
                >
                  <div
                    className={
                      nav?.subMenu[0]?.subMenu?.length > 0
                        ? "grid grid-cols-6 gap-4 w-screen"
                        : ""
                    }
                  >
                    {nav?.subMenu?.map((secondarySubNav) => (
                      <AuthorityCheck
                        key={secondarySubNav.key}
                        pageKey={secondarySubNav.key}
                        authority={secondarySubNav.authority}
                        userAuthority={userAuthority}
                        pagePermission={subPagePermission}
                        page={"sec"}
                      >
                        {secondarySubNav.subMenu.length > 0 ? (
                          <div className="bg-white px-4 top-full  h-auto flex flex-row flex-wrap">
                            <div className="w-full h-auto columns-1">
                              <div className="flex items-center mb-1 text-indigo-600 font-semibold">
                                <GoArrowRight className="mr-1" />
                                {secondarySubNav.title}
                              </div>
                              <hr className="border-t-1 border-indigo-600 mb-2 mt-0" />
                              {secondarySubNav.subMenu.map((tertiarySubNav) => (
                                <AuthorityCheck
                                  key={tertiarySubNav.key}
                                  pageKey={tertiarySubNav.key}
                                  authority={tertiarySubNav.authority}
                                  userAuthority={userAuthority}
                                  pagePermission={subPagePermission}
                                  page={"thr"}
                                >
                                  <HorizontalMenuDropdownItem
                                    key={tertiarySubNav.key}
                                    icon={true}
                                    nav={tertiarySubNav}
                                  />
                                </AuthorityCheck>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <HorizontalMenuDropdownItem
                            key={secondarySubNav.key}
                            nav={secondarySubNav}
                            icon={false}
                          />
                        )}
                      </AuthorityCheck>
                    ))}
                  </div>
                </Dropdown>
              </div>
            </AuthorityCheck>
          );
        }
        if (nav.type === NAV_ITEM_TYPE_ITEM) {
          return (
            <AuthorityCheck
              key={nav.key}
              pageKey={nav.key}
              authority={nav.authority}
              userAuthority={userAuthority}
              pagePermission={pagePermission}
              page="comm"
            >
              <HorizontalMenuItem
                isLink
                nav={nav}
                manuVariant={manuVariant}
                index={index}
                activeMenu={activeMenu}
                onClick={menuSelect}
              />
            </AuthorityCheck>
          );
        }
        return <></>;
      })}
    </span>
  );
};

export default HorizontalMenuContent;
