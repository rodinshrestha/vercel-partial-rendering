import { ProductTypes, VariationProductDetails } from "../types/product.types";

/**
 *
 * @param data Product data
 * @param selectedGroupBy Configurable product varaints key
 * @param isConfigurableProduct check the product type : simple or configurable
 * @param slug router slug
 * @returns varaint type with object
 */
export const getCurrentProductVariants = (
  data: ProductTypes,
  selectedGroupBy: string | null,
  isConfigurableProduct: boolean,
  slug: Array<string> | string
): any => {
  // For simple product
  if (!isConfigurableProduct) return null;

  // Group by Zero
  if (!data.is_group_by) {
    // Group by zero with single variants product.
    if (
      Object.keys(data.configurable_attributes?.variations || {}).length ===
        1 &&
      selectedGroupBy
    ) {
      return {
        [selectedGroupBy]: data.configurable_attributes?.variations[
          selectedGroupBy
        ].map((x) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { variants, ...rest } = x || {};
          return {
            ...rest,
            ...data.configurable_attributes?.product_details[x.id],
          };
        }),
      };
    }

    return data.configurable_attributes?.variations || null;
  }

  // For configurable products group by 1
  const currentSelectedVariants =
    (data.configurable_attributes &&
      data.configurable_attributes.variations?.[selectedGroupBy || ""]?.find(
        (x) => x.url_key === slug
      )) ||
    {};

  // For configurable product group by 1 and product with single variant.
  if (selectedGroupBy && "id" in currentSelectedVariants) {
    return {
      [selectedGroupBy]: data.configurable_attributes?.variations[
        selectedGroupBy
      ].map((x) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { variants, ...rest } = x || {};
        return {
          ...rest,
          ...data.configurable_attributes?.product_details[x.id],
        };
      }),
    };
  }

  return {
    ...getCurrentGroupByAttributes(selectedGroupBy, data),
    ...variantsMapped(currentSelectedVariants, data),
  };
};

/**
 * @param found : Found the variants in configurable product.
 * @param data : product details
 * @returns: Nested object which converts the array of string(key) to its own object on based on their  string as key id
 */
export const variantsMapped = (
  found:
    | VariationProductDetails
    | { [key: string]: Array<VariationProductDetails> },
  data: ProductTypes
) => {
  if (!found.variants) return {};
  return Object.entries(found.variants).reduce((acc, iterator) => {
    const [key, value] = iterator;

    /**
     * If type of value is string then it a last object.
     * Mapped those string to get their corresponding object.
     */
    if (Array.isArray(value) && typeof value[0] === "string") {
      return {
        ...acc,
        [key]: value.map(
          (x) =>
            data.configurable_attributes &&
            data.configurable_attributes.product_details[x]
        ),
      };
    }
    /**
     * Nested recursive until u wont find the array of string in variants which is last object
     */
    return {
      ...acc,
      [key]: value.map((x: VariationProductDetails) => ({
        ...x,
        //Recursive if variants found in object.
        variants: variantsMapped(x, data),
      })),
    };
  }, {});
};

const getCurrentGroupByAttributes = (
  selectedGroupBy: string | null,
  productData: ProductTypes
) => {
  if (!selectedGroupBy) return [];

  if (productData.configurable_attributes) {
    if (!productData.configurable_attributes.variations[selectedGroupBy]) {
      return [];
    }

    return {
      [selectedGroupBy]:
        productData.configurable_attributes.variations[selectedGroupBy],
    };
  }

  // This case should be exist in configurable product. group by 1
  return { [selectedGroupBy]: [] };
};
