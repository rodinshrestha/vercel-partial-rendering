import { GROUP_BY_ZERO_PARENT_NOT_VISIBLE } from '../constants/product.constant';
import { ProductTypes, VariationProductDetails } from '../types/product.types';

import { getGroupByZeroProductNature } from './get-product-group-by-nature';

export const shouldProductVariantsBeURL = (
  productData: ProductTypes,
  index: number,
  item: VariationProductDetails
) => {
  // Product with group be 1 nature
  if (productData.is_group_by) {
    /**
     * Group by 1 nature product should always be URL in first varaints
     */
    if (index === 0) {
      return true;
    }

    return false;
  }

  // Product with group by 0 nature
  if (!productData.is_group_by) {
    const productGroupByZeroNature = getGroupByZeroProductNature(productData);
    /**
     * Product with group by 0 nature,
     * If the parent is not visible
     * then the page should be redirect to the varaints URL
     */
    if (
      productGroupByZeroNature === GROUP_BY_ZERO_PARENT_NOT_VISIBLE &&
      !item?.variants
    ) {
      return true;
    }

    return false;
  }
};
