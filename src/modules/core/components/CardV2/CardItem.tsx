import React from "react";

import styled, { css } from "styled-components";
import { rem } from "polished";
import clsx from "clsx";

import Link from "../Link";
import ImageWithFallback from "../ImageWithFallback";
import Overlay from "../Overlay";

export type CardProps = {
  title?: string;
  src: string | null;
  href?: string;
  content?: string;
  btnLabel?: string;
  tag?: string;
  cardHeight?: "large" | "medium" | "small";
  customImageTitle?: number;
  className?: string;
  rounded?: number | string;
};
const CardItem = ({
  title,
  tag,
  src,
  href = "#",
  content,
  cardHeight = "small",
  className,
  rounded = 0,
}: CardProps) => {
  return (
    <StyledCardItem className={clsx("card-item", className)}>
      <StyledCardWrap>
        <Link href={"/category/" + href}>
          <StyledCardImage
            $rounded={rounded}
            className="card-img"
            $cardHeight={cardHeight}
          >
            <Overlay />
            <ImageWithFallback
              src={src || ""}
              className="object-cover"
              alt="Card Image"
              fill
            />
          </StyledCardImage>
          <StyledCardContent
            className={clsx("card-content", {
              "alt-card": cardHeight === "small",
            })}
          >
            {title && <h6 className={tag}>{title}</h6>}
            {content && <p>{content}</p>}
          </StyledCardContent>
        </Link>
      </StyledCardWrap>
    </StyledCardItem>
  );
};

export default CardItem;

const StyledCardItem = styled.div`
  ${() => css`
    cursor: pointer;
    display: block;
    position: relative;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        img {
          transform: scale(1);
        }
      }
    }
  `}
`;

const StyledCardWrap = styled.div`
  ${() => css`
    position: relative;
  `}
`;

const StyledCardImage = styled.div<{
  $rounded: number | string;
  $cardHeight: CardProps[`cardHeight`];
}>`
  ${({ $cardHeight, theme, $rounded }) => css`
    position: relative;
    overflow: hidden;
    border-radius: ${$rounded};
    background-color: ${theme.color.green[200]};
    padding-top: 56.56%;

    &:has(img) {
      background-color: transparent;
    }

    ${$cardHeight === "large" &&
    css`
      padding-top: 130%;
    `}
    ${$cardHeight === "medium" &&
    css`
      padding-top: 122%;
    `}
    ${$cardHeight === "small" &&
    css`
      padding-top: 125%;
    `}
  `}
`;
const StyledCardContent = styled.div`
  ${({ theme }) => css`
    position: absolute;
    bottom: 30px;
    left: 0;
    padding: 0 ${rem(25)};
    color: ${theme.coreColor.dark.default.color};
    text-transform: uppercase;
    z-index: 1;
    width: 100%;
    text-align: left;

    @media (max-width: ${theme.breakPoints.tablet}) {
      padding: 0 ${rem(20)};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: ${rem(44)};
      letter-spacing: ${rem(1.4)};
      line-height: ${rem(52)};

      @media (min-width: calc( ${theme.breakPoints
          .mobile} + 1px)) and (max-width: ${theme.breakPoints.tablet}) {
        font-size: ${rem(32)};
        line-height: ${rem(40)};
        letter-spacing: ${rem(3.2)};
      }
    }

    &.alt-card {
      position: static;
      padding: ${rem(10)} 0;
      color: ${theme.coreColor.body.default.color};

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        ${theme.fontFamily.semibold}
        font-size: ${rem(18)};
        letter-spacing: ${rem(1.8)};
        line-height: ${rem(22)};
        padding-right: ${rem(15)};

        @media (max-width: ${theme.breakPoints.tablet}) {
          font-size: ${rem(16)};
          line-height: ${rem(22)};
          letter-spacing: ${rem(1.6)};
        }

        @media (max-width: ${theme.breakPoints.mobile}) {
          font-size: ${rem(10)};
          line-height: ${rem(14)};
          letter-spacing: ${rem(1)};
        }
      }
    }
  `}
`;
