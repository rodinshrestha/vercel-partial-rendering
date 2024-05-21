'use client';
import React from 'react';

import clsx from 'clsx';
import styled, { css } from 'styled-components';

import { breakPoints } from '@/theme/breakPoints';

export type ContainerType = 'normal' | 'fluid';

type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
  fluid?: boolean;
};

export const Container = ({
  className,
  children,
  fluid = false,
}: ContainerProps) => {
  return (
    <ContainerWrapper
      className={clsx(className, {
        'container-fluid': fluid,
        container: !fluid,
      })}
      $container={fluid ? 'fluid' : 'normal'}
    >
      {children}
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled.div<ContainerProps & { $container: string }>`
  ${({ $container }) => css`
    width: 100%;
    padding-right: 10px;
    padding-left: 10px;
    margin-right: auto;
    margin-left: auto;

    @media (max-width: ${breakPoints.tab}) {
      padding-right: 10px;
      padding-left: 10px;
    }

    @media (max-width: ${breakPoints.mobile}) {
      padding-right: 10px;
      padding-left: 10px;
    }

    ${$container === 'normal' &&
    css`
      @media (min-width: 576px) {
        max-width: 540px;
      }
      @media (min-width: 768px) {
        max-width: 720px;
      }
      @media (min-width: 992px) {
        max-width: 960px;
      }
      @media (min-width: 1200px) {
        max-width: 1088px;
      }
      @media (min-width: 1367px) {
        max-width: 1200px;
      }
      @media (min-width: 1537px) {
        max-width: 1440px;
      }
      @media (min-width: 1681px) {
        max-width: 1610px;
      }
    `}

    &.p-0 {
      padding: 0;
    }
  `}
`;
