import { VariationProductDetails } from '../types/product.types';

export const getVariantMemeberPrice = (item: VariationProductDetails) => {
  if (!item) {
    return null;
  }

  const { amount_incl_tax = 0, amount_incl_tax_formatted } =
    item?.member_price_format?.final_price || {};

  const { amount_incl_tax: finalAmountTax = 0 } =
    item?.price_format?.final_price || {};

  if (amount_incl_tax < finalAmountTax) {
    return amount_incl_tax_formatted as string;
  }

  return null;
};
