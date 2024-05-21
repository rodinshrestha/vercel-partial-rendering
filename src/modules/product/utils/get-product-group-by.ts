import { isObjectEmpty } from '@/core/utils/object';
import { ProductTypes } from '@/product/types/product.types';

/**
 *
 * @param data Product details
 * @returns string | null
 */

export const getProductVariationsGroupBy = (
  data: ProductTypes
): string | null => {
  /**
   * Configurable Products
   * is_group_by true.
   * Variation should be mapped according to group by slug
   */
  if (data.configurable_attributes && data.is_group_by) {
    if (
      data.configurable_attributes &&
      !data.configurable_attributes.variations[data.group_by_slug]
    ) {
      throw new Error('Group by slug is not found in variants');
    }
    return data.group_by_slug;
  }

  /**
   * Configurable Products
   * is_group_by false
   * A first key will be mapped from variations.
   */
  if (data.configurable_attributes && !data.is_group_by) {
    if (
      data.configurable_attributes &&
      !isObjectEmpty(data.configurable_attributes.variations)
    ) {
      return Object.keys(data.configurable_attributes.variations)[0];
    }

    return null;
  }
  return null;
};
