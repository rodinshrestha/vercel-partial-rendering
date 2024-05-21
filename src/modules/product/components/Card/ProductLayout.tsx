'use client';
import React from 'react';

import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { SwiperSlide } from 'swiper/react';
import dynamic from 'next/dynamic';

import useMediaQuery from '@/core/hooks/useMediaQuery';
import { breakPoints } from '@/theme/breakPoints';
import { ProductTypes } from '@/product/types/product.types';

import ProductItem from './ProductItem';

const SwiperComponent = dynamic(() => import('@/core/components/Swiper'), {
  ssr: false,
});

type textAlignType = 'right' | 'left' | 'center';

interface ProductLayoutProps {
  // TODO: FIX TYPE RAKESH
  products: Array<ProductTypes>;
  tag?: string;
  sectionTitle?: string;
  position?: textAlignType;
  navigation?: boolean;
  slidesPerView?: number;
  swiperBreakPoints?: Record<string, Record<'slidesPerView', number>>;
  forceSlider?: boolean;
  className?: string;
}

const ProductLayout = ({
  products,
  sectionTitle,
  className,
  tag,
  position = 'left',
  navigation = false,
  slidesPerView,
  swiperBreakPoints,
  forceSlider = false,
}: ProductLayoutProps) => {
  const isTablet = useMediaQuery(breakPoints.tablet);
  if (!products?.length) return '';

  return (
    <StyledProductLayout className={className}>
      {sectionTitle && (
        <StyledTitle
          className="mb-30"
          as={tag || 'h3'}
          style={{ textAlign: `${position}` }}
        >
          <strong>{sectionTitle}</strong>
        </StyledTitle>
      )}
      {isTablet || forceSlider ? (
        <SwiperComponent
          slidesPerView={slidesPerView || 2}
          spaceBetween={15}
          loop={true}
          freeMode={true}
          navigation={navigation}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={
            swiperBreakPoints || {
              768: {
                slidesPerView: 3,
              },

              1200: {
                slidesPerView: 4,
              },
            }
          }
        >
          {products.map((product, index) => {
            return (
              <SwiperSlide key={index}>
                <ProductItem {...{ product }} />
              </SwiperSlide>
            );
          })}
        </SwiperComponent>
      ) : (
        <StyledLayoutwrapper className="product-list-wrap">
          {products.map((product, index) => {
            return (
              <StyledProductItemWrap className="product-item-wrap" key={index}>
                <ProductItem {...{ product }} />
              </StyledProductItemWrap>
            );
          })}
        </StyledLayoutwrapper>
      )}
    </StyledProductLayout>
  );
};

export default ProductLayout;

// TODO: Category listing uses the same function import this to there?
export const StyledLayoutwrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    margin: 0 -8px;
    flex-wrap: wrap;
    row-gap: ${rem(70)};

    @media (max-width: ${theme.breakPoints.tablet}) {
      row-gap: ${rem(50)};
    }

    @media (max-width: ${theme.breakPoints.mobile}) {
      row-gap: ${rem(30)};
    }

    &.loader-block {
      height: 50vh;
    }

    &.custom-col {
       {
        flex: 0 0 33.33%;
        max-width: 33.33%;
      }
    }
  `}
`;

export const StyledTitle = styled.h3`
  text-transform: capitalize;
`;

const StyledProductLayout = styled.div`
  ${() => css`
    .swiper-slide {
      height: auto;
    }
  `}
`;

export const StyledProductItemWrap = styled.div`
  ${({ theme }) => css`
    padding: 0 ${rem(8)};
    flex: 0 0 25%;
    max-width: 25%;

    @media (min-width: calc(${theme.breakPoints.xlDesktop} + 1px)) {
      flex: 0 0 20%;
      max-width: 20%;
    }

    @media (max-width: ${theme.breakPoints.tab}) {
      flex: 0 0 33.33%;
      max-width: 33.33%;
    }

    @media (max-width: ${theme.breakPoints.mobile}) {
      flex: 0 0 50%;
      max-width: 50%;
    }

    .search-category {
      .card-img {
        border-radius: 12px;
      }
    }

    &.custom-col {
      flex: 0 0 33.33%;
      max-width: 33.33%;

      @media (min-width: calc(${theme.breakPoints.xlDesktop} + 1px)) {
        flex: 0 0 25%;
        max-width: 25%;
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        flex: 0 0 50%;
        max-width: 50%;
      }
    }
  `}
`;
