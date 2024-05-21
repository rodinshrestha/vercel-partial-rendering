import React from 'react';

import styled, { css } from 'styled-components';

import ImageWithFallback from '@/core/components/ImageWithFallback';
import Link from '@/core/components/Link';
import type { SearchedCategoryList } from '@/search/types/search.types';

type Props = {
  categoryData: SearchedCategoryList;
  onClose: () => void;
};

const SearchedCategoryList = ({ categoryData, onClose }: Props) => {
  return (
    <StyledDiv>
      <Link
        href={`/product/${categoryData.url_key}`}
        onClick={onClose}
        asSelfLink
      >
        <div className="image-wrapper">
          <ImageWithFallback
            src={categoryData.image || ''}
            alt={categoryData?.name || ''}
            fill
          />
        </div>
        <div className="category-details-warpper">
          <div className="category-name">{categoryData?.name}</div>
        </div>
      </Link>
    </StyledDiv>
  );
};

export default SearchedCategoryList;

const StyledDiv = styled.div`
  ${({ theme }) => css`
    a {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      cursor: pointer;
      align-items: center;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          opacity: calc(0.6);
        }
      }
    }

    .image-wrapper {
      position: relative;
      width: 100px;
      height: 100px;

      @media (max-width: ${theme.breakPoints.tab}) {
        width: 80px;
        height: 80px;
      }

      img {
        object-fit: cover;
      }
    }

    .category-details-warpper {
      display: flex;
      flex-direction: column;

      .category-name {
        font-size: 13px;
      }
    }
  `}
`;
