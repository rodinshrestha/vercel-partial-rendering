'use client';
import React from 'react';

import styled, { css } from 'styled-components';
import clsx from 'clsx';
import { rem } from 'polished';

import { SectionAttribute } from '@/builder/types/section.types';
import { RowAttributes } from '@/builder/types/row.types';
import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
import { removeNullFromObject } from '@/builder/utils/remove-null-from-object';
import Button from '@/core/components/Button';
import { IconArrowRight } from '@/core/components/Icons';

import {
  CategoryImageBlockType,
  CategoryImageType,
} from './category-image-block.type';
import CategoryImage from './CategoryImage';
import { categoryImageRepeaterHelper } from './category-image-block-helpers';

export type ContentBlockProps = {
  data: CategoryImageBlockType;
  sectionAttributes: SectionAttribute;
  rowAttributes: RowAttributes;
  backgroundContent: JSX.Element;
};
const CategoryImageBlock = ({
  data,
  sectionAttributes,
  rowAttributes,
  backgroundContent,
}: ContentBlockProps) => {
  const { button_title, button_link } = data;

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
      className={clsx(className)}
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
          <Col lg={12}>
            <div className="category-img-wrap">
              {data?.category_image_repeater?.map((item, index) => (
                <CategoryImage
                  item={categoryImageRepeaterHelper(item) as CategoryImageType}
                  key={index}
                />
              ))}
              <div className="btn-wrap">
                <Button
                  className="see-more"
                  skin="body"
                  variant="transparent"
                  href={button_link}
                  asSelfLink={button_link.startsWith('http')}
                  newTab={button_link.startsWith('http')}
                >
                  {button_title}
                  <IconArrowRight size={26} />
                </Button>
              </div>
            </div>
          </Col>
          <Col />
        </Row>
      </Container>
    </StyledSection>
  );
};

export default CategoryImageBlock;

const StyledSection = styled.section`
  ${({ theme }) => css`
    .category-img-wrap {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      max-width: 100%;

      .image-item {
        flex: 0 0 16.6666666667%;

        @media (max-width: ${theme.breakPoints.tab}) {
          flex: 0 0 25%;
        }

        @media (max-width: ${theme.breakPoints.mobile}) {
          flex: 0 0 50%;
        }
      }

      .btn-wrap {
        padding: ${rem(50)};
        display: inline-block;
        max-width: 50%;
        padding-right: 0;

        @media (max-width: ${theme.breakPoints.tablet}) {
          padding: ${rem(30)};
        }

        @media (max-width: ${theme.breakPoints.tab}) {
          max-width: 100%;
          margin: 0 auto;
        }

        a {
          ${theme.fontFamily.semiBold}
          font-size: ${rem(35)};
          line-height: ${rem(42)};
          letter-spacing: ${rem(3.5)};
          text-align: left;
          display: inline-block;

          @media (max-width: ${theme.breakPoints.tablet}) {
            font-size: ${rem(28)};
            line-height: ${rem(34)};
            letter-spacing: ${rem(2.8)};
          }

          @media (max-width: ${theme.breakPoints.tab}) {
            font-size: ${rem(22)};
            line-height: ${rem(30)};
            letter-spacing: ${rem(2.2)};
          }

          @media (max-width: ${theme.breakPoints.mobile}) {
            font-size: ${rem(20)};
            line-height: ${rem(26)};
            letter-spacing: ${rem(2)};
          }

          svg {
            width: 40px;
            position: relative;
            top: 4px;
          }
        }
      }
    }
  `}
`;
