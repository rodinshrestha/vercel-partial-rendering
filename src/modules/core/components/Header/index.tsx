"use client";
import React, { useRef } from "react";

import throttle from "lodash/throttle";

import { Container } from "@/core/components/Grid/Container";
import { Col } from "@/core/components/Grid/Col";
import { Row } from "@/core/components/Grid/Row";
import useMediaQuery from "@/core/hooks/useMediaQuery";
import { breakPoints } from "@/theme/breakPoints";
import type { NavigationType } from "@/core/types/navigation-type";
import CartDrawer from "@/cart/components/Drawer";
import WishlistDrawer from "@/wishlist/components/WishlistDrawer";
import SingleWishlistDrawer from "@/wishlist/components/SingleWishlistDrawer";
import SearchDrawer from "@/search/components/SearchDrawer";
import { ChannelsType } from "@/core/types/channels.types";

import RightMenu from "./components/RightMenu";
import { StyledHeader } from "./style";
import BrandLogo from "./components/BrandLogo";
import NavMenu from "./components/NavMenu";
import Hamburger from "./components/Hamburger";
import MobileMenuDrawer from "./components/MobileMenuDrawer";

type Props = {
  data: NavigationType;
  channelList: ChannelsType;
  children: React.ReactNode;
};

const Header = ({ data, channelList, children }: Props) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isTab = useMediaQuery(breakPoints.tablet);

  const [isScroll, setIsScroll] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);

  React.useEffect(() => {
    const detectScroll = throttle(() => {
      setIsScroll(window.scrollY > 20);
    }, 10);
    window.addEventListener("scroll", detectScroll);

    return () => {
      window.removeEventListener("scroll", detectScroll);
    };
  }, []);

  return (
    <>
      <StyledHeader className={isScroll ? "sticky" : ""} ref={headerRef}>
        <Container fluid>
          <Row noGutter>
            <Col>
              <div className="nav-wrapper">
                {isTab && (
                  <div className="humburger-wrap">
                    <Hamburger />
                  </div>
                )}
                {!isTab && <NavMenu data={data?.primary_menu?.items || []} />}
                <BrandLogo className="header-logo" />
                <RightMenu
                  onHandleSearch={setShowSearch}
                  channelList={channelList}
                >
                  {children}
                </RightMenu>
              </div>
            </Col>
          </Row>
        </Container>
      </StyledHeader>

      {/* single WishListDrawer */}
      <SingleWishlistDrawer />

      {/* Wishtlist Drawer */}
      <WishlistDrawer />

      {/* Cart Drawer */}
      <CartDrawer />

      <SearchDrawer isOpen={showSearch} onHandleSearch={setShowSearch} />

      <MobileMenuDrawer data={data} top={0} channelList={channelList} />
    </>
  );
};

export default Header;
