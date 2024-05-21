'use client';

import React from 'react';

import styled from 'styled-components';
import { css } from 'styled-components';

import ImageWithFallback from '@/core/components/ImageWithFallback';
import Link from '@/core/components/Link';
import { ProductTypes } from '@/product/types/product.types';
import { usePrice } from '@/product/hooks/usePrice';

type Props = {
  productData: ProductTypes;
  onClose: () => void;
};

const SearchedProductList = ({ productData, onClose }: Props) => {
  const { discountPrice, finalPrice } = usePrice(productData);

  return (
    <StyledDiv>
      <Link href={`/product/${productData.url_key}`} onClick={onClose}>
        <div className="image-wrapper">
          <ImageWithFallback
            src={productData.base_image.url || ''}
            alt={productData?.name || ''}
            fill
          />
        </div>
        <div className="product-details-warpper">
          <div className="product-name">
            {productData?.name || productData?.article_number}
          </div>

          <div className="product-price">{finalPrice}</div>

          {discountPrice ? (
            <s className="price dis-prs">{discountPrice}</s>
          ) : null}
        </div>
      </Link>
    </StyledDiv>
  );
};

export default SearchedProductList;

const StyledDiv = styled.div`
  ${() => css`
    a {
      position: relative;
      display: flex;
      /* flex-wrap: wrap; */
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
      width: 60px;
      height: 80px;

      img {
        object-fit: contain;
      }
    }

    .product-details-warpper {
      display: flex;
      flex-direction: column;

      .product-name,
      .product-brand {
        font-size: 13px;
      }

      .product-price {
        font-size: 13px;
        font-weight: bold;
      }

      s {
        font-size: 12px;
        font-weight: normal;
        font-style: italic;
        color: #959595;
      }
    }
  `}
`;
