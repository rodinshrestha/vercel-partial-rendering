import { deleteCookie, getCookie, setCookie } from '@/core/utils/cookie';

import { X_WISHLIST } from '../constants/wishlist.constants';

export const getWishlistToken = () => {
  return getCookie(X_WISHLIST);
};

export const setWishlistToken = (wishListToken: string) => {
  if (!wishListToken) {
    throw new Error('Cart token not found');
  }
  setCookie(X_WISHLIST, wishListToken);
};

export const removeWishListToken = () => {
  deleteCookie(X_WISHLIST);
};
