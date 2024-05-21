//Get the price difference between logged in customer and guest price

import { CartTypes } from '../types/cart.types';

export const getPriceDifferentiate = (cartList: CartTypes | null) => {
  const { member_price = null, price_format = null } = cartList || {};

  const { grand_total: memberGrandTotal = 0 } = member_price || {};

  const { grand_total: guestGrandTotal = 0 } = price_format?.final_price || {};

  if (memberGrandTotal < guestGrandTotal) {
    return guestGrandTotal - memberGrandTotal;
  }

  return 0;
};
