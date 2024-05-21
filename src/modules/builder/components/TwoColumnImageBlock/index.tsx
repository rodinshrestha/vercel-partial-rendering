'use client';
import React from 'react';

import styled, { css } from 'styled-components';
import clsx from 'clsx';
import { rem } from 'polished';

import { removeNullFromObject } from '@/builder/utils/remove-null-from-object';
import { SectionAttribute } from '@/builder/types/section.types';
import { RowAttributes } from '@/builder/types/row.types';
import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';

import { ImageBlockTypes } from '../BannerBuilder/banner-type';

import { RepeaterHelper } from './two-column-helpers';
import TwoColumnContent from './components/TwoColumnContent';

export type ContentBlockProps = {
  data: ImageBlockTypes;
  repeaterContent: Array<ImageBlockTypes>;
  sectionAttributes: SectionAttribute;
  rowAttributes: RowAttributes;
  backgroundContent: JSX.Element;
  hasWave?: boolean;
};
const TwoColumImage = ({
  data,
  repeaterContent,
  sectionAttributes,
  rowAttributes,
  backgroundContent,
  hasWave = false,
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

  return (
    <StyledSection
      className={clsx(className, 'pt-75', 'pb-75')}
      style={{
        ...removeNullFromObject(restSectionAttribute),
      }}
      id={id}
      $hasWave={hasWave}
    >
      {backgroundContent}
      <Container
        fluid={!normal}
        className={clsx(gutterSpace && 'p-0', 'custom-container')}
      >
        <Row
          noGutter={gutterSpace}
          className={rowClassName || ''}
          id={rowId || ''}
          style={{ rowGap: '20px', ...removeNullFromObject(restRowAttribute) }}
        >
          <Col lg={7} className="content">
            <TwoColumnContent data={data} />
          </Col>
          <Col lg={5}>
            <div className="col-repeater-wrap">
              {repeaterContent.map((el: any, index) => {
                return (
                  <TwoColumnContent
                    className="repater-item"
                    colHeight="small"
                    data={RepeaterHelper(el)}
                    key={index}
                  />
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default TwoColumImage;

const StyledSection = styled.section<{ $hasWave: boolean }>`
  ${({ theme, $hasWave }) => css`
    padding-top: ${rem(15)};

    .col-repeater-wrap {
      display: flex;
      flex-direction: column;
      row-gap: ${rem(15)};
      height: 100%;

      @media (max-width: ${theme.breakPoints.tab}) {
        flex-direction: row;
        flex-wrap: wrap;
      }

      p {
        font-size: ${rem(14)};
        line-height: ${rem(18)};
      }

      .repater-item {
        min-height: 180px;
        height: auto;

        @media (max-width: ${theme.breakPoints.tablet}) {
          min-height: 130px;
        }

        @media (max-width: ${theme.breakPoints.tab}) {
          flex: 0 0 calc(50% - 10px);
          margin: 0 5px;
        }

        @media (max-width: ${theme.breakPoints.mobile}) {
          flex: 0 0 100%;
          margin: 0;
        }

        &:last-child {
          min-height: 90px;
        }
      }
    }

    ${$hasWave &&
    css`
      padding-bottom: 120px !important;
      background-color: ${theme.coreColor.light.default.background};
      z-index: 1;
      --mask: radial-gradient(
            100.62px at 50% calc(100% - 135px),
            #000 99%,
            #0000 101%
          )
          calc(50% - 90px) 0/180px 100%,
        radial-gradient(100.62px at 50% calc(100% + 90px), #0000 99%, #000 101%)
          50% calc(100% - 45px) / 180px 100% repeat-x;
      -webkit-mask: var(--mask);
      mask: var(--mask);
    `}

    & + .category-wrapper {
      background-color: transparent;
      padding: 35px 0;
      mask: none;
    }

    .custom-container {
      padding: 0 ${rem(20)};

      @media (max-width: ${theme.breakPoints.mobile}) {
        padding: 0 ${rem(15)};
      }
    }
  `}
`;
