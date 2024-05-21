import React from "react";

import styled, { css } from "styled-components";
import { rem } from "polished";

/** TODO: builderv2 relation between Banner and this component */
import {
  AlignmentType,
  ImageBlockTypes,
} from "@/builder/components/BannerBuilder/banner-type";

import Button, { SkinType } from "../Button";
import ReactHtmlParser from "../ReactHtmlParser";

type Props = {
  data: ImageBlockTypes;
  className?: string;
  btnSkin?: SkinType;
};
const ContentBlock = ({ data, className, btnSkin }: Props) => {
  const {
    content,
    title,
    buttonLabel,
    btnLink,
    position = "left",
    showBtn,
    tag = "h2",
  } = data;
  return (
    <StyledContentBlock $contentPosition={position} className={className}>
      <div className="content">
        {title && (
          <StyledTitle as={tag}>{<strong>{title}</strong>}</StyledTitle>
        )}
        {content && ReactHtmlParser(content)}
      </div>
      {btnLink && buttonLabel && showBtn && (
        <StyledBtnWrapper className="btn-wrap">
          <Button
            href={btnLink || "#"}
            variant="contained"
            skin={btnSkin || "primary"}
          >
            {buttonLabel && <span> {buttonLabel}</span>}
            <i className="icon-right_arrow" />
          </Button>
        </StyledBtnWrapper>
      )}
    </StyledContentBlock>
  );
};

export default ContentBlock;

const StyledContentBlock = styled.div<{ $contentPosition: AlignmentType }>`
  ${({ $contentPosition }) => css`
    text-align: ${$contentPosition};
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 0;

      & + p {
        margin-top: ${rem(15)};
      }
    }

    p {
      margin-bottom: 0;

      & + p {
        margin-top: ${rem(20)};
      }

      & + h1,
      & + h2,
      & + h3,
      & + h4,
      & + h5,
      & + h6 {
        margin-top: ${rem(50)};
      }
    }
  `}
`;

export const StyledTitle = styled.h3`
  text-transform: uppercase;
`;

const StyledBtnWrapper = styled.div`
  ${() => css`
    margin-top: ${rem(35)};

    a {
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          opacity: 1;
        }
      }
    }
  `}
`;
