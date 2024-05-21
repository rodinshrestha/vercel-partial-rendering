import React from 'react';

import styled, { css } from 'styled-components';
import { rem } from 'polished';

/** TODO: builderv2 relation between Banner and this component */
import { AlignmentType } from '@/builder/components/BannerBuilder/banner-type';
import ReactHtmlParser from '@/core/components/ReactHtmlParser';
import ImageWithFallback from '@/core/components/ImageWithFallback';

import { ClubFormBlockTypes } from './club-form-type';

type Props = {
  data: ClubFormBlockTypes;
  className?: string;
};
const ContactFormContentBlock = ({ data, className }: Props) => {
  const { content, position = 'left', stampIcon, stampContent } = data;
  return (
    <StyledContactFormContentBlock
      $contentPosition={position}
      className={className}
    >
      <div className="content">{content && ReactHtmlParser(content)}</div>
      {Boolean(stampContent || stampIcon) && (
        <StampWrapper className="mt-50">
          {stampIcon && (
            <ImageWithFallback
              src={stampIcon}
              alt="Card Image"
              quality={100}
              width={200}
              height={200}
            />
          )}
          {stampContent && (
            <div className="stamp-content">
              {stampContent && ReactHtmlParser(stampContent)}
            </div>
          )}
        </StampWrapper>
      )}
    </StyledContactFormContentBlock>
  );
};

export default ContactFormContentBlock;

const StyledContactFormContentBlock = styled.div<{
  $contentPosition: AlignmentType;
}>`
  ${({ theme, $contentPosition }) => css`
    text-align: ${$contentPosition};
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 0;
      text-transform: uppercase;
      ${theme.fontFamily.semibold}

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

const StampWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    padding: ${rem(25)};
    z-index: 1;
    justify-content: center;

    @media (max-width: ${theme.breakPoints.tablet}) {
      padding: ${rem(15)};
    }

    @media (max-width: ${theme.breakPoints.mobile}) {
      padding: ${rem(10)};
    }

    img {
      width: 177.66px;
      height: 177.74px;

      @media (max-width: ${theme.breakPoints.tablet}) {
        width: 130px;
        height: 130px;
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        width: 100px;
        height: 100px;
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        width: 115px;
        height: 115px;
      }
    }

    .stamp-content {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        text-transform: uppercase;
        margin-bottom: ${rem(15)};

        @media (max-width: ${theme.breakPoints.tablet}) {
          margin-bottom: ${rem(10)};
        }

        @media (max-width: ${theme.breakPoints.tablet}) {
          margin-bottom: ${rem(15)};
        }
      }

      h1,
      h2,
      h3 {
        font-size: ${rem(32)};
        line-height: ${rem(38)};
        letter-spacing: ${rem(3.2)};

        @media (max-width: ${theme.breakPoints.tablet}) {
          font-size: ${rem(24)};
          letter-spacing: ${rem(2.4)};
          line-height: ${rem(32)};
        }

        @media (max-width: ${theme.breakPoints.tab}) {
          font-size: ${rem(18)};
          letter-spacing: ${rem(1.8)};
          line-height: ${rem(26)};
        }

        @media (max-width: ${theme.breakPoints.mobile}) {
          font-size: ${rem(24)};
          letter-spacing: ${rem(2.4)};
          line-height: ${rem(32)};
        }
      }

      p {
        ${theme.fontFamily.light}
        font-size: ${rem(18)};
        letter-spacing: ${rem(1.8)};
        line-height: ${rem(32)};

        @media (max-width: ${theme.breakPoints.tablet}) {
          font-size: ${rem(16)};
          letter-spacing: ${rem(1.6)};
          line-height: ${rem(30)};
        }

        @media (max-width: ${theme.breakPoints.tab}) {
          font-size: ${rem(14)};
          letter-spacing: ${rem(1.4)};
          line-height: ${rem(24)};
        }
      }

      a {
        color: inherit;
        transition: 0.3s ease all;

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            border-bottom: 1px solid ${theme.coreColor.body.default.color};
          }
        }
      }
    }

    &:has(.stamp-content) {
      img {
        margin-right: ${rem(60)};

        @media (max-width: ${theme.breakPoints.tablet}) {
          margin-right: ${rem(30)};
        }

        @media (max-width: ${theme.breakPoints.tab}) {
          margin-right: ${rem(20)};
        }

        @media (max-width: ${theme.breakPoints.mobile}) {
          margin-right: ${rem(30)};
        }
      }
    }
  `}
`;
