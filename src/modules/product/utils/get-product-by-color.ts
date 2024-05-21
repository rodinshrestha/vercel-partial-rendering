import {
  ProductTypes,
  VariationProductDetails,
} from '@/product/types/product.types';

export const getColorByQty = (productData: ProductTypes): string => {
  const isGreen = Boolean(
    ('configurable_attributes' in productData && !!productData.is_in_stock) ||
      (Number(productData.quantity) > 25 && Boolean(productData.is_in_stock))
  );
  const isGrey = Boolean(
    Number(productData.quantity) <= 0 || Boolean(!productData.is_in_stock)
  );
  const isYellow = Boolean(Number(productData.quantity) <= 25);

  switch (true) {
    case isGreen:
      return 'green';
    case isGrey:
      return 'grey';
    case isYellow:
      return 'yellow';
    default:
      return 'grey';
  }
};

//TODO check this color code and css of color RODHIN SHRESTHA

export const getVariationProductColorByQty = (
  data: VariationProductDetails
): string => {
  const isGreen = Boolean(
    Number(data.quantity) > 25 && Boolean(data.is_in_stock)
  );
  const isGrey = Boolean(
    Number(data.quantity) <= 0 || Boolean(!data.is_in_stock)
  );
  const isYellow = Boolean(Number(data.quantity) < 25);

  switch (true) {
    case isGreen:
      return 'green';
    case isGrey:
      return 'grey';
    case isYellow:
      return 'yellow';
    default:
      return 'grey';
  }
};
