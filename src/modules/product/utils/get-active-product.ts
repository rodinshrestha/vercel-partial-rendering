import { ProductTypes, VariationProductDetails } from '../types/product.types';
import { SelectedProductVariants } from '../types/selected-product-varaints-state.types';

export const getActiveProduct = (
  productData: ProductTypes,
  item: VariationProductDetails,
  slug: string,
  selectedProductVariants: SelectedProductVariants
) => {
  /**
   * For product with group by none
   */
  if (!productData.is_group_by) {
    return selectedProductVariants.selectedAttributes.some(
      (x) => x.attribute_option_id === item.attribute_option_id
    );
  } else {
    return slug === item.url_key;
  }
};

// export const getActiveVariants = (
//   selectedProductVariants: SelectedProductVariants,
//   item: VariationProductDetails
// ) => {
//   // Last varaints where we get product id
//   if (item?.id) {
//     return selectedProductVariants.selectedAttributes.some(
//       (x) => x.id === item.id
//     );
//   }

//   return selectedProductVariants.selectedAttributes.some(
//     (x) => x?.attribute_option_id === item?.attribute_option_id
//   );
// };

export const getActiveVariants = (
  selectedProductVariants: SelectedProductVariants,
  item: VariationProductDetails
) => {
  // Last varaints where we get product id
  if (item?.id) {
    return selectedProductVariants.selectedAttributes.some(
      (x) => x.id === item.id
    );
  }

  return selectedProductVariants.selectedAttributes.some(
    (x) => x?.attribute_option_id === item?.attribute_option_id
  );
};
