import React from 'react';

import styled, { css } from 'styled-components';
import clsx from 'clsx';
import { rem } from 'polished';

import ImageWithFallback from '@/core/components/ImageWithFallback';
import ContentBlock from '@/core/components/ContentBlock';
import { CardHeightTypes } from '@/core/components/ContentCard';

import { ImageBlockTypes } from '../../BannerBuilder/banner-type';

/** TODO: Reuse this type as this is common in other builders as well */
export type ColHeightType = 'large' | 'small' | 'medium';

type Props = {
  colHeight?: ColHeightType;
  data: ImageBlockTypes;
  className?: string;
};

const TwoColumnContent = ({ data, className, colHeight = 'large' }: Props) => {
  const { src } = data;
  return (
    <TwoColWrapper $colHeight={colHeight} className={clsx(className)}>
      <ColImageWrap>
        <ImageWithFallback
          src={src}
          alt="banner-image"
          className="object-cover"
          fill
          quality={100}
        />
      </ColImageWrap>

      <ContentBlock className="content-block" data={data} btnSkin="danger" />
    </TwoColWrapper>
  );
};

export default TwoColumnContent;

export const TwoColWrapper = styled.div<{
  $colHeight: CardHeightTypes;
}>`
  ${({ theme, $colHeight }) => css`
    position: relative;
    color: ${theme.color.white[1000]};
    border-radius: 20px;
    overflow: hidden;
    height: 100%;

    ${$colHeight === 'large' &&
    css`
      min-height: 480px;

      @media (max-width: ${theme.breakPoints.tablet}) {
        min-height: 320px;
      }
    `}

    ${$colHeight === 'medium' &&
    css`
      min-height: 420px;

      @media (max-width: ${theme.breakPoints.tablet}) {
        min-height: 300px;
      }
    `}

    ${$colHeight === 'small' &&
    css`
      min-height: 350px;

      @media (max-width: ${theme.breakPoints.tablet}) {
        min-height: 200px;
      }
    `}

    .content-block {
      position: relative;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      height: 100%;
      padding: ${rem(25)};

      @media (max-width: ${theme.breakPoints.tab}) {
        padding: ${rem(12)} ${rem(15)};
      }

      .content {
        max-width: 55%;

        @media (max-width: ${theme.breakPoints.tablet}) {
          max-width: 75%;
        }

        @media (max-width: ${theme.breakPoints.tab}) {
          max-width: 100%;
        }
      }
    }

    &.repater-item {
      .content-block {
        .btn-wrap {
          position: absolute;
          bottom: 20px;
          right: 20px;
          margin-top: 0;

          @media (max-width: ${theme.breakPoints.tablet}) {
            position: static;
            text-align: right;
            margin-top: ${rem(12)};
          }

          button {
            &:has(:only-child) {
              padding: ${rem(10)};
            }
          }
        }

        &:has(.content:empty) {
          .btn-wrap {
            position: static;
            text-align: right;

            .link-btn {
              justify-content: flex-end;
            }
          }
        }
      }
    }
  `}
`;

export const ColImageWrap = styled.div`
  ${() => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `}
`;
