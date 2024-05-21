import { VariationProductDetails } from '../types/product.types';

export const getVariantDiscountPrice = (item: VariationProductDetails) => {
  const { amount_incl_tax: finalAmount = '' } =
    item?.price_format?.final_price || {};
  const {
    amount_incl_tax: regularAmount = '',
    amount_incl_tax_formatted: regularAmountFormatted = '',
  } = item?.price_format?.regular_price || {};

  if (finalAmount < regularAmount) {
    return regularAmountFormatted;
  }

  return null;
};
