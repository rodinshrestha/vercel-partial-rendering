'use client';
import React from 'react';

import styled from 'styled-components';
import { css } from 'styled-components';
import { rem, transparentize } from 'polished';
import clsx from 'clsx';

import Accordion from '@/core/components/Accordion';
import ReactHtmlParser from '@/core/components/ReactHtmlParser';
import Loader from '@/core/components/Loader';
import useTranslations from '@/core/hooks/useTranslations';

import { ProductTypes } from '../types/product.types';
import useAccordionToggleStore from '../store/useAccordionToggleStore';
import { getProductSpecification } from '../utils/get-product-specification';

type Props = {
  product: ProductTypes;
  additionalData: ProductTypes | null;
  additionalDataLoader: boolean;
};

type SlugType =
  | 'product_description'
  | 'ingredients'
  | 'nutritional_content'
  | 'product_information';

const ProductAdditionalDetails = ({
  product,
  additionalData,
  additionalDataLoader,
}: Props) => {
  const { _t } = useTranslations();
  const { accordionTitle, updateTitle } = useAccordionToggleStore();
  const productSpecification = React.useMemo(
    () =>
      additionalData?.product_specification || product?.product_specification,
    [additionalData?.product_specification, product?.product_specification]
  );

  const productDescription =
    additionalData?.description || product?.description;

  const productShortDescription =
    additionalData?.short_description || product?.short_description;

  const showProductSpecification = productSpecification?.reduce(
    (acc, iterator) => {
      if (acc) {
        return true;
      }
      return Boolean(getProductSpecification(iterator));
    },
    false
  );

  const technicalDetails =
    productSpecification?.find(
      (el) => el.slug === 'technical_details' && el.data
    ) || null;

  const data = React.useMemo(() => {
    return [
      {
        slug: 'product_description',
        title: _t('product_description', 'Product Description'),
        showAccordion: Boolean(productDescription),
        children: productDescription
          ? ReactHtmlParser(productDescription)
          : null,
      },
      {
        slug: 'specifications',
        title: _t('specifications', 'Specifications'),
        showAccordion: Boolean(productShortDescription),
        children: productShortDescription
          ? ReactHtmlParser(productShortDescription)
          : null,
      },
      {
        slug: 'nutritional_content',
        title: _t('nutritional_content', 'Nutritional Content'),
        showAccordion: !!technicalDetails,
        children:
          technicalDetails && typeof technicalDetails?.data === 'string'
            ? ReactHtmlParser(technicalDetails.data)
            : null,
      },
      {
        slug: 'product_information',
        title: _t('product_information', 'Product Information'),
        showAccordion: showProductSpecification,
        children: productSpecification ? (
          <ul className="product-specification-item">
            {productSpecification.map((item, i) => {
              if (!getProductSpecification(item)) return null;
              return (
                <li key={i}>
                  <strong>{item.label}</strong> :{' '}
                  {getProductSpecification(item)}
                </li>
              );
            })}
          </ul>
        ) : null,
      },
    ];
  }, [
    _t,
    productDescription,
    productShortDescription,
    productSpecification,
    showProductSpecification,
    technicalDetails,
  ]);

  React.useEffect(() => {
    data
      .filter((el) => !!el.showAccordion)
      .forEach((el, i) => {
        if (i === 0) updateTitle(el.slug);
      });
  }, [data, updateTitle]);

  return (
    <ProductAccordionWrap>
      {additionalDataLoader && (
        <div className="loader-wrapper">
          <Loader color="primary" type="spinner" className="loader-container" />
        </div>
      )}
      {data.map((item, i) => {
        if (!item.showAccordion) return null;
        const slug = item.slug as SlugType;
        return (
          <Accordion
            key={i}
            className={clsx('according-item', {
              loader: additionalDataLoader,
            })}
            title={item.title}
            tag="p"
            expanded={accordionTitle === slug}
            onChange={() => updateTitle(accordionTitle === slug ? '' : slug)}
          >
            {item.children}
          </Accordion>
        );
      })}
    </ProductAccordionWrap>
  );
};

export default ProductAdditionalDetails;

const ProductAccordionWrap = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    row-gap: ${rem(5)};
    position: relative;

    @media (max-width: ${theme.breakPoints.tab}) {
      margin-left: 0;
      max-width: 100%;
    }

    .loader-wrapper {
      position: absolute;
      height: 100%;
      width: 100%;
      opacity: 1;
      z-index: 999;
      background-color: ${transparentize(0.5, theme.color.grey[300])};
    }

    .according-item {
      background-color: ${theme.color.white['1000']};
      border-radius: ${rem(20)};
      padding: ${rem(12)} 0;

      .accordion-header {
        p {
          text-transform: uppercase;
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
      }

      &.active {
        .accordion-header {
          margin-bottom: ${rem(10)};
        }
      }

      .accordion-content {
        padding-right: ${rem(20)};
        font-size: ${rem(12)};
        line-height: ${rem(14)};
        letter-spacing: ${rem(1.2)};

        p {
          font-size: ${rem(12)};
          line-height: ${rem(14)};
          letter-spacing: ${rem(1.2)};

          & + P {
            margin-top: ${rem(12)};
          }
        }

        ul {
          padding-left: ${rem(15)};

          li {
            line-height: ${rem(18)};
            margin-bottom: ${rem(5)};
          }
        }
      }
    }
  `}
`;
