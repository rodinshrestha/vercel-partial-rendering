import React from 'react';

import styled, { css } from 'styled-components';
import { rem } from 'polished';

import useCart from '@/cart/hooks/useCart';
import useTranslations from '@/core/hooks/useTranslations';
import { IDLE, PENDING } from '@/core/constants/states';
import Drawer from '@/core/components/Drawer';
import Loader from '@/core/components/Loader';

import { CartItem } from '../CartItem';
import { Cartfooter } from '../CartFooter';
import InvalidCartItem from '../InvalidCartItem';

import { StyledWrapper } from './style';

const CartDrawer = () => {
  const [clearCartLoader, setClearCartLoader] = React.useState(false);
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cartList,
    cartStatus,
    clearCart,
  } = useCart();

  const { _t } = useTranslations();

  const cartLoader = cartStatus === IDLE || cartStatus === PENDING;

  const shouldProceedToCheckout = cartList?.items.every(
    (item) => item.proceed_to_checkout
  );

  //TODO: might need
  // const hideNoticeBanner = () => {
  //   if (!isB2b && user?.email) {
  //     return false;
  //   }

  //   if (isB2b && user?.email) {
  //     return false;
  //   }

  //   return true;
  // };

  const isCartEmpty = () => {
    if (cartLoader && !cartList) {
      return true;
    }

    if (!cartLoader && Boolean(!cartList?.items?.length)) {
      return true;
    }
    return false;
  };

  return (
    <Drawer
      className="cart-drawer"
      title={_t('cart', 'Cart')}
      subTitle={`${cartList ? `(${cartList?.total_items_qty})` : ''}`}
      open={isCartDrawerOpen}
      position="right"
      onClose={() => setIsCartDrawerOpen(false)}
      width="28%"
      drawerZindex={5}
      overlayZindex={5}
      footer={<Cartfooter />}
      isEmpty={isCartEmpty()}
      empty={{
        title: _t('empty_cart', "You don't have any items in your Cart"),
        description: _t('to_continue_shopping', 'To Continue Shopping.'),
      }}
      // Server Action
      onClearClick={() => clearCart(setClearCartLoader)}
    >
      {!shouldProceedToCheckout ? (
        <InvalidCartItem className="msg-box" items={cartList?.items || []} />
      ) : null}
      <StyledWrapper className="body-wrapper">
        {cartLoader && !cartList ? (
          <div className="loader-conatiner">
            <Loader type="spinner" color="primary" />
          </div>
        ) : (
          <>
            {clearCartLoader && (
              <div className="clear-loader">
                <Loader type="growing-loader" color="primary" />
              </div>
            )}

            {cartList?.items.map((x, i) => {
              return <CartItem item={x} key={i} />;
            })}
          </>
        )}
      </StyledWrapper>
    </Drawer>
  );
};

export default CartDrawer;

export const StyledItem = styled.div`
  ${({ theme }) => css`
    & + .cart-drawer-item {
      margin-top: ${rem(15)};
      padding-top: ${rem(15)};
      border-top: 1px solid ${theme.color.grey[900]};

      @media (max-width: ${theme.breakPoints.tab}) {
        margin-top: ${rem(20)};
      }
    }
  `}
`;
