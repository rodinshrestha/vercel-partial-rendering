'use client';
import React from 'react';

import styled, { css } from 'styled-components';
import clsx from 'clsx';
import { rem } from 'polished';

import { SectionAttribute } from '@/builder/types/section.types';
import { RowAttributes } from '@/builder/types/row.types';
import { removeNullFromObject } from '@/builder/utils/remove-null-from-object';
import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
import ContentBlock from '@/core/components/ContentBlock';
import ImageWithFallback from '@/core/components/ImageWithFallback';

import { ImageBlockTypes } from '../BannerBuilder/banner-type';

export type ContentBlockProps = {
  data: ImageBlockTypes;
  sectionAttributes: SectionAttribute;
  rowAttributes: RowAttributes;
  backgroundContent: JSX.Element;
};
const TextImageBlock = ({
  data,
  sectionAttributes,
  rowAttributes,
  backgroundContent,
}: ContentBlockProps) => {
  const { className, containerType, id, ...restSectionAttribute } =
    sectionAttributes;
  const normal = containerType === 'normal';
  const {
    gutterSpace,
    id: rowId,
    className: rowClassName,
    ...restRowAttribute
  } = rowAttributes;
  const { src, position } = data;

  return (
    <StyledSection
      className={clsx(className, 'text-image-block', 'pt-75', 'pb-75')}
      style={{
        ...removeNullFromObject(restSectionAttribute),
      }}
      id={id}
    >
      {backgroundContent}
      <Container fluid={!normal} className={clsx(gutterSpace && 'p-0')}>
        <Row
          noGutter={gutterSpace}
          className={clsx(rowClassName, 'align-items-center', {
            ['flex-row-reverse']: position === 'left',
          })}
          id={rowId || ''}
          style={{ ...removeNullFromObject(restRowAttribute), rowGap: '30px' }}
        >
          <Col lg={6}>
            <div className="col-text">
              <ContentBlock data={data} />
            </div>
          </Col>

          <Col lg={6}>
            <div className="col-image">
              <ImageWithFallback
                src={src}
                alt="text-image"
                className="object-cover"
                fill
              />
            </div>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default TextImageBlock;

const StyledSection = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.color.white[1000]};
    color: inherit;

    .row {
      @media (max-width: ${theme.breakPoints.tab}) {
        flex-direction: column-reverse;
      }
    }

    .col-image {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding-top: 67%;
      min-height: 615px;
    }

    .col-text {
      padding: 15px;

      @media (max-width: ${theme.breakPoints.tablet}) {
        padding: 0 ${rem(10)};
      }

      & > div {
        text-align: left !important;
      }

      .content {
        font-size: ${rem(14)};
        line-height: ${rem(18)};
        letter-spacing: ${rem(1.4)};

        @media (max-width: ${theme.breakPoints.mobile}) {
          font-size: ${rem(12)};
          line-height: ${rem(18)};
          letter-spacing: ${rem(1.2)};
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          max-width: 95%;
        }

        p {
          font-size: inherit;
          line-height: inherit;
          letter-spacing: inherit;
        }
      }

      .btn-wrap {
        margin-top: ${rem(20)};
      }
    }

    & + .text-image-block {
      @media (max-width: ${theme.breakPoints.tablet}) {
        margin-top: ${rem(30)};
      }
    }
  `}
`;
