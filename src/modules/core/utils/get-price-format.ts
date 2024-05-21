import { PriceFormatList } from '@/product/types/product.types';

export const getRegularPriceFormat = (price_format?: PriceFormatList) => {
  const { regular_price } = price_format || {};
  const regularPriceWithTax = regular_price?.amount_incl_tax || 0;
  const regularPriceFormatedWithTax =
    regular_price?.amount_incl_tax_formatted || '';

  return {
    regularPriceFormatedWithTax,
    regularPriceWithTax,
  };
};

export const getFinalPriceFormat = (price_format?: PriceFormatList) => {
  const { final_price } = price_format || {};
  const finalPriceWithTax = final_price?.amount_incl_tax || 0;
  const finalPriceFormatedWithTax =
    final_price?.amount_incl_tax_formatted || '';

  return {
    finalPriceFormatedWithTax,
    finalPriceWithTax,
  };
};
