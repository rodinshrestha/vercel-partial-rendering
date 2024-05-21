import { getVariantDiscountPrice } from './get-variant-discount-price';
import { getVariantMemeberPrice } from './get-variant-member-price';

export const initializeChangeAbleValue = (selectedVaraint: any = null) => {
  return {
    price:
      selectedVaraint?.price_format?.final_price?.amount_incl_tax_formatted ||
      '',
    discountPrice: getVariantDiscountPrice(selectedVaraint),
    qty: Number(selectedVaraint?.quantity || 0),
    productName: selectedVaraint?.name || '',
    sku: selectedVaraint?.sku || '',
    memberPrice: getVariantMemeberPrice(selectedVaraint),
  };
};
