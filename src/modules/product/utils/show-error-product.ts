import { isObjectEmpty } from '@/core/utils/object';

import { ProductTypes } from '../types/product.types';

export const showConfigurableProductError = (data: ProductTypes) => {
  /**
   * Configurable Products
   */

  if (data?.configurable_attributes) {
    if (
      data.configurable_attributes &&
      isObjectEmpty(data.configurable_attributes.variations)
    ) {
      console.error(
        'Structure Error, variation key should not be empty in case of configurabale product'
      );
    }
  }
};
