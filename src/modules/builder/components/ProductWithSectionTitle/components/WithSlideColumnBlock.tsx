import React from 'react';

import { SwiperProps, SwiperSlide } from 'swiper/react';

import { Col } from '@/core/components/Grid/Col';
import Swiper from '@/core/components/Swiper';

interface Iprops {
  sliderProps?: SwiperProps;
  children: (item: unknown, index: number) => React.ReactNode;
  data: unknown[];
}

const defaultOptions: SwiperProps = {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 20,
  breakpoints: {
    768: {
      slidesPerView: 3,
    },
  },
};

const WithSlideColumnBlock = ({
  data = [],
  sliderProps = {},
  children,
}: Iprops) => {
  const options = { ...defaultOptions, ...sliderProps };
  return (
    <Col>
      <Swiper {...options}>
        {data.map((item: any, index) => {
          const data = {
            base_image: {
              url: item?.image || item?.product?.base_image || '',
            },
            hoverImage: '',
            url_key: item?.product?.url_key,
            name: item?.product?.name,
            color_value: item?.product?.color_value,
            price_format: item?.product?.price_format,
            rollover_image: {
              url: item?.hover_image || item?.product?.rollover_image || '',
            },
            id: item?.product?.id,
            is_new_product: item?.product?.is_new_product,
          };
          return <SwiperSlide key={index}>{children(data, index)}</SwiperSlide>;
        })}
      </Swiper>
    </Col>
  );
};

export default WithSlideColumnBlock;
