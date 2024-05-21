import React from 'react';

import clsx from 'clsx';

import { SectionAttribute } from '@/builder/types/section.types';
import { RowAttributes } from '@/builder/types/row.types';
import { removeNullFromObject } from '@/builder/utils/remove-null-from-object';
import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
import ReactHtmlParser from '@/core/components/ReactHtmlParser';

import {
  ButtonLayoutData,
  TabLayoutData,
  TabLayoutType,
} from './tab-component.modules.types';
import { StyledDiv } from './style';
import TabController from './components/TabController';

type Props = {
  title: string;
  content: string;
  layoutType: TabLayoutType;
  tabLayoutList: Array<TabLayoutData>;
  button_layout: Array<ButtonLayoutData>;
  sectionAttributes: SectionAttribute;
  rowAttributes: RowAttributes;
  backgroundContent?: JSX.Element;
};

const TabComponent = ({
  title,
  content,
  tabLayoutList,
  button_layout,
  layoutType,
  sectionAttributes,
  rowAttributes,
  backgroundContent,
}: Props) => {
  const { className, containerType, ...restSectionAttribute } =
    sectionAttributes;
  const normal = containerType === 'normal';

  return (
    <StyledDiv
      className={clsx(className)}
      style={{ ...removeNullFromObject(restSectionAttribute) }}
    >
      {backgroundContent}
      <Container fluid={!normal} className="p-0">
        <Row style={{ ...removeNullFromObject(rowAttributes) }}>
          <Col>
            <div className="content-wrap">
              {title && (
                <h2>
                  <strong>{title}</strong>
                </h2>
              )}
              {content && (
                <div className="description">{ReactHtmlParser(content)}</div>
              )}
            </div>

            <TabController
              tabLayoutList={tabLayoutList}
              button_layout={button_layout}
              layoutType={layoutType}
            />
          </Col>
        </Row>
      </Container>
    </StyledDiv>
  );
};

export default TabComponent;
