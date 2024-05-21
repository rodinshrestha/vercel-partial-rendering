import React from 'react';

import clsx from 'clsx';

import {
  ProductTypes,
  VariationProductDetails,
} from '@/product/types/product.types';
import { SelectedProductVariants } from '@/product/types/selected-product-varaints-state.types';
import { getActiveVariants } from '@/product/utils/get-active-product';
import { shouldProductVariantsBeURL } from '@/product/utils/get-product-variants-url';
import Link from '@/core/components/Link';

type Props = {
  item: VariationProductDetails;
  productData: ProductTypes;
  selectedProductVariants: SelectedProductVariants;
  index: number;
  children: React.ReactNode;
  handleOnClick: (
    item: VariationProductDetails,
    disable: boolean,
    active: boolean
  ) => void;
  disable: boolean;
  productSlug: string;
  className?: string;
  setProductId: React.Dispatch<React.SetStateAction<string>>;
};

const ProductGroupByController = ({
  productData,
  item,
  selectedProductVariants,
  index,
  children,
  disable,
  handleOnClick,
  className,
  productSlug,
  setProductId,
}: Props) => {
  const active = getActiveVariants(selectedProductVariants, item);

  if (shouldProductVariantsBeURL(productData, index, item)) {
    return (
      <Link
        href={`/product/${item.url_key}`}
        className={clsx(className, 'varaint-list', {
          active: index === 0 ? productSlug === item.url_key : active,
          disable,
        })}
        onClick={() => setProductId('')}
        title={item?.label || item?.[productSlug]?.label || ''}
      >
        {children}
      </Link>
    );
  }

  return (
    <div
      onClick={() => handleOnClick(item, disable, active)}
      className={clsx('varaint-list', {
        active: active,
        disable,
      })}
      title={item?.label || item?.[productSlug]?.label || ''}
    >
      {children}
    </div>
  );
};

export default ProductGroupByController;
