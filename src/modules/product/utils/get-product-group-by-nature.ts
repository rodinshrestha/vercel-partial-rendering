import {
  GROUP_BY_ZERO_PARENT_NOT_VISIBLE,
  GROUP_BY_ZERO_PARENT_VISIBLE,
} from '../constants/product.constant';
import { ProductTypes } from '../types/product.types';

export const getGroupByZeroProductNature = (productData: ProductTypes) => {
  const { is_group_by = 0, parent_id = null, type = '' } = productData || {};

  // Means current product is group by 1 or a simple product
  if (!productData || is_group_by) {
    return null;
  }

  /**
   * Parent visible criteria => is_group_by == 0 && parent_id == null && type == configurable
   * Should redirect the page to its variant URL
   */
  if (!is_group_by && parent_id && type === 'simple') {
    return GROUP_BY_ZERO_PARENT_NOT_VISIBLE;
  }

  /**
   * Scenario: Parent visible criteria => is_group_by == 0 && parent_id == null && type == configurable
   * Appends the SKU in product url
   */
  if (is_group_by == 0 && !parent_id && type == 'configurable') {
    return GROUP_BY_ZERO_PARENT_VISIBLE;
  }

  return null;
};

/**
 * Plucks the product varaints,
 * If SKU is found in product URL OR
 * If the product nature is group by zero and parent is not visible
 */
export const pluckProductVaraint = (
  productData: ProductTypes | null,
  sku: string,
  urlKey: string
) => {
  if (!productData) {
    return null;
  }

  /**
   * Needs to checks the key according to Product scenario
   * If the product is group by zero, With parent visible, checks the SKU instead of URL KEY
   * If the product is group by zero, With parent not visible, checks the URL key
   */
  const checkKey = sku || urlKey;

  const targetKey = sku ? 'sku' : 'url_key';

  const { product_details = {} } = productData?.configurable_attributes || {};
  return Object.entries(product_details).reduce((acc: any, iterator) => {
    const [_, value] = iterator;

    if (acc) {
      return acc;
    }

    if (value[targetKey] === decodeURIComponent(checkKey)) {
      return value;
    }
  }, null);
};
