import { CartTypes } from '@/cart/types/cart.types';

export const getSummaryTotalItem = (cartSummary: CartTypes | null) => {
  const { total_items_qty = '' } = cartSummary || {};

  if (total_items_qty) return `${total_items_qty}`;

  return total_items_qty;
};
