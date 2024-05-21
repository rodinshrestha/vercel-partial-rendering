import React from 'react';

import styled, { css } from 'styled-components';
import { rem } from 'polished';

import ImageWithFallback from '@/core/components/ImageWithFallback';
import Link from '@/core/components/Link';
import { linkGenerator } from '@/product/utils/link-generator';
import Overlay from '@/core/components/Overlay';

import { CategoryImageType } from '../category-image-block.type';

const CategoryImage = ({ item }: { item: CategoryImageType }) => {
  const { src, title, link } = item;
  const href = linkGenerator(link);
  console.log(href !== '#', '@@');
  return (
    <StyledDiv className="category-image-block image-item">
      <Overlay opacity={0.85} zIndex={2} />
      {href && href !== '#' && (
        <Link
          className="whole-link"
          href={linkGenerator(link)}
          newTab={Boolean(link.newTab)}
        />
      )}
      {title && href && href !== '#' ? (
        <Link
          className="whole-link"
          href={linkGenerator(link)}
          newTab={Boolean(link.newTab)}
        >
          <h5 className="category-title">
            <strong>{title}</strong>
          </h5>
        </Link>
      ) : (
        <h5 className="category-title">
          <strong>{title}</strong>
        </h5>
      )}

      {src && (
        <ImageWithFallback
          src={src || '#'}
          alt="text-image"
          className="object-cover"
          fill
        />
      )}
    </StyledDiv>
  );
};

export default CategoryImage;

const StyledDiv = styled.div`
  ${({ theme }) => css`
    position: relative;
    padding-top: 20%;
    min-height: 259px;

    .whole-link {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 2;
    }

    .category-title {
      font-size: ${rem(21)};
      line-height: ${rem(30)};
      letter-spacing: ${rem(2.1)};
      color: ${theme.coreColor.dark.default.color};
      text-transform: uppercase;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: ${rem(20)};
      z-index: 2;

      @media (max-width: ${theme.breakPoints.tablet}) {
        font-size: ${rem(16)};
        line-height: ${rem(22)};
        letter-spacing: ${rem(1.6)};
        padding: ${rem(10)};
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        font-size: ${rem(14)};
        line-height: ${rem(20)};
        letter-spacing: ${rem(1.4)};
      }
    }
  `}
`;
