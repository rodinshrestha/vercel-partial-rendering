import { ProductTypes } from '@/product/types/product.types';

export type SearchType = {
  /** Search Category list */
  categories: CategorySearchDetails;

  /** Total category number */
  category_count: number;

  /** Total product count number */
  product_count: number;

  /** Searched Product list */
  products: ProductSearchDetails;

  /** Load more loader */
  loadMoreLoader: boolean;
} | null;

export type ProductSearchDetails = {
  /** Product current page indicator */
  current_page: number;

  /** Product list */
  data: Array<ProductTypes>;

  /** product last page */
  last_page: number;

  /** Product paginate limit */
  limit: number;

  /** Product total count */
  total: number;
};

export type CategorySearchDetails = {
  /** Category current page indicator */
  current_page: number;

  /** Category data list */
  data: Array<SearchedCategoryList>;

  /** Category last page */
  last_page: number;

  /** Category total data */
  total: number;

  /** Category paginate limit */
  limit: number;
};

export type SearchedCategoryList = {
  /** Category descruption */
  description: string;

  /** Category id */
  id: string;

  /** Category Image */
  image: string;

  /** Category name */
  name: string;

  /** Category url key */
  url_key: string;
};
