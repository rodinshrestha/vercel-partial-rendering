'use client';

import React from 'react';

import clsx from 'clsx';
import styled, { css } from 'styled-components';

export type RowType = 'row' | 'noGutter';

type RowProps = {
  children?: React.ReactNode;
  noGutter?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
};

export const Row = ({
  noGutter = false,
  children,
  className,
  id,
  style,
}: RowProps) => {
  return (
    <RowWrapper
      $noGutter={noGutter}
      className={clsx('row', className, { noGutter: 'no-gutters' })}
      style={style}
      id={id}
    >
      {children}
    </RowWrapper>
  );
};

const RowWrapper = styled.div<RowProps & { $noGutter: boolean }>`
  ${({ $noGutter }) => css`
    display: flex;
    flex-wrap: wrap;

    ${$noGutter
      ? css`
          margin-right: 0;
          margin-left: 0;

          > .col {
            padding-right: 0;
            padding-left: 0;
          }
        `
      : css`
          margin-right: -5px;
          margin-left: -5px;
        `}
  `}
`;
