'use client';
import React from 'react';

import { rem } from 'polished';
import styled, { css } from 'styled-components';

import useTranslations from '@/core/hooks/useTranslations';

import { BreadCrumbItem } from './BreadCrumbItem';

type Crumbs = {
  title: string;
  link?: string;
};

type Props = {
  crumbs?: Array<Crumbs>;
};

export const BreadCrumb = ({ crumbs }: Props) => {
  const { _t } = useTranslations();
  return (
    <BreadCrumbLayout className="breadcrumb-wrap">
      {crumbs &&
        crumbs.map((crumb, i: number) => (
          <BreadCrumbItem
            key={i}
            href={crumb?.link || '#'}
            isCurrent={i === crumbs.length - 1}
          >
            {crumb.title === 'Home' || crumb.title === 'home'
              ? _t('home', 'Home')
              : crumb.title}
          </BreadCrumbItem>
        ))}
    </BreadCrumbLayout>
  );
};

const BreadCrumbLayout = styled.ul`
  ${({ theme }) => css`
    ${theme.fontFamily.light}
    padding: ${rem(15)} 0;
    list-style: none;
    font-size: ${rem(10)};
    line-height: ${rem(18)};
    position: relative;
    z-index: 1;

    @media (min-width: calc(${theme.breakPoints.largeDesktop} + 1px)) {
      font-size: ${rem(12)};
      line-height: ${rem(20)};
    }
  `}
`;
