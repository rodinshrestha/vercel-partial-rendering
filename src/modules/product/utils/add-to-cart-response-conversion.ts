import { ProductTypes } from '@/product/types/product.types';

export const addToCartResponseConversion = (
  data: ProductTypes,
  productId?: string
) => {
  return [
    {
      product_id: productId as string,
      qty: Number(data.quantity),
      action: 'create',
    },
  ];
};
