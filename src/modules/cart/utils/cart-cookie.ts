import { cartHeaderKey } from '@/core/constants/token.constants';
import { deleteCookie, getCookie, setCookie } from '@/core/utils/cookie';

export const getCartToken = (): string => {
  if (!cartHeaderKey) {
    throw new Error('No cart header key available');
  }

  return getCookie(cartHeaderKey) || '';
};

export const setCartToken = (cartToken?: string) => {
  if (!cartToken) {
    console.error('Cart token not found');
    throw new Error('Cart token not found');
  }
  setCookie(cartHeaderKey, cartToken);
};

export const removeCartToken = () => {
  deleteCookie(cartHeaderKey);
};
