import { ProductTypes } from '../types/product.types';

export const initializeProductId = (
  productData: ProductTypes,
  isConfigurableProduct: boolean,
  selectedGroupBy: string | null,
  slug: Array<string> | string
) => {
  if (!isConfigurableProduct) return productData.id;

  // Check if the product has only one attributes
  if (productData.is_group_by) {
    const oneAttributeProduct =
      productData.configurable_attributes?.variations?.[
        selectedGroupBy || ''
      ]?.find((x) => x.url_key === slug);

    if (oneAttributeProduct && 'id' in oneAttributeProduct) {
      return oneAttributeProduct.id;
    }
  }

  return '';
};
