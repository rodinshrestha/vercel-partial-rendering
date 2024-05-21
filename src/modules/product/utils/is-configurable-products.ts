import { ProductTypes } from '@/product/types/product.types';

export const isConfigurableProducts = (
  productData: Partial<ProductTypes> = {}
) => 'configurable_attributes' in productData;
