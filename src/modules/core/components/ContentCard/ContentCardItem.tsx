import React from 'react';

import styled from 'styled-components';
import { css } from 'styled-components';
import { rem } from 'polished';
import clsx from 'clsx';

import {
  BackgroundSizeType,
  ContentType,
} from '@/builder/components/ContentBlockBuilder/card-section-type';
import { AlignmentType } from '@/builder/components/BannerBuilder/banner-type';

import { StyledTitle } from '../ContentBlock';
import Button from '../Button';
import { getWidthString } from '../Grid/Col';
import ReactHtmlParser from '../ReactHtmlParser';
import ImageWithFallback from '../ImageWithFallback';
import Link from '../Link';
import Overlay from '../Overlay';

import { CardHeightTypes, CardLayoutType } from '.';

export type CardProps = {
  title?: string;
  src: string;
  href?: string;
  content?: string;
  btnLabel?: string;
  tag?: string;
  layoutType: number;
  description?: string;
  contentType: ContentType;
  newTab: number;
  contentPosition?: AlignmentType;
  buttonPosition?: AlignmentType;
  backgroundSize?: BackgroundSizeType;
  color?: string;
  stamp_icon: string;
  stamp_description: string;
  show_stamp?: 0 | 1;
};
type ContentCardItemProps = Omit<CardLayoutType, 'data'> & {
  data: CardProps;
};
const ContentCardItem = ({
  data,
  rounded = '0',
  cardHeight = 'medium',
}: ContentCardItemProps) => {
  const {
    content,
    btnLabel,
    tag = 'h2',
    title,
    src,
    href,
    layoutType,
    description,
    contentPosition = 'center',
    buttonPosition = 'center',
    backgroundSize,
    color,
    contentType,
    stamp_icon,
    stamp_description,
    show_stamp,
  } = data;

  return (
    <StyledCard className="content-card-item" $layoutType={layoutType}>
      <StyledCardWrap>
        {contentType === 'image' && (
          <Link className="whole-link" href={href || '#'}>
            <StyledCardImage $rounded={rounded} $cardHeight={cardHeight}>
              <Overlay />
              <ImageWithFallback
                src={src}
                fill
                className={clsx(backgroundSize && `object-${backgroundSize}`)}
                alt="Card Image"
                quality={100}
              />
            </StyledCardImage>
          </Link>
        )}

        {(title || content || description || btnLabel) && (
          <StyledCardContentWrapper
            className={clsx(contentType === 'editor' && 'editor-content')}
          >
            <StyledCardContent
              className={clsx(contentPosition && `text-${contentPosition}`)}
              style={{ color }}
            >
              {title && (
                <StyledTitle as={tag as string}>
                  <strong>{title}</strong>
                </StyledTitle>
              )}
              {content && ReactHtmlParser(content)}
              {description && ReactHtmlParser(description)}
            </StyledCardContent>

            {btnLabel && (
              <StyledBtnWrapper
                className={clsx(
                  buttonPosition && `text-${buttonPosition}`,
                  'btn-wrap'
                )}
              >
                <Button href={href} variant="contained" skin="primary">
                  {btnLabel}
                  <i className="icon-right_arrow" />
                </Button>
              </StyledBtnWrapper>
            )}
          </StyledCardContentWrapper>
        )}

        {Boolean(Number(show_stamp)) && (
          <StampWrapper>
            <ImageWithFallback
              src={stamp_icon}
              alt="Card Image"
              quality={100}
              width={200}
              height={200}
            />
            {stamp_description && (
              <div className="stamp-content">
                {stamp_description && ReactHtmlParser(stamp_description)}
              </div>
            )}
          </StampWrapper>
        )}
      </StyledCardWrap>
    </StyledCard>
  );
};

export default ContentCardItem;

const StyledCardWrap = styled.div`
  ${() => css`
    position: relative;
    height: 100%;

    a {
      &.link {
        position: relative;
        z-index: 1;
      }
    }
  `}
`;

