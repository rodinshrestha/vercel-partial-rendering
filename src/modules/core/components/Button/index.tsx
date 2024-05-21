"use client";
import React from "react";

import clsx from "clsx";
import styled, { css } from "styled-components";
import { rem } from "polished";

import Link, { HrefType } from "@/core/components/Link";
import Loader from "@/core/components/Loader";

export type SkinType =
  | "primary"
  | "secondary"
  | "sucess"
  | "warning"
  | "info"
  | "danger"
  | "light"
  | "dark"
  | "body";
export type VariantType = "contained" | "outline" | "link" | "transparent";
export type SizeType = "sm" | "md" | "lg" | "fullWidth" | null;

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  rounded?: string | number;
  fullWidth?: boolean;
  href?: HrefType;
  skin: SkinType;
  variant: VariantType;
  size?: SizeType;
  onClick?: (data: any) => void;
  isLoading?: boolean;
  disabled?: boolean;
  asSelfLink?: boolean;
  type?: "button" | "submit";
  newTab?: boolean;
};

const Button = ({
  children,
  className,
  skin = "primary",
  rounded = "0",
  fullWidth = false,
  variant = "contained",
  size = "sm",
  href,
  onClick,
  disabled = false,
  isLoading = false,
  asSelfLink,
  type = "submit",
  newTab = false,
}: ButtonProps &
  (JSX.IntrinsicElements["button"] & JSX.IntrinsicElements["a"])) => {
  if (href) {
    return (
      <StyledLinkedBtn
        className={clsx(className, "link-btn")}
        $skin={skin}
        $rounded={rounded}
        $fullWidth={fullWidth}
        $size={size}
        $variant={variant}
        onClick={onClick}
        disabled={disabled}
        $isLoading={isLoading}
      >
        <Link href={href} asSelfLink={asSelfLink} newTab={newTab}>
          {children}
        </Link>
      </StyledLinkedBtn>
    );
  }

  return (
    <StyledButton
      className={clsx(className)}
      $skin={skin}
      $rounded={rounded}
      $fullWidth={fullWidth}
      $size={size}
      $variant={variant}
      onClick={onClick}
      as={href ? Link : "button"}
      {...(href ? { href } : {})}
      disabled={disabled}
      $isLoading={isLoading}
      type={type}
    >
      {isLoading && (
        <Loader color={skin || "primary"} type="spinner" size="18px" />
      )}
      {!isLoading && children}
    </StyledButton>
  );
};

export default Button;

const StyledButtonCss = (
  $rounded?: string | number,
  $fullWidth?: boolean,
  $skin?: SkinType
) => css`
  ${({ theme }) => css`
    ${theme.fontFamily.regular}
    background-color: transparent;
    padding: ${rem(15)};
    display: inline-flex;
    transition: 0.3s ease all;
    border: none;
    cursor: pointer;
    margin-right: ${rem(15)};
    font-size: ${rem(14)};
    line-height: ${rem(18)};
    position: relative;
    text-align: center;
    gap: 5px;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    &:last-child {
      margin-right: 0;
    }

    svg {
      fill: ${theme.coreColor[$skin || "primary"].default.color};
      transition: 0.3s ease all;

      text {
        fill: ${theme.coreColor[$skin || "primary"].default.color};
      }
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        svg {
          fill: ${theme.coreColor[$skin || "primary"].hover.color};
          transition: 0.3s ease all;

          text {
            fill: ${theme.coreColor[$skin || "primary"].hover.color};
          }
        }
      }
    }

    ${$rounded &&
    css`
      border-radius: ${$rounded};
    `}

    ${$fullWidth &&
    css`
      width: 100%;
    `}

    i {
      line-height: inherit;
      font-size: ${rem(12)};
    }

    &:has(.arrow) {
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          svg {
            transform: translateX(10px);
          }
        }
      }
    }

    .loader-wrap {
      position: static;
      transform: none;
      margin: 0 auto;
    }
  `}
`;

const StyledButton = styled.div<
  (JSX.IntrinsicElements["button"] & JSX.IntrinsicElements["a"]) & {
    $rounded: string | number;
    $skin: SkinType;
    $fullWidth: boolean;
    $isLoading: boolean;
    $variant: VariantType;
    $size: SizeType;
  }
