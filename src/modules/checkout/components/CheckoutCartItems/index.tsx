import React from 'react';

import { CartTypes } from '@/cart/types/cart.types';
import useTranslations from '@/core/hooks/useTranslations';
import EmptyItem from '@/cart/components/EmptyItem';
import { CartItem } from '@/cart/components/CartItem';

import { StyledDiv } from './style';

type Props = {
  cartSummary: CartTypes | null;
  callBackAfterQtyChange: () => void;
};

const CheckoutCartItems = ({ cartSummary, callBackAfterQtyChange }: Props) => {
  const { items = [] } = cartSummary || {};
  const { _t } = useTranslations();

  const emptyCart = {
    title: _t(
      'you_dont_have_any_items_in_your_cart',
      "You don't have any items in your Cart"
    ),
    content: _t('to_continue_shopping', 'To Continue Shopping.'),
  };

  if (!items.length) {
    return <EmptyItem data={emptyCart} classNames="pt-90 pb-90" />;
  }
  return (
    <StyledDiv>
      <div className="checkout-item-list">
        {items.map((x) => {
          return (
            <div key={x.id} className="cart-drawer-item">
              <CartItem
                item={x}
                shouldUpdateCartSummary={true}
                callBackAfterQtyChange={callBackAfterQtyChange}
              />
            </div>
          );
        })}
      </div>
    </StyledDiv>
  );
};

export default CheckoutCartItems;
