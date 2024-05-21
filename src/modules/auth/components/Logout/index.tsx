"use client";

import React from "react";

import { useAuth } from "@/auth/hooks/useAuth";
import { StyledWrapper } from "@/core/components/Header/components/LoginIcon";
import { IconUser } from "@/core/components/Icons";
import useMediaQuery from "@/core/hooks/useMediaQuery";
import { breakPoints } from "@/theme/breakPoints";

import LogoutModal from "./LogoutModal";

const Logout = ({ title }: { title?: string }) => {
  const [loader, setLoader] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const isTab = useMediaQuery(breakPoints.tab);

  const { user, unAuthenticate } = useAuth();
  const ref = React.useRef(null);

  const handleLogout = () => {
    setLoader(true);
    unAuthenticate();
  };

  return (
    user && (
      <>
        <StyledWrapper ref={ref} className="log-btn">
          <span className="user icon" onClick={() => setIsOpen(true)}>
            {/* <i className="icon-logout" /> */}
            <IconUser size={16} />
            {title && isTab && <span> {title} </span>}
          </span>
        </StyledWrapper>
        <LogoutModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          loader={loader}
          handleLogout={handleLogout}
        />
      </>
    )
  );
};

export default Logout;
