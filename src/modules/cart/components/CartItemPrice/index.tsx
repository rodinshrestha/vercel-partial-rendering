import React from 'react';

import clsx from 'clsx';

import { CartDetailTypes } from '@/cart/types/cart.types';

type Props = {
  item: CartDetailTypes;
  className?: string;
};
const CartItemPrice = ({
  item,

  className,
}: Props) => {
  //ToDo: it can be use as it is use before
  // if (!item.product.is_in_stock) {
  //   return <h6 className="error">{_t('out_of_stock', 'Out of stock')}</h6>;
  // }

  const {
    grand_total_formatted = 'NAN',
    grand_total,
    sub_total_inc_tax,
    sub_total_inc_tax_formatted = 'NAN',
  } = item?.price_format?.final_price || {};

  return (
    <div className={clsx('quantity-price-wrap', className)}>
      <div className="price-wrap">
        <span className="price">{grand_total_formatted}</span>

        {/* {item?.price_format?.regular_price && (
          <span>{item.price_format.regular_price}</span>
        )} */}

        {grand_total < sub_total_inc_tax && (
          <span>{sub_total_inc_tax_formatted}</span>
        )}
      </div>
    </div>
  );
};

export default CartItemPrice;
