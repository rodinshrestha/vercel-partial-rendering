'use client';

import clsx from 'clsx';

import BackgroundImage from '@/builder/components/BackgroundContent/helpers/BackgroundImage';
import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
import SectionTitle from '@/core/components/SectionTitle';
import { getVideoPlayer } from '@/builder/components/BackgroundContent/helpers/BackgroundContent';
import { CategoryBanner } from '@/category/types/category.types';

import { StyledSection } from './style';

const CategoryHeroBanner = ({ heroBanner }: { heroBanner: CategoryBanner }) => {
  const imageURL = heroBanner.background_image;
  const videoId = heroBanner.video_id;
  const videoType = heroBanner.video_type;
  const type = heroBanner.background_type;

  const bannerContent = {
    title: heroBanner.hero_banner_title,
    subtitle: heroBanner.hero_banner_sub_title,
    content: heroBanner.hero_banner_content,
  };

  return (
    <StyledSection className={clsx('banner', 'small')}>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className="banner-wrapper">
              {type === 'image' && imageURL ? (
                <BackgroundImage src={imageURL} imageObjectFit="cover" />
              ) : (
                getVideoPlayer(videoType, videoId)
              )}
              <div className="banner-content text-white">
                <SectionTitle {...bannerContent} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};
export default CategoryHeroBanner;