>`
  ${({
    theme,
    $rounded,
    $fullWidth,
    $skin,
    $variant,
    $isLoading,
    $size,
    disabled,
  }) => css`
    ${StyledButtonCss($rounded, $fullWidth)}

    ${disabled &&
    css`
      cursor: not-allowed;
      background-color: ${theme.coreColor[$skin].disabled};
      opacity: 0.5;
      pointer-events: none;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: ${theme.coreColor[$skin].disabled};
        }
      }

      span {
        pointer-events: none;
      }
    `}

    ${$variant === "contained" &&
    css`
      background-color: ${theme.coreColor[$skin].default.background};
      color: ${theme.coreColor[$skin].default.color};

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: ${theme.coreColor[$skin].hover.background};
          color: ${theme.coreColor[$skin].hover.color};
        }
      }
    `}

    ${$variant === "outline" &&
    css`
      border-width: 1px;
      border-style: solid;
      border-color: ${theme.coreColor[$skin].default.background};
      color: ${theme.coreColor[$skin].default.background};

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          border-color: ${theme.coreColor[$skin].hover.background};
          color: ${theme.coreColor[$skin].hover.background};
        }
      }
    `}

    ${$variant === "link" &&
    css`
      background-color: transparent;
      color: ${theme.coreColor[$skin].default.background};
      padding: 0;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: ${theme.coreColor[$skin].hover.color};
          opacity: 0.6;
        }
      }
    `}


    ${$variant === "transparent" &&
    css`
      background-color: transparent;
      color: inherit;
      padding: 0;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          opacity: 0.8;

          svg {
            fill: inherit;

            text {
              fill: inherit;
            }
          }
        }
      }

      svg {
        fill: inherit;

        text {
          fill: inherit;
        }
      }

      ${disabled &&
      css`
        cursor: not-allowed;
        background-color: transparent;
        opacity: 0.5;
        pointer-events: none;

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            background-color: transparent;
          }
        }
      `}
    `}

    ${$isLoading &&
    css`
      cursor: not-allowed;
      // background-color: ${theme.coreColor[$skin].disabled};

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: ${theme.coreColor[$skin].disabled};
        }
      }

      span {
        visibility: hidden;
        pointer-events: none;
      }

      i {
        visibility: hidden;
      }
    `}

    ${$size === "sm" &&
    css`
      min-width: 38px;
    `}
    ${$size === "md" &&
    css`
      min-width: 100px;
    `}
     
      ${$size === "lg" &&
    css`
      min-width: 150px;
    `}
       ${$size === "fullWidth" &&
    css`
      min-width: 100%;
    `}
  `}
`;

const StyledLinkedBtn = styled.div<
  (JSX.IntrinsicElements["button"] & JSX.IntrinsicElements["a"]) & {
    $rounded: string | number;
    $skin: SkinType;
    $fullWidth: boolean;
    $isLoading: boolean;
    $variant: VariantType;
    $size: SizeType;
  }
>`
  ${({
    theme,
    $rounded,
    $fullWidth,
    $skin,
    $variant,
    $isLoading,
    $size,
    disabled,
  }) => css`
    a {
      ${StyledButtonCss($rounded, $fullWidth)}

      i {
        font-size: 10px;
        line-height: 10px;
      }

      ${$variant === "contained" &&
      css`
        background-color: ${theme.coreColor[$skin].default.background};
        color: ${theme.coreColor[$skin].default.color};

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            background-color: ${theme.coreColor[$skin].hover.background};
            color: ${theme.coreColor[$skin].hover.color};
          }
        }
      `}

      ${$variant === "outline" &&
      css`
        border-width: 1px;
        border-style: solid;
        border-color: ${theme.coreColor[$skin].default.background};
        color: ${theme.coreColor[$skin].default.background};

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            border-color: ${theme.coreColor[$skin].hover.background};
            color: ${theme.coreColor[$skin].hover.background};
          }
        }
      `}

    ${$variant === "link" &&
      css`
        background-color: transparent;
        color: ${theme.coreColor[$skin].default.background};
        padding: 0;

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: ${theme.coreColor[$skin].hover.color};
            opacity: 0.8;
          }
        }
      `}


    ${$variant === "transparent" &&
      css`
        background-color: transparent;
        color: inherit;
        padding: 0;

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            opacity: 0.6;

            svg {
              fill: inherit;

              text {
                fill: inherit;
              }
            }
          }
        }

        svg {
          fill: inherit;

          text {
            fill: inherit;
          }
        }
      `}

    ${$isLoading &&
      css`
        cursor: not-allowed;
        // background-color: ${theme.coreColor[$skin].disabled};

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            background-color: ${theme.coreColor[$skin].disabled};
          }
        }
        span {
          visibility: hidden;
          pointer-events: none;
        }

        i {
          visibility: hidden;
        }
      `}

    ${disabled &&
      css`
        cursor: not-allowed;
        background-color: ${theme.coreColor[$skin].disabled};
        opacity: 0.5;

        span,
        a {
          pointer-events: none;
        }

        i {
          visibility: hidden;
        }

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            background-color: ${theme.coreColor[$skin].disabled};
            color: inherit;
          }
        }
      `}
      
    ${$size === "sm" &&
      css`
        min-width: 38px;
      `}
    ${$size === "md" &&
      css`
        min-width: 100px;
      `}
     
      ${$size === "lg" &&
      css`
        min-width: 150px;
      `}
       ${$size === "fullWidth" &&
      css`
        min-width: 100%;
      `}
    }

    ${disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.5;

      span,
      a {
        pointer-events: none;
      }
    `}
  `}
`;
