import { CartTypes } from '@/cart/types/cart.types';

export const getTotalCartCount = (cartList: CartTypes | null) => {
  const { items = [], total_items_qty = 0 } = cartList || {};

  if (!items.length || !total_items_qty) {
    return 0;
  }

  return total_items_qty > 99 ? '99+' : total_items_qty;
};
