import React from 'react';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { css } from 'styled-components';
import { rem } from 'polished';

import { CategoryProductTypes } from '@/category/types/category.types';
import { ProductTypes } from '@/product/types/product.types';
import ProductItem from '@/product/components/Card/ProductItem';

const CategoryProductList = ({
  categoryProducts,
  className,
}: {
  categoryProducts: CategoryProductTypes | null;
  className?: string;
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  let count = 0;

  return (
    <StyledDiv className={className} id="scrollableDiv" ref={ref}>
      {categoryProducts?.data?.map((product: ProductTypes, i: number) => {
        const data = {
          configurable_attributes: product?.configurable_attributes,
          base_image: {
            url: product?.images || product?.base_image?.url || '',
          },
          rollover_image: {
            url: product?.rollover_image?.url || '',
          },
          url_key: product?.url_key,
          name: product?.name,
          color_value: product?.color_value,
          price_format: product?.price_format,
          is_in_stock: product?.is_in_stock,
          is_group_by: product?.is_group_by || 0,
          id: product?.id,
          unit_of_measurement: product?.unit_of_measurement,
          min_order_qty: product?.min_order_qty,
          sku: product?.sku,
          brand: product?.brand,
          type: product?.type,
          is_new_product: product?.is_new_product,
        } as unknown as ProductTypes;

        count++;

        if (i % 4 === 0) {
          count = 0;
        }
        return (
          <AnimatePresence key={i}>
            <motion.div
              transition={{
                duration: 0.3,
                delay: 0.25 * (count + 1),
                ease: [0.2, 0.3, 0.2, 0.3],
              }}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{ once: true, amount: 0.2 }}
              className={clsx(`product-grid-item `)}
            >
              <ProductItem product={data} />
            </motion.div>
          </AnimatePresence>
        );
      })}
    </StyledDiv>
  );
};

export default CategoryProductList;

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    margin: 0 -5px;

    .product-grid-item {
      flex: 0 0 25%;
      padding: 0 5px;
      margin-bottom: ${rem(35)};

      @media (min-width: calc(${theme.breakPoints.largeDesktop} + 1px)) {
        flex: 0 0 20%;
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        flex: 0 0 33.33%;
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        flex: 0 0 50%;
      }
    }

    &.custom-col {
      .product-grid-item {
        flex: 0 0 25%;

        @media (min-width: calc(${theme.breakPoints.xlDesktop} + 1px)) {
          flex: 0 0 20%;
        }

        @media (max-width: ${theme.breakPoints.tablet}) {
          flex: 0 0 33.33%;
        }

        @media (max-width: ${theme.breakPoints.tab}) {
          flex: 0 0 50%;
        }
      }
    }

    .category-product-loader {
      display: block;
      position: relative;
    }
  `}
`;
