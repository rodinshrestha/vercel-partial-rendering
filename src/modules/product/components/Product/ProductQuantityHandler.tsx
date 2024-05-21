import React from 'react';

import styled, { css } from 'styled-components';
import { rem } from 'polished';
import clsx from 'clsx';

import {
  ChangeAbleValueType,
  ProductTypes,
} from '@/product/types/product.types';
import { isProductOutOfStock } from '@/product/utils/is-product-out-of-stock';
import InputField from '@/core/components/FormField/Input';
import { IconMinus, IconPlus } from '@/core/components/Icons';

type Props = {
  appliedQty: number;
  setAppliedQty: React.Dispatch<React.SetStateAction<number>>;
  productData: ProductTypes;
  changeAbleValue: ChangeAbleValueType;
  productId: string;
  minimumQty: number;
};

const ProductQuantityHandler = ({
  productData,
  appliedQty,
  setAppliedQty,
  changeAbleValue,
  productId,
  minimumQty,
}: Props) => {
  const isOutOfStock = isProductOutOfStock(productData, productId);

  if (isOutOfStock) return null;

  const handleIncrement = (disable: boolean) => {
    if (disable) return;

    setAppliedQty((prev) => {
      if (prev === Number(changeAbleValue?.qty || productData.quantity)) {
        return prev;
      }

      return prev + 1;
    });
  };

  const handleDecrement = () => {
    setAppliedQty((prev) => {
      if (prev === minimumQty) {
        return prev;
      }
      return prev - 1;
    });
  };

  const disabled =
    appliedQty === Number(changeAbleValue?.qty || productData.quantity);

  return (
    <StyleWrapper className={clsx({ 'b2b-qty': true })}>
      <div
        onClick={handleDecrement}
        className={clsx('icon-minus', {
          disabled: appliedQty <= minimumQty,
        })}
      >
        <IconMinus size={12} />
      </div>
      <InputField placeholder="0" type="number" value={appliedQty} />
      <div
        onClick={() => handleIncrement(disabled)}
        className={clsx('icon-plus', {
          disabled,
        })}
      >
        <IconPlus size={12} />
      </div>
    </StyleWrapper>
  );
};

export default ProductQuantityHandler;

const StyleWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    max-width: 75px;
    justify-content: center;
    font-size: ${rem(14)};
    line-height: normal;
    border-radius: 20px;

    @media (max-width: ${theme.breakPoints.tab}) {
      max-width: 110px;
    }

    @media (max-width: ${theme.breakPoints.mobile}) {
      max-width: 85px;
    }

    .icon-plus,
    .icon-minus {
      font-size: ${rem(14)};
      cursor: pointer;

      &.disabled {
        cursor: not-allowed;
        opacity: 0.7;

        &::before {
          opacity: 0.3;
        }
      }
    }

    .input-field {
      line-height: 0;
    }

    input {
      border: none;
      text-align: center;
      padding: 0;
      font-size: ${rem(16)};
      min-width: 50px;
      ${theme.fontFamily.semibold};

      &::placeholder {
        font-size: ${rem(14)};
        ${theme.fontFamily.semibold}
      }
    }
  `}
`;
