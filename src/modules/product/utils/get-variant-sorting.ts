import { VariationProductDetails } from '../types/product.types';

export default function getSortVariants(
  value: Array<VariationProductDetails>,
  key: string
) {
  const sortedValue = value.sort((a, b) => {
    return key in a && key in b
      ? Number(a[key]?.sort) - Number(b[key]?.sort)
      : Number(a?.sort) - Number(b?.sort);
  });
  return sortedValue;
}
