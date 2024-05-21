import { ProductTypes } from '../types/product.types';

export const getVariationsList = (
  productData: ProductTypes,
  selectedGroupBy: string | null,
  isConfigurableProduct: boolean
): Array<any> => {
  if (!selectedGroupBy) return [];

  if (productData.configurable_attributes && isConfigurableProduct) {
    if (!productData.configurable_attributes.variations[selectedGroupBy]) {
      return [];
    }

    return productData.configurable_attributes.variations[selectedGroupBy];
  }

  //This case should never exist. But never trust Backend :D
  return [];
};
