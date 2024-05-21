import React from 'react';

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules';
import 'swiper/css';
import { Swiper as SwiperSlider, SwiperProps } from 'swiper/react';

import { StyledSwiper } from './style';

interface IProps {
  children: React.ReactNode;
}

const Swiper = ({ children, ...props }: IProps & SwiperProps) => {
  const {
    loop = false,
    centeredSlides = false,
    navigation = false,
    pagination = false,
    ...rest
  } = props;
  return (
    <StyledSwiper>
      <SwiperSlider
        modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
        spaceBetween={20}
        slidesPerView={4}
        centeredSlides={centeredSlides}
        loop={loop}
        navigation={navigation}
        pagination={
          pagination
            ? {
                type: 'fraction',
              }
            : false
        }
        {...rest}
      >
        {children}
      </SwiperSlider>
    </StyledSwiper>
  );
};

export default Swiper;
