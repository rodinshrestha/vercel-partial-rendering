'use client';
import React from 'react';

import { rem } from 'polished';
import styled from 'styled-components';
import { css } from 'styled-components';

import { ProductTypes } from '@/product/types/product.types';
import { getColorByQty } from '@/product/utils/get-product-by-color';
import useTranslations from '@/core/hooks/useTranslations';
import { isProductOutOfStock } from '@/product/utils/is-product-out-of-stock';

type Props = {
  productData: ProductTypes;
  productId?: string;
};

const ProductStockStatus = ({ productData, productId }: Props) => {
  const { _t } = useTranslations();

  return (
    <StyledDiv className="stock-wrap">
      <div className="quantity-color">
        <label className={getColorByQty(productData)}>
          <span>
            {isProductOutOfStock(productData, productId)
              ? _t('out_of_stock', 'Out of stock')
              : _t('in_stock', 'In stock')}
          </span>
          {}
        </label>
      </div>
    </StyledDiv>
  );
};

export default ProductStockStatus;

const StyledDiv = styled.div`
  ${({ theme }) => css`
    &.stock-wrap {
      display: flex;
      font-size: ${rem(14)};
      ${theme.fontFamily.semibold}
      margin-bottom: ${rem(50)};

      @media (max-width: ${theme.breakPoints.tab}) {
        margin-bottom: ${rem(20)};
      }

      .stock-link {
        display: inline-block;
        transition: 0.3s ease all;
        text-decoration: underline;
        margin-left: auto;

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            opacity: calc(0.5);
          }
        }
      }

      .quantity-color {
        label {
          position: relative;
          padding-left: ${rem(15)};
          margin-bottom: 0;

          &::before {
            content: '';
            position: absolute;
            border-radius: 100%;
            transition: all 0.5s ease 0s;
            width: 10px;
            height: 10px;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }

          &.green {
            &::before {
              background-color: ${theme.color.green['200']};
            }
          }

          &.yellow {
            &::before {
              background-color: ${theme.color.yellow['100']};
            }
          }

          &.grey {
            &::before {
              background-color: ${theme.color.grey['500']};
            }
          }
        }
      }
    }
  `}
`;
