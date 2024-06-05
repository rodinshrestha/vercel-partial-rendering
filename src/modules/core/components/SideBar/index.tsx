"use client";
import React from "react";

import { usePathname } from "next/navigation";
import clsx from "clsx";

import useTranslations from "@/core/hooks/useTranslations";
import Button from "@/core/components/Button";
import Link from "@/core/components/Link";
import { isCurrentRouteActive } from "@/core/utils/route";
import { useAuth } from "@/auth/hooks/useAuth";
import LogoutModal from "@/auth/components/Logout/LogoutModal";
import useMediaQuery from "@/core/hooks/useMediaQuery";
import { breakPoints } from "@/theme/breakPoints";
import { unslufigy } from "@/core/utils/string";

import { IconMinus, IconPlus } from "../Icons";

import { SideBarWrapper } from "./style";

type Props = {
  hasButton?: boolean;
  hasOpener?: boolean;
  className?: string;
  route: Array<{
    title: string;
    link: string;
    id: string;
  }>;
};

const getPageTitle = (pathname: string) => {
  return unslufigy(pathname.split("/").at(-1) || "");
};

const SideBar = ({
  className,
  hasButton = true,
  hasOpener = true,
  route = [],
}: Props) => {
  const [loader, setLoader] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [SidebarActive, setSidebarActive] = React.useState(true);
  const isTab = useMediaQuery(breakPoints.tab);

  const { _t } = useTranslations();
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname) || "Home";
  const { unAuthenticate } = useAuth();

  const handleLogout = () => {
    setLoader(true);
    unAuthenticate();
  };

  return (
    <>
      <SideBarWrapper className={clsx("side-bar", className)}>
        {hasOpener && (
          <div className="sidebar-opener d-lg-none">
            <span
              onClick={() => setSidebarActive((prev) => !prev)}
              className="sidebar-text"
            >
              {pageTitle ? `${pageTitle}` : "My page"}

              {!SidebarActive ? <IconMinus size={9} /> : <IconPlus size={9} />}
            </span>
          </div>
        )}
        <div
          className={!SidebarActive ? "side-bar-wrap show" : "side-bar-wrap"}
        >
          <div
            className={clsx("sidebar-menu", {
              "b2c-sidebar-menu": true,
              show: !SidebarActive,
            })}
          >
            <ul>
              {route.map((item) => {
                return (
                  <li className="side-bar-item" key={item.id}>
                    <Link
                      href={item.link}
                      className={clsx({
                        active: isCurrentRouteActive(item.id, pathname),
                      })}
                      onClick={() => setSidebarActive((prev) => !prev)}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {isTab && hasButton && (
              <div className="btn-wrapper">
                <Button
                  skin="primary"
                  variant="contained"
                  size="fullWidth"
                  onClick={() => setIsOpen(true)}
                >
                  {_t("log_out", "Log Out")}
                </Button>
              </div>
            )}
          </div>

          {!isTab && hasButton && (
            <div className="btn-wrapper">
              <Button
                skin="primary"
                variant="contained"
                size="fullWidth"
                onClick={() => setIsOpen(true)}
              >
                {_t("log_out", "Log Out")}
              </Button>
            </div>
          )}
        </div>
      </SideBarWrapper>

      <LogoutModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        loader={loader}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default SideBar;
