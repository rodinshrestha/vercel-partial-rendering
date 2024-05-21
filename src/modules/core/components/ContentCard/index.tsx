import React from 'react';

import styled, { css } from 'styled-components';
import { rem } from 'polished';
import clsx from 'clsx';

import type { ICard } from '@/builder/components/ContentBlockBuilder/card-section-type';
import { contentHelper } from '@/builder/components/ContentBlockBuilder/card-section-helper';

import ContentCardItem from './ContentCardItem';

export type CardHeightTypes = 'large' | 'medium' | 'small';

export type CardLayoutType = {
  data: Array<ICard>;
  rounded?: string;
  cardHeight?: CardHeightTypes;
  className?: string;
};

const ContentCard = ({
  data,
  rounded,
  cardHeight = 'small',
  className,
}: CardLayoutType) => {
  if (!data) return;
  return (
    <StyleLayout className={clsx(className)}>
      <StyledLayoutWrapper className="content-card-wrapper">
        {data.map((el, index) => {
          return (
            <ContentCardItem
              key={index}
              data={contentHelper(el)}
              rounded={rounded}
              cardHeight={cardHeight}
            />
          );
        })}
      </StyledLayoutWrapper>
    </StyleLayout>
  );
};

export default ContentCard;

const StyleLayout = styled.div`
  ${() => css``}
`;

const StyledLayoutWrapper = styled.div`
  ${() => css`
    display: flex;
    margin: 0 -5px;
    flex-wrap: wrap;
    row-gap: ${rem(15)};
    height: 100%;
  `}
`;
