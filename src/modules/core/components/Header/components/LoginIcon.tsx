"use client";
import React from "react";

import styled, { css } from "styled-components";

import useTranslations from "@/core/hooks/useTranslations";
import { setCallBackURL } from "@/core/utils/url";
import { ProfileUser } from "@/auth/types/user.types";

import Link from "../../Link";
import { IconUser } from "../../Icons";

type Props = {
  children?: React.ReactNode;
  user: ProfileUser | null;
};

const LoginIcon = ({ children, user }: Props) => {
  const { _t } = useTranslations();

  if (user) {
    return (
      <Link href="/account/my-profile">
        {children ? (
          children
        ) : (
          <>
            <span className="user user-name icon">
              {_t("my_account", "My Account")}
            </span>
            <IconUser className="menu-svg" size={16} />
          </>
        )}
      </Link>
    );
  }

  return (
    <div className="log-btn">
      <Link href="/login" onClick={() => setCallBackURL()}>
        <span className="user-name">{_t("log_in", "Log In")}</span>
        <IconUser className="menu-svg" size={16} />
      </Link>
    </div>
  );
};

export default LoginIcon;

export const StyledWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    line-height: 0;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        span.icon {
          .loader-wrap {
            .spinner {
              border-top-color: ${theme.color.white[1000]};
              border-left-color: ${theme.color.white[1000]};
            }
          }
        }
      }
    }

    .icon {
      display: flex;
      align-items: center;
    }

    .user-name {
      @media (max-width: ${theme.breakPoints.tablet}) {
        display: none;
      }
    }

    .menu-svg {
      display: none;

      @media (max-width: ${theme.breakPoints.tablet}) {
        display: block;
      }
    }
  `}
`;
