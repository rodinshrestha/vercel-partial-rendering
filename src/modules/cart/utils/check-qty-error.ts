import { CartDetailTypes } from '../types/cart.types';

/**
 * Checks the selected quantity and allocated quantity
 * @param data Cart item
 * @returns
 */
export const checkQtyError = (data: CartDetailTypes) => {
  return data.qty > Number(data.product.quantity);
};
