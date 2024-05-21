import { ProductTypes } from '@/product/types/product.types';

export type WishlistType = {
  /** Wishlist created at */
  created_at: string;

  /** Wishlist  readable format */
  created_at_human: string;

  /** Wishlist readable local hour format */
  created_at_human_local: string;

  /** Wishlist local hour */
  created_at_local: string;

  /** WIshlist customer id */
  customer_id: string | null;

  /** Wishlist id */
  id: string;

  /** Wishlist identifier */
  identifier: string;

  /** Wishlist shared */
  shared: 0 | 1;

  /** Wishlist items list */
  wishlist_items: Array<WishlistItemListType>;
};

export type WishlistItemListType = {
  /** Wishlist attribute value */
  attribute_value: string | null;

  /** Wish list item created date  */
  created_at: string;

  /** Wishlist readable format */
  created_at_human: string;

  /** Wishlist created at local format */
  created_at_human_local: string;

  /** WIshlist created local */
  created_at_local: string;

  /** Wishlist item grouping attributes */
  grouping_attribute: string | null;

  /** Wishlist item id */
  id: string;

  /** Wishlist Product details */
  product: Partial<ProductTypes>;

  /** Wishlist product id */
  product_id: string;

  /** Wishlist id */
  wishlist_id: string;
};
