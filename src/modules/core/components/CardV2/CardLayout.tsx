import React from 'react';

import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { SwiperSlide } from 'swiper/react';
import clsx from 'clsx';

import { CategoryType } from '@/builder/components/CategoryCarousel/category-type';
import { breakPoints } from '@/theme/breakPoints';
import useMediaQuery from '@/core/hooks/useMediaQuery';
import { categoryData } from '@/builder/components/CategoryCarousel/category-helper';

import { StyledTitle } from '../ContentBlock';
import Swiper from '../Swiper';

import CardItem from './CardItem';

type CardHeightTypes = 'large' | 'medium' | 'small';

export type CardLayoutType = {
  data: Array<CategoryType>;
  cardHeight?: CardHeightTypes;
  sectionTitle?: string;
  className?: string;
};

const CardLayout = ({
  cardHeight = 'small',
  data,
  sectionTitle,
  className,
}: CardLayoutType) => {
  const isTab = useMediaQuery(breakPoints.tab);
  if (!data) return;

  return (
    <StyledLayout className={clsx('card-layout')}>
      {sectionTitle && (
        <div className="title  mb-30">
          <StyledTitle className="text-center section-title">
            <strong>{sectionTitle}</strong>
          </StyledTitle>
        </div>
      )}

      {!isTab ? (
        <LayoutWrapper
          className={clsx(className, {
            'custom-card-item': cardHeight === 'small',
          })}
        >
          {data.map((el, index) => (
            <CardItem
              cardHeight={cardHeight}
              className={clsx({
                'category-card-item': cardHeight === 'small',
              })}
              key={index}
              {...categoryData(el)}
              tag="h2"
            />
          ))}
        </LayoutWrapper>
      ) : (
        <Swiper
          slidesPerView={1.2}
          spaceBetween={0}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
        >
          {data.map((el, index) => (
            <SwiperSlide key={index}>
              <CardItem
                cardHeight={cardHeight}
                key={index}
                {...categoryData(el)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </StyledLayout>
  );
};

export default CardLayout;

const StyledLayout = styled.div`
  ${() => css`
    .swiper {
      .swiper-slide {
        text-align: center !important;
      }
    }
  `}
`;

const LayoutWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    margin: 0 -8px;
    flex-wrap: wrap;
    row-gap: ${rem(16)};
    justify-content: center;

    .card-item {
      flex: 0 0 25%;
      max-width: 25%;

      @media (max-width: ${theme.breakPoints.tab}) {
        flex: 0 0 33.33%;
        max-width: 33.33%;
      }

      &.category-card-item {
        flex: 0 0 20%;
        max-width: 20%;
        padding: 0 8px;

        @media (max-width: ${theme.breakPoints.tab}) {
          flex: 0 0 25%;
          max-width: 25%;
        }
      }
    }
  `}
`;
