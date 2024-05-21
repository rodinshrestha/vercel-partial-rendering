import { PENDING } from '@/core/constants/states';

import { CartDetailTypes } from '../types/cart.types';

export const quantityMinusDisabled = (
  data: CartDetailTypes,
  cartStatus: string
) => {
  if (data.product.min_order_qty && data.qty <= data.product.min_order_qty) {
    return true;
  }
  if (data.qty <= 1) {
    return true;
  }
  if (cartStatus === PENDING) {
    return true;
  }
  return false;
};

export const quantityPlusDisabled = (
  data: CartDetailTypes,
  cartStatus: string
) => {
  if (data.qty === Number(data.product.quantity)) {
    return true;
  }
  if (cartStatus === PENDING) {
    return true;
  }
  return false;
};
