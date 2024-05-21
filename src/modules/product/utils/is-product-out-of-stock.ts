import { ProductTypes } from '@/product/types/product.types';

export const isProductOutOfStock = (
  productData: ProductTypes,
  productId?: string
) => {
  // Group by  Single Variant Product

  if (productId && productData.configurable_attributes) {
    const selectedProduct =
      productData.configurable_attributes?.product_details[productId];

    return Boolean(
      selectedProduct.is_in_stock && Number(selectedProduct.quantity) <= 0
    );
  }

  return !productData.is_in_stock;
};
