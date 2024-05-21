'use client';
import { rem } from 'polished';
import styled, { css } from 'styled-components';
import dynamic from 'next/dynamic';
import { SwiperSlide } from 'swiper/react';

import useMediaQuery from '@/core/hooks/useMediaQuery';
import { SubCategory } from '@/category/types/category.types';
import { breakPoints } from '@/theme/breakPoints';
import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
// import CircularCard from '@/core/components/Card/CircularCard';
import CardItem from '@/core/components/CardV2/CardItem';

const SwiperComponent = dynamic(() => import('@/core/components/Swiper'), {
  ssr: false,
});

const CategoryListing = ({
  subCategories,
}: {
  subCategories: Array<SubCategory>;
}) => {
  const isTablet = useMediaQuery(breakPoints.tab);
  return (
    <StyledLayout>
      <Container fluid>
        <Row>
          <Col lg={11} xl={10} className="mx-auto">
            {subCategories.length <= 6 && !isTablet ? (
              <StyledLayoutWrapper className="layout-wrap">
                {subCategories.map((el, index) => {
                  const data = {
                    src: el.image,
                    href: el.url_key,
                    title: el.name,
                  };
                  return (
                    <div className="item-wrap" key={index}>
                      <CardItem {...data} cardHeight="small" />
                    </div>
                  );
                })}
              </StyledLayoutWrapper>
            ) : (
              <SwiperComponent
                slidesPerView={3.2}
                spaceBetween={10}
                loop={true}
                freeMode={true}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  768: {
                    slidesPerView: 3.5,
                  },

                  1024: {
                    slidesPerView: 5,
                  },
                }}
              >
                {subCategories.map((el, index) => {
                  const data = {
                    src: el.image,
                    href: el.url_key,
                    title: el.name,
                  };
                  return (
                    <SwiperSlide key={index}>
                      <CardItem cardHeight="small" key={index} {...data} />
                    </SwiperSlide>
                  );
                })}
              </SwiperComponent>
            )}
          </Col>
        </Row>
      </Container>
    </StyledLayout>
  );
};
export default CategoryListing;

const StyledLayout = styled.section`
  ${() => css`
    overflow-x: hidden;
    padding: ${rem(40)} 0;
  `}
`;

const StyledLayoutWrapper = styled.div`
  ${() => css`
    display: flex;
    margin: 0 -5px;
    flex-wrap: wrap;
    justify-content: center;

    .item-wrap {
      flex: 0 0 16.6666667%;
      max-width: 16.6666667%;
      padding: 0 ${rem(5)};
    }
  `}
`;
