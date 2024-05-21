import React from 'react';

import clsx from 'clsx';

import { HeadingType } from '@/core/components/SectionTitle/section-title.types';
import { SectionAttribute } from '@/builder/types/section.types';
import { RowAttributes } from '@/builder/types/row.types';
import { removeNullFromObject } from '@/builder/utils/remove-null-from-object';
import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
import ReactHtmlParser from '@/core/components/ReactHtmlParser';

import { TextBlock } from './style';

type Props = {
  title: string;
  content: string;
  tag?: HeadingType;
  sectionAttributes: SectionAttribute;
  rowAttributes: RowAttributes;
  backgroundContent?: JSX.Element;
};

const SimpleContent = ({
  title,
  content,
  sectionAttributes,
  rowAttributes,
  backgroundContent,
}: Props) => {
  const { className, containerType, ...restSectionAttribute } =
    sectionAttributes;
  const normal = containerType === 'normal';
  return (
    <div
      className={clsx(className, 'text-content')}
      style={{ ...removeNullFromObject(restSectionAttribute) }}
    >
      {backgroundContent}
      <Container fluid={!normal} className="p-0">
        <Row style={{ ...removeNullFromObject(rowAttributes) }}>
          <Col>
            <TextBlock className={clsx('text-block')}>
              {title && (
                <h3>
                  <strong>{title}</strong>
                </h3>
              )}

              {content && ReactHtmlParser(content)}
            </TextBlock>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SimpleContent;
