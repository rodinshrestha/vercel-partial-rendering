import { CartTypes } from '../types/cart.types';

/**
 * Checks the product is in stock and their quantity
 * @param cartList List of cart
 * @returns
 */
export const checkErrorInCart = (cartList: CartTypes | null) => {
  if (!cartList || !cartList.items.length) return true;

  return cartList.items.reduce((acc, iterator) => {
    if (acc) return acc;

    return (
      Boolean(!iterator.product.is_in_stock) ||
      iterator.qty > Number(iterator.product.quantity)
    );
  }, false);
};
