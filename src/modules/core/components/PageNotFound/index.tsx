"use client";
import React from "react";

import { rem } from "polished";
import styled, { css } from "styled-components";
import clsx from "clsx";

import useTranslations from "@/core/hooks/useTranslations";
// import useVendor from '@/hooks/useVendor';
import Button from "@/core/components/Button";

//NEED to re work on translation
type props = {
  title: string;
  content: string;
  status?: number;
  className?: string;
  showButton?: boolean;
  height?: number | string;
  removeCookie?: boolean;
};

const PageNotFound = ({
  status = 404,
  title,
  content,
  showButton = true,
  className,
  height = "calc(100vh - 131px)",
  //   removeCookie = false,
}: props) => {
  const { _t } = useTranslations();

  return (
    <>
      <StyledDiv height={height} className={clsx(className, "message-content")}>
        <div className="content-wrapper">
          <h1>
            <strong>
              {status}
              <br />
              {title}
            </strong>
          </h1>

          <p>{content}</p>

          {showButton && (
            <div className="btn-wrapper">
              <Button skin="primary" variant="contained" href="/" asSelfLink>
                {_t("back_to_home", "Take me back home")}
              </Button>
            </div>
          )}
        </div>
      </StyledDiv>
    </>
  );
};

export default PageNotFound;

const StyledDiv = styled.div<{ height: number | string }>`
  ${({ theme, height }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    height: ${height ? `${height}` : "calc(100vh - 131px)"};
    justify-content: center;
    align-items: center;
    padding: ${rem(20)} 0;

    @media (max-width: ${theme.breakPoints.mobile}) {
      max-width: 100%;
    }

    .content-wrapper {
      text-align: center;
      max-width: 65%;
      margin: auto;
      position: relative;
      z-index: 1;

      @media (max-width: ${theme.breakPoints.tab}) {
        max-width: 80%;
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        max-width: 100%;
        padding: ${rem(10)};
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;

      & + P {
        margin-top: ${rem(25)};
      }
    }

    h1 {
      font-size: ${rem(72)};
      line-height: ${rem(80)};
      ${theme.fontFamily.regular}

      @media (max-width: ${theme.breakPoints.tab}) {
        font-size: ${rem(42)};
        line-height: ${rem(48)};
      }
    }

    p {
      ${theme.fontFamily.regular}
      font-size: ${rem(22)};
      line-height: ${rem(28)};

      @media (max-width: ${theme.breakPoints.tab}) {
        font-size: ${rem(18)};
        line-height: ${rem(24)};
      }
    }

    .btn-wrapper {
      margin-top: ${rem(50)};

      .link-btn {
        justify-content: center;

        a {
          text-decoration: none;

          /*
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              text-decoration: underline;
            }
          } */
        }
      }
    }

    &.account-error {
      height: 50vh;
      background: ${theme.color.white[1000]};
      border-radius: 20px;
      max-width: 100%;

      .content-wrapper {
        max-width: 50%;
        margin: auto;

        @media (max-width: ${theme.breakPoints.mobile}) {
          max-width: 100%;
        }
      }
    }

    &.server-error {
      margin: 0 ${rem(20)};

      @media (max-width: ${theme.breakPoints.mobile}) {
        margin: 0 ${rem(10)};
      }
    }
  `}
`;
