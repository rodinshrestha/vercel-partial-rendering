import { ProductTypes } from '@/product/types/product.types';

/**
 * Disable scenario
 *guest, loggedin
 */

export const getDisableStatus = (
  isConfigurableProduct: boolean,
  productId: string,
  addToCartLoader: boolean,
  productData: ProductTypes
) => {
  const hasProductQuantity =
    productData.is_in_stock && Number(productData?.quantity) >= 0;

  if (Array.isArray(productData.price_format)) {
    // when there is no price then  we get data as empty array from backend
    return true;
  }

  if (!isConfigurableProduct && !hasProductQuantity) {
    // handling simple product
    return true;
  }

  // Waiting for user to select varaints; which is product id
  if (isConfigurableProduct && !productId) {
    return true;
  }

  //Checking inner varaints
  if (productId && productData?.configurable_attributes) {
    const selectedProduct =
      productData.configurable_attributes?.product_details[productId];
    return Boolean(
      !selectedProduct.is_in_stock || Number(selectedProduct.quantity) <= 0
    );
  }

  // Product actuall quantity is less than minimum sale quantity
  if (Number(productData.quantity) < Number(productData.min_order_qty)) {
    return true;
  }

  //
  if (!hasProductQuantity) {
    return true;
  }

  return addToCartLoader;
};
