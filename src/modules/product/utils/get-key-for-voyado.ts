import { ProductTypes } from '@/product/types/product.types';

export const getKeyForVoyado = (
  productData: ProductTypes,
  isConfigurableProduct: boolean
) => {
  const { parent_id = '', sku = '' } = productData;
  if (isConfigurableProduct && !productData.is_group_by) {
    return parent_id;
  }

  return sku;
};