const StyledCardImage = styled.div<{
  $rounded: string;
  $cardHeight: CardHeightTypes;
}>`
  ${({ theme, $rounded, $cardHeight }) => css`
    position: relative;
    overflow: hidden;
    height: 100%;
    padding-top: 56.56%;
    min-height: 390px;

    ${$rounded &&
    css`
      border-radius: ${$rounded};
    `}
    ${$cardHeight === 'large' &&
    css`
      padding-top: 98%;
      max-height: 630px;

      @media (min-width: calc(${theme.breakPoints.largeDesktop} + 1px)) {
        padding-top: 90%;
      }
    `}
    ${$cardHeight === 'medium' &&
    css`
      padding-top: 75%;
      max-height: 520px;

      @media (min-width: calc(${theme.breakPoints.largeDesktop} + 1px)) {
        padding-top: 70%;
      }
    `}
    ${$cardHeight === 'small' &&
    css`
      padding-top: 56.56%;
      max-height: 420px;
    `}
  `}
`;

const StyledCardContentWrapper = styled.div`
  ${({ theme }) => css`
    position: absolute;
    bottom: 20px;
    left: 0;
    padding: ${rem(25)};
    z-index: 1;

    @media (max-width: ${theme.breakPoints.tablet}) {
      padding: ${rem(15)};
    }

    @media (max-width: ${theme.breakPoints.mobile}) {
      padding: ${rem(10)};
      width: 100%;
    }

    &.editor-content {
      position: relative;
      bottom: auto;
      left: auto;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;

      img {
        object-fit: contain;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-bottom: 0;

        & + h1,
        & + h2,
        & + h3,
        & + h4,
        & + h5,
        & + h6 {
          margin-top: ${rem(25)};
        }

        & + p {
          margin-top: ${rem(15)};
        }

        & + ul {
          margin-top: ${rem(25)};
        }
      }

      p {
        margin-bottom: 0;

        @media (max-width: ${theme.breakPoints.mobile}) {
          font-size: ${rem(12)};
          line-height: ${rem(18)};
          letter-spacing: ${rem(1.2)};
        }

        & + h1,
        & + h2,
        & + h3,
        & + h4,
        & + h5,
        & + h6 {
          margin-top: ${rem(50)};
        }

        & + p,
        & + ul {
          margin-top: ${rem(20)};
        }

        &:has(table) {
          overflow: auto;
          scroll-behavior: smooth;
          padding-bottom: 5px;

          ::-webkit-scrollbar {
            display: none;
          }
        }
      }

      ul {
        margin-bottom: ${rem(25)};
        list-style: none;

        li {
          position: relative;
          padding-left: ${rem(30)};
          font-size: ${rem(12)};
          line-height: ${rem(18)};
          letter-spacing: ${rem(1.2)};

          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 4px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: ${theme.coreColor.body.default.color};
          }

          a {
            color: inherit;

            @media (hover: hover) and (pointer: fine) {
              &:hover {
                opacity: 0.6;
              }
            }
          }

          & + li {
            margin-top: ${rem(35)};
          }

          strong {
            ${theme.fontFamily.semibold}
            font-size: ${rem(14)};
            letter-spacing: ${rem(1.4)};
            line-height: ${rem(14)};
          }
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

      .btn-wrap {
        margin-top: ${rem(20)};
      }

      table {
        max-width: 100%;
        width: 100% !important;

        tr {
          td {
            padding: ${rem(10)} ${rem(15)};

            @media (max-width: ${theme.breakPoints.tab}) {
              min-width: 250px;
            }
          }
        }
      }
    }
  `}
`;

const StyledBtnWrapper = styled.div`
  ${({ theme }) => css`
    z-index: 1;

    @media (max-width: ${theme.breakPoints.mobile}) {
      margin-left: auto;
    }
  `}
`;

const StyledCard = styled.div<{ $layoutType: number }>`
  ${({ theme, $layoutType }) => css`
    padding: 0 ${rem(5)};
    ${getWidthString($layoutType)};

    @media (max-width: ${theme.breakPoints.mobile}) {
      flex: 0 0 100%;
      max-width: 100%;
    }
  `}
`;

const StyledCardContent = styled.div`
  ${({ theme }) => css`
    z-index: 1;

    h1 {
      font-size: ${rem(72)};
      letter-spacing: ${rem(7.2)};
      line-height: ${rem(80)};

      @media (max-width: ${theme.breakPoints.tab}) {
        font-size: ${rem(50)};
        letter-spacing: ${rem(5)};
        line-height: ${rem(58)};
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        font-size: ${rem(43)};
        letter-spacing: ${rem(4.3)};
        line-height: ${rem(52)};
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      text-transform: uppercase;
    }
  `}
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
