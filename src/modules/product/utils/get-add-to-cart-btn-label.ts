import { Keyword, ReadOnlyTranslation } from '@/core/types/translation.types';
import { ProductTypes } from '@/product/types/product.types';

export const getAddToCartBtnLabel = (
  productData: ProductTypes,
  isConfigurableProduct: boolean,
  _t: (
    keyWord: Keyword,
    defaultTranslation: ReadOnlyTranslation[Keyword]
  ) => string,
  productId: string
) => {
  if (productId && productData?.configurable_attributes) {
    const selectedProduct =
      productData.configurable_attributes?.product_details[productId];
    const qtyChecker = Boolean(
      !selectedProduct.is_in_stock || Number(selectedProduct.quantity) <= 0
    );

    if (qtyChecker) {
      return _t('out_of_stock', 'Out of stock');
    }

    return _t('add_to_cart', 'Add To Cart');
  }

  if (Number(productData.quantity) <= 0 || !productData.is_in_stock) {
    return _t('out_of_stock', 'Out of stock');
  }
  if (!isConfigurableProduct && !productData.is_in_stock) {
    return _t('out_of_stock', 'Out of stock');
  }

  return _t('add_to_cart', 'Add To Cart');
};
