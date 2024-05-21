import { PriceHistoryDataType, ProductTypes } from '../types/product.types';

export const mergePriceWithProductData = (
  product: ProductTypes,
  priceHistoryData?: PriceHistoryDataType
) => {
  const { product_specification = [] } = product || {};
  return [
    ...product_specification,
    ...(priceHistoryData
      ? [{ title: 'Price History', value: priceHistoryData }]
      : []),
  ];
};
