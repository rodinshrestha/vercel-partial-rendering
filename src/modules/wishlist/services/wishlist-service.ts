import { HeaderType } from '@/core/types/api-headers.types';
import { publicAxios } from '@/core/utils/axios';

import { WishlistType } from '../types/wishlist.types';

//Fetch wishlist in client side
export const getWishlist = (headers: HeaderType) => {
  return publicAxios.get<{ data: WishlistType }>('sf/wishlist', { headers });
};

export const clearAllWishList = (headers: HeaderType) => {
  return publicAxios.delete('sf/wishlist', { headers });
};

export const addToFavourite = (headers: HeaderType, productId: string) => {
  return publicAxios.post(
    '/sf/wishlist',
    {
      product_id: productId,
    },
    { headers }
  );
};

export const addCartItemToFavourite = (
  headers: HeaderType,
  cart_id: string
) => {
  return publicAxios.post(
    '/sf/wishlist/cart',
    {
      cart_id: cart_id,
    },
    { headers }
  );
};
