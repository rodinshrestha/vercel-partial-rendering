import { VariationProductDetails } from '@/product/types/product.types';

export type SelectedProductVariants = {
  variants: { [key: string]: Array<VariationProductDetails> } | null;

  selectedAttributes: Array<VariationProductDetails>;
};

//Any for now later it will be string.
export type ProductIdType = any;
