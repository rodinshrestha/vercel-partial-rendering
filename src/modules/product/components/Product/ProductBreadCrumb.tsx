import React from 'react';

import { BreadCrumb } from '@/core/components/BreadCrumb';
import { ucFirst } from '@/core/utils/string';
import { ProductTypes } from '@/product/types/product.types';

type Props = {
  productWithSlug: Array<string>;
  productData: ProductTypes;
  selectedVaraint: any;
};

const ProductBreadCrumb = ({
  productWithSlug,
  productData,
  selectedVaraint,
}: Props) => {
  const crumb = productWithSlug.reduce(
    (acc: any, iterator, i) => {
      if (i === productWithSlug.length - 1) {
        return [
          ...acc,
          { title: ucFirst(ucFirst(productData?.name || iterator)) },
        ];
      }

      return [
        ...acc,
        {
          title: ucFirst(
            selectedVaraint?.name || productData?.name || iterator
          ),
          link: `/product/${iterator}`,
        },
      ];
    },
    [
      {
        title: 'Home',
        link: '/',
      },
    ]
  );

  return <BreadCrumb crumbs={crumb} />;
};

export default ProductBreadCrumb;
