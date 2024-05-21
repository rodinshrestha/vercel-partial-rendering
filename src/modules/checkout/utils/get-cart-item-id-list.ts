import { CartDetailTypes } from '@/cart/types/cart.types';

export const getCartItemIdList = (items: Array<CartDetailTypes> = []) => {
  return items.map((x) => x.product.id);
};
