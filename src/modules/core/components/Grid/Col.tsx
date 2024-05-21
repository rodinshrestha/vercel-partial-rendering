'use client';
import React from 'react';

import clsx from 'clsx';
import styled, { css } from 'styled-components';

export const getWidthString = (span: number) => {
  // if (span)
  const width = (span / 12) * 100;
  return `flex: 0 0 ${width}%; max-width: ${width}%`;
};

export type ColumnType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

type ColProps = {
  children?: React.ReactNode;
  className?: string;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  xxxl?: number;
};

export const Col = ({
  children,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  xxxl,
  className,
}: ColProps) => {
  return (
    <ColWrapper
      $xs={xs}
      $sm={sm}
      $md={md}
      $lg={lg}
      $xl={xl}
      $xxl={xxl}
      $xxxl={xxxl}
      className={clsx('col', className)}
    >
      {children}
    </ColWrapper>
  );
};

type StyledProps = {
  $xs?: number;
  $sm?: number;
  $md?: number;
  $lg?: number;
  $xl?: number;
  $xxl?: number;
  $xxxl?: number;
};

const ColWrapper = styled.div<ColProps & StyledProps>`
  ${({ $xs, $sm, $md, $lg, $xl, $xxl, $xxxl }) => css`
    flex-basis: 1;
    flex-grow: 1;
    position: relative;
    width: 100%;
    max-width: 100%;
    padding-right: 5px;
    padding-left: 5px;

    ${$xs &&
    `@media only screen and (min-width: 361px) {
        ${getWidthString($xs)}
      }
    `}

    ${$sm &&
    `@media only screen and (min-width: 576px) {
        ${getWidthString($sm)}
      }
    `}

    ${$md &&
    `@media only screen and (min-width: 768px) {
        ${getWidthString($md)}
      }
    `}

    ${$lg &&
    `@media only screen and (min-width: 992px) {
        ${getWidthString($lg)}
      }
    `}

    ${$xl &&
    `@media only screen and (min-width: 1200px) {
        ${getWidthString($xl)}
      }
    `}

    ${$xxl &&
    `@media only screen and (min-width: 1441px) {
        ${getWidthString($xxl)}
      }
    `}

    ${$xxxl &&
    `@media only screen and (min-width: 1681px) {
        ${getWidthString($xxxl)}
      }
    `}
  `}
`;
