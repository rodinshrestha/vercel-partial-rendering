'use client';
import React from 'react';

import styled, { css } from 'styled-components';
import clsx from 'clsx';

import CardLayout, { CardHeightTypes } from '@/core/components/ContentCard';
import { SectionAttribute } from '@/builder/types/section.types';
import { RowAttributes } from '@/builder/types/row.types';
import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
import { removeNullFromObject } from '@/builder/utils/remove-null-from-object';

import { ICard } from './card-section-type';

export type ContentBlockProps = {
  data: Array<ICard>;
  layoutType: CardHeightTypes;
  sectionAttributes: SectionAttribute;
  rowAttributes: RowAttributes;
  backgroundContent: JSX.Element;
};
const ContentBlockBuilder = ({
  data,
  layoutType,
  sectionAttributes,
  rowAttributes,
  backgroundContent,
}: ContentBlockProps) => {
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
      className={clsx(className, 'pt-75', 'pb-75')}
      style={{
        ...removeNullFromObject(restSectionAttribute),
      }}
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
            <CardLayout
              className={clsx({ 'full-width': gutterSpace })}
              data={[...data]}
              cardHeight={layoutType}
            />
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default ContentBlockBuilder;

const StyledSection = styled.section`
  ${({ theme }) => css`
    .full-width {
      .content-card-wrapper {
        margin-left: 0;
        margin-right: 0;
        row-gap: 0;

        .content-card-item {
          padding-left: 0;
          padding-right: 0;
        }
      }
    }

    .content-card-item {
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
