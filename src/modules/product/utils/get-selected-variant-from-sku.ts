import { ProductTypes, VariationProductDetails } from '../types/product.types';

import { getProductVariationsGroupBy } from './get-product-group-by';

/**
 *
 * @param productData Product data
 * @param selectedVariantDetails selected varaints pluck from the URL.
 * @exmaple : /channel/store/product/[product-url]/selected final product SKU from all variants.
 * Rematrix all the variants to pluck the actual varaints from SKU
 * @returns
 */
export const getSelectedVariantFromSKU = (
  productData: ProductTypes,
  currentVaraintDetails: VariationProductDetails | null
) => {
  if (!currentVaraintDetails) {
    return {
      error: true,
      selectedVariantList: [],
      productId: null,
      lastVariantMatrix: null,
      selectedVaraint: null,
    };
  }

  if (isProductHasOneVariant(productData)) {
    const atributeSlug = getVariantAttributeSlug(productData);

    const selectedVariantWithAttriId = {
      ...currentVaraintDetails,
      attribute_slug: atributeSlug,
    };
    return {
      error: false,
      selectedVariantList: [selectedVariantWithAttriId],
      productId: currentVaraintDetails?.id || null,
      lastVariantMatrix: null,
      selectedVaraint: selectedVariantWithAttriId,
    };
  }

  const variantKeyList = getVariantKey(productData);

  const {
    error,
    selectedVariantList,
    productId,
    lastVariantMatrix,
    selectedVaraint,
  } = getSelectedVaraint(variantKeyList, currentVaraintDetails, productData);

  if (error) {
    return {
      error: true,
      selectedVariantList: [],
      productId: null,
      lastVariantMatrix: null,
      selectedVaraint: null,
    };
  }

  return {
    selectedVariantList,
    productId,
    lastVariantMatrix,
    error,
    selectedVaraint,
  };
};

/**
 * CHeck the current product is made up from single variants or multiple variants
 */
const isProductHasOneVariant = (productData: ProductTypes) => {
  const { variations = null } = productData?.configurable_attributes || {};

  if (!variations || Object.keys(variations).length > 1) {
    return false;
  }
  return true;
};

/***
 * Pluck all the variants keys from the product
 */
const getVariantKey = (productData: ProductTypes) => {
  const { variations = null } = productData?.configurable_attributes || {};

  return Object.entries(variations || {}).reduce(
    (acc: Array<string>, iterator) => {
      const [key] = iterator;

      return [...acc, key];
    },
    []
  );
};

/**
 *
 * @param variantKeyList All the key of varaints
 * @param selectedVariantDetails finaly varaints product details
 * @param productData Product details.
 * @returns
 */
const getSelectedVaraint = (
  variantKeyList: Array<string> = [],
  selectedVariantDetails: VariationProductDetails | null,
  productData: ProductTypes
) => {
  if (!selectedVariantDetails) {
    return {
      error: true,
      selectedVariantList: [],
      productId: null,
      lastVariantMatrix: null,
      selectedVaraint: null,
    };
  }

  const { variations = null } = productData?.configurable_attributes || {};

  return variantKeyList.reduce(
    (acc: any, iterator, i) => {
      const variantObj = selectedVariantDetails[iterator];

      if (acc.error || !variantObj || !variations) {
        return {
          error: true,
          selectedVariantList: [],
          productId: null,
          lastVariantMatrix: null,
          selectedVaraint: null,
        };
      }

      /**
       * If more than 2 varaints.
       * Need to select one varaints
       * To form the product matrix
       */
      if (i === 0) {
        const firstVariantDataList = variations[iterator];

        const firstVariantObj = firstVariantDataList.find(
          (x) => x.attribute_option_id === variantObj.id
        );

        if (!firstVariantObj) {
          return {
            error: true,
            selectedVariantList: [],
            productId: null,
            lastVariantMatrix: null,
            selectedVaraint: null,
          };
        }

        return {
          ...acc,
          selectedVariantList: [firstVariantObj],
          productId: null,
          lastVariantMatrix: null,
          selectedVaraint: firstVariantObj,
        };
      }

      const { selectedVariantList } = acc;

      const { error, selectedVaraint, productId, lastVariantMatrix } =
        getFinalProductDetails({
          productData,
          selectedVariant: selectedVariantList,
          index: i,
          variantObj,
          slug: iterator,
        });

      return {
        error,
        selectedVariantList: [...acc.selectedVariantList, selectedVaraint],
        productId,
        lastVariantMatrix,
        selectedVaraint,
      };
    },

    {
      error: false,
      selectedVariantList: [],
      productId: null,
      lastVariantMatrix: null,
    }
  );
};

type FinalProductDetailsProps = {
  productData: ProductTypes;
  selectedVariant: Array<any>;
  index: number;
  variantObj: VariationProductDetails;
  slug: string;
};

/**
 * Pluck the final varaints details
 */
const getFinalProductDetails = ({
  productData,
  selectedVariant,
  index,
  variantObj,
  slug,
}: FinalProductDetailsProps) => {
  /**
   * One varaints has already been selected and store in accumulator
   */
  const prevVaraint = selectedVariant.at(index - 1);

  const { variants = null } = prevVaraint || {};

  if (!variants) {
    return {
      error: true,
      selectedVaraint: [],
      productId: null,
      lastVariantMatrix: null,
    };
  }

  return getProductMatrix(productData, variants, variantObj, slug);
};

/**
 *  Generate the product matrix
 *
 */
const getProductMatrix = (
  productData: ProductTypes,
  variants: any,
  variantObj: VariationProductDetails,
  slug: string
) => {
  const { product_details = null } = productData?.configurable_attributes || {};

  if (!product_details) {
    return {
      error: true,
      selectedVaraint: [],
      productId: null,
      lastVariantMatrix: null,
    };
  }

  const productMatrixList = Object.entries(variants).reduce(
    (__: any, iterator) => {
      const [_, value] = iterator;

      /**
       * Last varaint prodcut
       */
      const finalProductVariant = (value as Array<string>).map(
        (x: string) => product_details[x]
      );

      return {
        lastVariantMatrix: {
          [slug]: finalProductVariant,
        },
        selectedVariantMatrixList: finalProductVariant,
      };
    },
    { lastVariantMatrix: null, selectedVariantMatrixList: [] }
  );

  /**
   * Last variantMaxtrix is required to replace the formed matrix.
   * WHere it has product id. In the case of group by 0
   */
  const { lastVariantMatrix, selectedVariantMatrixList } =
    productMatrixList || {};

  /**
   * Finds the product the from the last varaints.
   * As its matched from the SKU found in URL
   */
  const selectedVaraint = selectedVariantMatrixList.find(
    (x: VariationProductDetails) => x[slug].id === variantObj.id
  );

  return {
    lastVariantMatrix,
    selectedVaraint,
    error: false,
    productId: selectedVaraint?.id,
  };
};

/**
 *
 * Plucks the varaint key
 * Which is used to check the active state of varaints
 * For now its only work in product with 2 varaint only
 * @returns
 */
const getVariantAttributeSlug = (productData: ProductTypes) => {
  const { variations = null } = productData?.configurable_attributes || {};
  const groupBy = getProductVariationsGroupBy(productData) || '';

  if (!productData.is_group_by) {
    return groupBy;
  }

  if (!variations) {
    return null;
  }
  return variations[groupBy].reduce((acc, iterator) => {
    if (!iterator.variants) {
      return acc;
    }

    return Object.keys(iterator.variants)[0];
  }, '');
};
