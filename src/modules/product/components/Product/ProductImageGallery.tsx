import React from "react";

import dynamic from "next/dynamic";
import { SwiperSlide } from "swiper/react";
import { rem } from "polished";
import styled, { css } from "styled-components";

import ImageWithFallback from "@/core/components/ImageWithFallback";
import { Image as ImageType } from "@/product/types/product.types";
import useMediaQuery from "@/core/hooks/useMediaQuery";
import { breakPoints } from "@/theme/breakPoints";
import ImageLightbox from "@/core/components/ImagePhotoSwiper";
import { getImageCacheUrl } from "@/product/utils/get-image-cache-url";
import DynamicImageFallBack from "@/core/components/ImageWithFallback/DynamicImageFallBack";

const SwiperComponent = dynamic(() => import("@/core/components/Swiper"), {
  ssr: false,
});

const ProductImageGallery = ({ data }: { data: Array<ImageType> }) => {
  const [imageIndex, setImageIndex] = React.useState(-1);

  const isTab = useMediaQuery(breakPoints.tab);
  if (!data.length) {
    return (
      <StyledDiv className="single-product-img">
        <ImageWithFallback
          src={""}
          alt="Product-img"
          fill
          className="object-contain"
        />
      </StyledDiv>
    );
  }

  const lightBoxImg = data.map((el) => ({
    url: getImageCacheUrl(el.url || ""),
    original: getImageCacheUrl(el.url || ""),
  }));

  return (
    <ProductImageWrapper className="pro-base-image">
      {isTab ? (
        <SwiperComponent
          slidesPerView={1.1}
          spaceBetween={10}
          mousewheel={true}
          freeMode={true}
          loop={true}
          pagination={false}
          autoplay={{
            delay: 12000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            667: {
              slidesPerView: 2.1,
            },
          }}
        >
          {data.map((el, index) => (
            <SwiperSlide key={index} onClick={() => setImageIndex(index)}>
              <StyledDiv>
                <DynamicImageFallBack
                  src={el.url || "/images/default.jpg"}
                  alt="Product-img"
                  fill
                  className={`object-${el.background_size || "object-contain"}`}
                />
              </StyledDiv>
            </SwiperSlide>
          ))}
        </SwiperComponent>
      ) : (
        data.map((el, index) => (
          <div
            className="img-item"
            key={index}
            onClick={() => setImageIndex(index)}
          >
            <StyledDiv className="large-screen">
              <DynamicImageFallBack
                src={el.url || "/images/default.jpg"}
                alt="Product-img"
                fill
                className={`object-${el.background_size || "object-contain"}`}
              />
            </StyledDiv>
          </div>
        ))
      )}
      <ImageLightbox
        images={lightBoxImg}
        index={imageIndex}
        setIndex={setImageIndex}
      />
    </ProductImageWrapper>
  );
};

export default ProductImageGallery;

const ProductImageWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;

    @media (min-width: calc(${theme.breakPoints.tab} + 1px )) {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      row-gap: ${rem(10)};
      margin: 0 -5px;
    }

    .img-item {
      flex: 0 0 33.33%;
      flex-grow: 1;
      padding: 0 ${rem(5)};

      &:nth-child(1n + 7) {
        flex: 0 0 100%;
      }
    }

    .swiper {
      .swiper-button-next,
      .swiper-button-prev {
        &::after {
          font-size: 16px;
        }
      }

      @media (min-width: calc(${theme.breakPoints.tab} + 1px )) {
        .swiper-button-next,
        .swiper-button-prev {
          top: auto;
          bottom: 0;
          transform: none;

          &::after {
            font-size: 16px;
          }
        }

        .swiper-button-next {
          right: 20%;
        }
        .swiper-button-prev {
          left: 20%;
        }
      }
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 10%;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 100%
      );
    }
  `}
`;

const StyledDiv = styled.div`
  ${({ theme }) => css`
    position: relative;
    padding-top: 133%;
    width: 100%;
    padding-left: ${rem(15)};

    @media (max-width: ${theme.breakPoints.tab}) {
      padding-left: 0;
    }

    &.single-product-img {
      padding-top: 100%;

      @media (max-width: ${theme.breakPoints.tablet}) {
        padding-top: 68%;
      }
    }

    .swiper {
      .swiper-button-next,
      .swiper-button-prev {
        top: 100%;
        transform: none;
      }
    }

    &.large-screen {
      @media (max-width: ${theme.breakPoints.tab}) {
        display: none;
      }
    }
  `}
`;
