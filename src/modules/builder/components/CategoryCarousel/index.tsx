'use client';
import React from 'react';

import clsx from 'clsx';
import styled from 'styled-components';
import { css } from 'styled-components';

import { SectionAttribute } from '@/builder/types/section.types';
import { RowAttributes } from '@/builder/types/row.types';
import { CardHeightTypes } from '@/core/components/ContentCard';
import { removeNullFromObject } from '@/builder/utils/remove-null-from-object';
import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
// import CircularCardLayout from '@/core/components/Card/CircularCardLayout';
import CardLayout from '@/core/components/CardV2/CardLayout';

import { CategoriesProps } from './category-type';

type CategoryType = {
  data: CategoriesProps;
  sectionAttributes: SectionAttribute;
  rowAttributes: RowAttributes;
  backgroundContent: JSX.Element;
  sectionTitle?: string;
  cardHeight?: CardHeightTypes;
  hasWave?: boolean;
};

const CategoryCarousel = ({
  data,
  sectionAttributes,
  rowAttributes,
  sectionTitle,
  // cardHeight = 'small',
  backgroundContent,
  hasWave = true,
}: CategoryType) => {
  // const { content_layout } = data;
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
      className={clsx(className, 'pt-75', 'pb-75', 'category-wrapper')}
      id={id}
      $hasWave={hasWave}
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
            <CardLayout
              data={data.categories}
              sectionTitle={sectionTitle}
              cardHeight="medium"
            />
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default CategoryCarousel;

const StyledSection = styled.section<{ $hasWave: boolean }>`
  ${({ theme }) => css`
    position: relative;
    overflow: hidden;

    .card-item {
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          .bg-overlay {
            background-color: ${theme.coreColor.primary.default.background};
          }

          .card-content {
            color: ${theme.coreColor.dark.default.background};
          }
        }
      }

      &:nth-child(even) {
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            .bg-overlay {
              background-color: ${theme.coreColor.dark.default.background};
            }

            .card-content {
              color: ${theme.coreColor.dark.default.color};
            }
          }
        }
      }
    }
  `}
`;
