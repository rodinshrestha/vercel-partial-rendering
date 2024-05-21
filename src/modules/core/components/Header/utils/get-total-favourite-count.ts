import { WishlistType } from '@/wishlist/types/wishlist.types';

export const getTotalFavouriteCount = (wishlist: WishlistType | null) => {
  const { wishlist_items = [] } = wishlist || {};

  if (wishlist_items.length > 99) {
    return '99+';
  }

  return wishlist_items.length;
};
