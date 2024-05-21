/**
 * the user must be have stock to go to checkout page
 * @param user
 * @returns
 */
export const getCheckoutUrl = (hasOutOfStock: boolean) => {
  return hasOutOfStock ? 'cart' : 'checkout';
};
