import React from 'react';

import clsx from 'clsx';

import {
  ChangeAbleValueType,
  ProductTypes,
  VariationProductDetails,
} from '@/product/types/product.types';
import { SelectedProductVariants } from '@/product/types/selected-product-varaints-state.types';
import { getVariantAttributeDisable } from '@/product/utils/get-variant-attributes-disable';
import ProductGroupByController from '@/product/components/Product/ProductGroupByController';
import ImageWithFallback from '@/core/components/ImageWithFallback';
import { GROUP_BY_ZERO_PARENT_VISIBLE } from '@/product/constants/product.constant';
import { getGroupByZeroProductNature } from '@/product/utils/get-product-group-by-nature';
import { initializeChangeAbleValue } from '@/product/utils/initialize-changeable-value';

import SizeChartModal from '../SizeChartModal';

import { StyledDiv } from './style';

type Props = {
  slug: string;
  variantData: Array<VariationProductDetails>;
  setProductId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedProductVariants: React.Dispatch<
    React.SetStateAction<SelectedProductVariants>
  >;
  selectedProductVariants: SelectedProductVariants;
  productData: ProductTypes;
  setChangeAbleValue: React.Dispatch<React.SetStateAction<ChangeAbleValueType>>;
  index: number;
  productSlug: string;
  setAppliedQty: React.Dispatch<React.SetStateAction<number>>;
  setMinimumQuantity: React.Dispatch<React.SetStateAction<number>>;
  minimumQty: number;
  setSelectedVaraintsFromSKU: React.Dispatch<
    React.SetStateAction<VariationProductDetails | null>
  >;
};

const getDynamicVariants = (
  item: VariationProductDetails,
  productData: ProductTypes
) => {
  return Object.entries(item?.variants || {}).reduce((acc, iterator) => {
    const [key, value] = iterator;

    return {
      ...acc,
      [key]: value.map(
        (x) => productData.configurable_attributes?.product_details[x as any]
      ),
    };
  }, {});
};

const ProductVariantList = ({
  slug,
  variantData,
  setProductId,
  setSelectedProductVariants,
  selectedProductVariants,
  productData,
  setChangeAbleValue,
  index,
  productSlug,
  setAppliedQty,
  setMinimumQuantity,
  minimumQty,
  setSelectedVaraintsFromSKU,
}: Props) => {
  const handleVariantOnClick = (
    item: VariationProductDetails,
    disable: boolean,
    active: boolean
  ) => {
    if (disable || active) return;
    setSelectedVaraintsFromSKU(null);
    // last object where we should get the product id to add to cart
    if (item.id) {
      setProductId(item.id);
      const minQty = Number(item?.min_order_qty || minimumQty || 1);
      setAppliedQty(minQty);
      setMinimumQuantity(minQty);

      setChangeAbleValue(initializeChangeAbleValue(item));
      setSelectedProductVariants((prev) => {
        const found = prev.selectedAttributes.find(
          (x) => x.attribute_slug === item.attribute_slug
        );

        if (found) {
          return {
            ...prev,
            selectedAttributes: prev.selectedAttributes.map((x) =>
              x.attribute_slug === item.attribute_slug ? item : x
            ),
          };
        }

        return {
          ...prev,
          selectedAttributes: [...prev.selectedAttributes, item],
        };
      });

      const productGroupByZeroNature = getGroupByZeroProductNature(productData);

      if (
        productGroupByZeroNature === GROUP_BY_ZERO_PARENT_VISIBLE ||
        productData.is_group_by
      ) {
        //For Shallow routing
        window.history.replaceState(
          null,
          ``,
          `/product/${productSlug}/${item?.sku}`
        );
      }
    } else {
      setProductId('');
      setChangeAbleValue(initializeChangeAbleValue());
      setSelectedProductVariants((prev) => {
        const found = prev.selectedAttributes.find(
          (x) => x.attribute_slug === item.attribute_slug
        );

        if (found) {
          //Updates the selected attributes from selected attributes.
          let updatedAttributes = prev?.selectedAttributes.map((x) =>
            item.attribute_slug === item.attribute_slug ? item : x
          );

          /**
           * Finds the index of selected attributes.
           */
          const index = updatedAttributes?.findIndex(
            (x) => x.attribute_slug === item.attribute_slug
          );

          /**
           *  Finds the index of selected attributes.
           *  Removes the other attributes from that selected
           *  After that index: resetting attributes
           */
          updatedAttributes =
            index || index === 0
              ? //remove the rest of the attributes from the updated attribute index.
                updatedAttributes?.splice(0, index + 1)
              : updatedAttributes;

          return {
            variants: {
              ...prev.variants,
              ...getDynamicVariants(item, productData),
            },
            selectedAttributes: updatedAttributes,
          };
        }

        return {
          variants: {
            ...prev.variants,
            ...getDynamicVariants(item, productData),
          },
          selectedAttributes: [...prev.selectedAttributes, item],
        };
      });
    }
  };

  return (
    <StyledDiv>
      <span className="var-title">{slug}</span>:
      <div
        className={clsx('varaints-wrapper', { 'size-attr': slug === 'size' })}
      >
        {variantData.map((item, i) => {
          const disable = getVariantAttributeDisable(item);
          return (
            <ProductGroupByController
              disable={disable}
              handleOnClick={handleVariantOnClick}
              index={index}
              item={item}
              productData={productData}
              key={i}
              selectedProductVariants={selectedProductVariants}
              productSlug={productSlug}
              setProductId={setProductId}
            >
              {slug === 'color' &&
              (typeof item.thumbnail_image != 'string'
                ? item?.thumbnail_image?.url
                : item.thumbnail_image) ? (
                <>
                  <ImageWithFallback
                    src={
                      typeof item.thumbnail_image != 'string'
                        ? item?.thumbnail_image?.url || ''
                        : item.thumbnail_image || ''
                    }
                    height={100}
                    width={80}
                    alt={item.label || ''}
                    className="object-contain"
                  />
                </>
              ) : slug === 'color' &&
                (typeof item.thumbnail_image != 'string'
                  ? !item?.thumbnail_image?.url
                  : !item.thumbnail_image) ? (
                // If the color doesn't have thumbnail image then show a div with same height as the image
                <>
                  <div
                    className="color-text"
                    style={{
                      height: '100px',
                      width: '80px',
                      backgroundColor: `${item.background_color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item?.label || item[slug]?.label || ''}
                  </div>
                </>
              ) : (
                <div className="variants-title">
                  {item?.label || item[slug]?.label || ''}
                </div>
              )}
            </ProductGroupByController>
          );
        })}
      </div>
      {slug === 'size' && productData.size_chart_id && (
        <SizeChartModal productData={productData} />
      )}
    </StyledDiv>
  );
};

export default ProductVariantList;
