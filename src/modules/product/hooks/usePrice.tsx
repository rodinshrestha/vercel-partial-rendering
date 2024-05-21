import { PriceFormatList, ProductTypes } from '../types/product.types';

export const usePrice = (productData: ProductTypes | null) => {
  const { final_price = null, regular_price = null } =
    productData?.price_format || {};

  /**
   *
   * Might needs to add logic in future
   * For final price
   */
  const getFinalPrice = () => {
    const { amount_incl_tax_formatted = '' } =
      productData?.price_format.final_price || {};

    return amount_incl_tax_formatted;
  };

  const getDiscountPrice = () => {
    if (
      Number(regular_price?.amount_incl_tax) >
      Number(final_price?.amount_incl_tax)
    ) {
      return regular_price?.amount_incl_tax_formatted;
    }

    return null;
  };

  return { discountPrice: getDiscountPrice(), finalPrice: getFinalPrice() };
};

/**
 *
 * Product varaint price
 * @returns
 */
export const useVarientDiscountPrice = (price_format: PriceFormatList) => {
  const { final_price = null, regular_price = null } = price_format || {};

  const getFinalPrice = () => {
    const { amount_incl_tax_formatted = '' } = price_format.final_price || {};

    return amount_incl_tax_formatted;
  };

  const getDiscountPrice = () => {
    if (
      Number(regular_price?.amount_incl_tax) >
      Number(final_price?.amount_incl_tax)
    ) {
      return regular_price?.amount_incl_tax_formatted;
    }

    return null;
  };

  return { discountPrice: getDiscountPrice(), finalPrice: getFinalPrice() };
};
