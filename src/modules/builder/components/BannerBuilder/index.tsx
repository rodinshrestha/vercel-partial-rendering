'use client';

import React from 'react';

import clsx from 'clsx';

import { removeNullFromObject } from '@/builder/utils/remove-null-from-object';
import { SectionAttribute } from '@/builder/types/section.types';
import { RowAttributes } from '@/builder/types/row.types';
import { SectionSettings } from '@/builder/types/builder.types';
import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
import BannerComponent from '@/core/components/BannerComponent';

import { BannerProps } from './banner-type';
import { StyledSection } from './style';

type IBanner = {
  data: BannerProps;
  backgroundContent: JSX.Element;
  sectionAttributes: SectionAttribute;
  rowAttributes: RowAttributes;
  image: SectionSettings;
  bannerBackgroundMedia: JSX.Element;
};

const BannerBuilder = ({
  data,
  sectionAttributes,
  backgroundContent,
  rowAttributes,
  bannerBackgroundMedia,
}: IBanner) => {
  const { className, containerType, id, ...restSectionAttribute } =
    sectionAttributes;

  const {
    gutterSpace,
    id: rowId,
    className: rowClassName,
    ...restRowAttribute
  } = rowAttributes;
  const normal = containerType === 'normal';
  return (
    <StyledSection
      style={{
        ...removeNullFromObject(restSectionAttribute),
      }}
      className={className}
      id={id}
    >
      {backgroundContent}
      <Container fluid={!normal} className={clsx(gutterSpace && 'p-0')}>
        <Row
          noGutter={gutterSpace}
          className={rowClassName || ''}
          id={rowId || ''}
          style={{ ...removeNullFromObject(restRowAttribute) }}
        >
          <Col>
            <BannerComponent
              data={data}
              bannerBackgroundMedia={bannerBackgroundMedia}
            />
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};
export default BannerBuilder;
