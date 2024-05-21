'use client';

import React from 'react';

import clsx from 'clsx';

import { SectionAttribute } from '@/builder/types/section.types';
import { RowAttributes } from '@/builder/types/row.types';
import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
import ReactHtmlParser from '@/core/components/ReactHtmlParser';
import { removeNullFromObject } from '@/builder/utils/remove-null-from-object';
import Accordion from '@/core/components/Accordion';
import ImageWithFallback from '@/core/components/ImageWithFallback';

import { AccordionContentTypes } from './accordion.types';
import { StyledDiv } from './style';

type AccordionTypes = {
  title: string;
  content: string;
  accordionRepeater: Array<AccordionContentTypes>;

  sectionAttributes: SectionAttribute;
  rowAttributes: RowAttributes;
  backgroundContent?: JSX.Element;
};

const StyledAccordion = ({
  title,
  content,
  accordionRepeater,
  sectionAttributes,
  rowAttributes,
  backgroundContent,
}: AccordionTypes) => {
  const { className, ...restSectionAttribute } = sectionAttributes;

  const [selectedAccordion, setSelectedAccordion] = React.useState('');

  return (
    <StyledDiv
      className={clsx(className)}
      style={{ ...removeNullFromObject(restSectionAttribute) }}
    >
      {backgroundContent}
      <Container fluid className="p-0">
        <Row style={{ ...removeNullFromObject(rowAttributes) }}>
          <Col>
            <div className="guideAccordion-wrap">
              <div className="content-wrap">
                <h3>
                  <strong>{title}</strong>
                </h3>

                <div className="description">{ReactHtmlParser(content)}</div>
              </div>

              <div className="accordion-container">
                {accordionRepeater.map((item, i) => {
                  if (!item.title) return null;
                  return (
                    <Accordion
                      className="accordion-item"
                      title={item.title}
                      key={i}
                      expanded={item.title === selectedAccordion}
                      onChange={(e) => {
                        setSelectedAccordion((prev) => (prev === e ? '' : e));
                      }}
                    >
                      {item.content_type === 'image' ? (
                        <div className="accordion-image">
                          <ImageWithFallback
                            src=""
                            alt="size chart image"
                            priority
                          />
                        </div>
                      ) : (
                        <div className="accordion-content">
                          {ReactHtmlParser(item.texteditor)}
                        </div>
                      )}
                    </Accordion>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </StyledDiv>
  );
};

export default StyledAccordion;
