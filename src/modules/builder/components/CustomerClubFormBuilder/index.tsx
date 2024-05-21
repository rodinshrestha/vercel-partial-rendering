'use client';
import styled, { css } from 'styled-components';
import clsx from 'clsx';
import { rem } from 'polished';

import { SectionAttribute } from '@/builder/types/section.types';
import { RowAttributes } from '@/builder/types/row.types';
import { removeNullFromObject } from '@/builder/utils/remove-null-from-object';
import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
import ImageWithFallback from '@/core/components/ImageWithFallback';

import ContentBlockContactForm from './ContactForm';
import { ClubFormBlockTypes } from './club-form-type';
import ContactFormContentBlock from './ContactFormContentBlock';

export type ContentBlockProps = {
  data: ClubFormBlockTypes;
  sectionAttributes: SectionAttribute;
  rowAttributes: RowAttributes;
  backgroundContent: JSX.Element;
};
const CustomerClubForm = ({
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

  const { src, position, contentType, showContactForm, title } = data;

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
          className={clsx(rowClassName, {
            ['flex-row-reverse']: position === 'left',
          })}
          id={rowId || ''}
          style={{ ...removeNullFromObject(restRowAttribute) }}
        >
          <Col lg={6}>
            {contentType === 'image' && src ? (
              <div className="col-image">
                <ImageWithFallback
                  src={src}
                  alt="text-image"
                  className="object-cover"
                  fill
                />
              </div>
            ) : contentType === 'editor' ? (
              <div className="col-text">
                <ContactFormContentBlock data={data} />
              </div>
            ) : null}
          </Col>
          <Col lg={6}>
            {showContactForm && (
              <ContentBlockContactForm title={title || null} />
            )}
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default CustomerClubForm;

const StyledSection = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.coreColor.body.default.background};
    color: inherit;

    .col-image {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding-top: 67%;
      min-height: 615px;

      img {
        object-position: center center;
      }
    }

    .col-text {
      padding: ${rem(45)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        padding: ${rem(30)};
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        padding: ${rem(30)} ${rem(20)};
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
  `}
`;
