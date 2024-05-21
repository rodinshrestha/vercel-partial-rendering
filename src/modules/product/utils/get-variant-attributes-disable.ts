import { VariationProductDetails } from '@/product/types/product.types';

export const getVariantAttributeDisable = (item: VariationProductDetails) => {
  if (!('variants' in item)) {
    return Boolean(!item.is_in_stock || Number(item.quantity) <= 0);
  }

  return false;
};
