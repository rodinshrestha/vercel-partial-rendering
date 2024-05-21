import React from 'react';

import clsx from 'clsx';

import { CartDetailTypes } from '@/cart/types/cart.types';
import useCart from '@/cart/hooks/useCart';
import { checkQtyError } from '@/cart/utils/check-qty-error';
import {
  quantityMinusDisabled,
  quantityPlusDisabled,
} from '@/cart/utils/check-qty-disabled';
import useTranslations from '@/core/hooks/useTranslations';
import { IconMinus, IconPlus } from '@/core/components/Icons';

import { StyledDiv } from './style';

type Props = {
  data: CartDetailTypes;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  shouldUpdateCartSummary: boolean;
  cartAction?: boolean;
  className?: string;
  callBackAfterQtyChange?: () => void;
};

const CartQuantityHandler = ({
  data,
  setLoader,
  shouldUpdateCartSummary = false,
  cartAction = true,
  className,
  callBackAfterQtyChange,
}: Props) => {
  const { _t } = useTranslations();
  const { decreaseQty, increaseQty, cartStatus } = useCart();

  const handleIncreaseQuantity = () => {
    if (data.qty !== Number(data.product.quantity)) {
      increaseQty(data, setLoader, shouldUpdateCartSummary).finally(() => {
        callBackAfterQtyChange?.();
      });
    }
  };

  const handleDecreaseQuantity = () => {
    decreaseQty(data, setLoader, shouldUpdateCartSummary).finally(() => {
      callBackAfterQtyChange?.();
    });
  };

  const isQuantityError = checkQtyError(data);

  return (
    <>
      <StyledDiv
        className={clsx('quantity-wrapper', className, {
          'isB2b-qty-wrapper': true,
        })}
      >
        <div className="quantity">
          {cartAction && (
            <span
              className={clsx('quantity-minus', {
                disabled: quantityMinusDisabled(data, cartStatus),
              })}
            >
              <i className="icon-minus" onClick={handleDecreaseQuantity}>
                <IconMinus size={10} />
              </i>
            </span>
          )}

          <div
            className={clsx('product-qty-value', {
              'qty-error': isQuantityError,
            })}
          >
            {data.qty}
          </div>

          {!isQuantityError && cartAction && (
            <span
              className={clsx('quantity-plus', {
                disabled: quantityPlusDisabled(data, cartStatus),
              })}
            >
              <i className="icon-plus" onClick={handleIncreaseQuantity}>
                <IconPlus size={10} />
              </i>
            </span>
          )}
        </div>
      </StyledDiv>
      {isQuantityError && (
        <small className="error">
          {_t('quantity_not_available', 'Quantity not available')}
        </small>
      )}
    </>
  );
};

export default CartQuantityHandler;
