"use client";

import React from "react";

import clsx from "clsx";
import styled, { css } from "styled-components";
import { rem } from "polished";

import { NavigationType } from "@/core/types/navigation-type";
import Drawer from "@/core/components/Drawer";
import SearchBar from "@/search/components/SearchBar";
import { ChannelsType } from "@/core/types/channels.types";

import useNavMenuStore from "../store/useNavMenuStore";
import FooterLanguageSelector from "../../Footer/FooterLanguageSelector";

import MobileMenu from "./MobileMenu";

type Props = {
  data: NavigationType;
  top: number;
  channelList: ChannelsType;
};

const MobileMenuDrawer = ({ data, top, channelList }: Props) => {
  const { items: primaryMenuList = [] } = data?.primary_menu || {};

  const { navMenuList, initalizeNavMenu, navMenuDrawer, toggleNavMenuDrawer } =
    useNavMenuStore();

  React.useEffect(() => {
    if (!navMenuDrawer) return;
    initalizeNavMenu(primaryMenuList);
  }, [initalizeNavMenu, primaryMenuList, navMenuDrawer]);

  return (
    <>
      <style>{`
        body {
          overflow:${navMenuDrawer ? "hidden" : "none"}
        }
      `}</style>

      <Drawer
        title=""
        open={navMenuDrawer}
        position="left"
        onClose={toggleNavMenuDrawer}
        width="100%"
        drawerZindex={5}
        overlayZindex={5}
        top={top}
        className="nav-drawer"
        overlay
      >
        <StyledMenuWrap className="mobile-menu">
          <SearchBar className={clsx("mobile-search")} />

          <FooterLanguageSelector
            className="single-selector header-selector"
            channelList={channelList}
          />

          <MobileMenu navMenuList={navMenuList} />
        </StyledMenuWrap>
      </Drawer>
    </>
  );
};

export default MobileMenuDrawer;

export const StyledMenuWrap = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: ${rem(15)} ${rem(40)} ${rem(18)};
    position: static;
    flex-grow: 1;
    ${theme.coreColor.header.default};
    border-bottom-left-radius: 30px;
    margin-left: 20px;

    @media (max-width: ${theme.breakPoints.tablet}) {
      display: none;
      padding: 0;
      position: relative;
    }

    &.mobile-menu {
      display: block;
      margin: 0;
      background: transparent;
      position: relative;
      height: 100%;

      @media (max-width: ${theme.breakPoints.mobile}) {
        padding: 0;
      }

      .mobile-search {
        margin-bottom: ${rem(25)};

        .search-list-wrapper {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: ${theme.coreColor.body.default.background};

          .search-item {
            max-height: calc(100vh - 200px);
            overflow: hidden auto;
            scroll-behavior: smooth;
          }
        }

        .search-loader {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: calc(100vh - 200px);
        }
      }

      .user-btn-wrap {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        ${theme.fontFamily.regular}
        gap: 40px;
        margin-bottom: ${rem(29)};

        .btn-icon {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
          ${theme.fontFamily.semibold}

          i {
            font-size: ${rem(16)};
          }

          span {
            &.fav-icon-wrap {
              position: relative;

              small {
                position: absolute;
                top: -4px;
                right: -4px;
                background-color: ${theme.coreColor.danger.default.background};
                width: 14px;
                height: 14px;
                border-radius: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: ${theme.coreColor.danger.default.color};
                font-size: 8px;
              }
            }

            &.user-name {
              display: inline-block;
            }
            span {
              padding-left: ${rem(15)};
            }
          }
        }
      }
      /* } */
    }
  `}
`;
