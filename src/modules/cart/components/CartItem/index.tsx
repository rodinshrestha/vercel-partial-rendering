import React from 'react';

import clsx from 'clsx';

import { CartDetailTypes } from '@/cart/types/cart.types';
import useCart from '@/cart/hooks/useCart';
import Link from '@/core/components/Link';
import ImageWithFallback from '@/core/components/ImageWithFallback';
import { PENDING } from '@/core/constants/states';
import useTranslations from '@/core/hooks/useTranslations';

import CartItemPrice from '../CartItemPrice';
import CartQuantityHandler from '../CartQuantityHandler';

import { LoaderContainerStyle, StyledDiv } from './style';

interface cartItemProps {
  item: CartDetailTypes;
  shouldUpdateCartSummary?: boolean;
  cartAction?: boolean;
  toggleDrawer?: () => void;
  callBackAfterQtyChange?: () => void;
}

export const CartItem = ({
  item,
  toggleDrawer,
  shouldUpdateCartSummary = false,
  cartAction = true,
  callBackAfterQtyChange,
}: cartItemProps) => {
  const { _t } = useTranslations();
  const [loader, setLoader] = React.useState(false);
  const { cartStatus, removeItemFromCart } = useCart();

  return (
    <StyledDiv className={clsx('cart-item')}>
      <div className="cart-wrapper">
        {loader && <LoaderContainerStyle className="loader" />}

        <div className="image">
          <Link href={`/product/${item?.product?.url_key}`}>
            <ImageWithFallback
              src={item.product?.base_image?.url || ''}
              alt={item?.product?.name || ''}
              fill
              onClick={toggleDrawer}
            />
          </Link>
        </div>

        <div className="content-wrapper">
          <div className="content-wrapper-inner">
            {item?.product?.brand?.name && (
              <div className="sku-no">
                <span>{item.product.brand.name}</span>
              </div>
            )}

            <div className="title">
              <h2>
                <Link
                  href={`/product/${item?.product?.url_key}`}
                  onClick={toggleDrawer}
                >
                  {item?.product?.name}
                </Link>
              </h2>
            </div>
            <CartItemPrice item={item} />

            {/* Configurable attributes */}
            <div className="info">
              {Object.entries(item?.product?.configurable_attributes || {}).map(
                ([key, value]) => {
                  return (
                    <span key={key}>
                      {key} - <span className="value">{value}</span>
                    </span>
                  );
                }
              )}
            </div>

            <div className="qty-cart-wrap">
              <CartQuantityHandler
                data={item}
                setLoader={setLoader}
                shouldUpdateCartSummary={shouldUpdateCartSummary}
                cartAction={cartAction}
                callBackAfterQtyChange={callBackAfterQtyChange}
              />
            </div>

            {/* {item.product.is_in_stock
              ? item.message.length
                ? item.message.map((msg, index) => {
                    return (
                      <div className="not-proceed-msg" key={index}>
                        <span> {msg}</span>
                      </div>
                    );
                  })
                : null
              : null} */}
          </div>
          <div className="btnGroup">
            <div
              className={clsx('remove-cart', {
                disabled: cartStatus === PENDING,
              })}
              onClick={() =>
                removeItemFromCart(item.id, setLoader, shouldUpdateCartSummary)
              }
            >
              <span>{_t('remove', 'Remove')}</span>
              {/* <i
                className="icon-close"
                onClick={() =>
                  removeItemFromCart(
                    item.id,
                    setLoader,
                    shouldUpdateCartSummary
                  )
                }
              /> */}
            </div>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};
