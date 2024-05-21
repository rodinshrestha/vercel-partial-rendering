import React from 'react';

import { rem } from 'polished';
import styled from 'styled-components';
import { css } from 'styled-components';

import Link from '@/core/components/Link';

export type BreadcrumbType = {
  isCurrent: boolean;
  children: React.ReactNode;
  href: string;
};
export const BreadCrumbItem = ({
  children,
  href,
  isCurrent,
}: BreadcrumbType) => {
  return (
    <BreadCrumbItemLayout className="breadcrumb">
      <Link
        href={href}
        className={isCurrent ? 'active' : ''}
        aria-current={isCurrent ? 'page' : 'false'}
      >
        {children}
      </Link>
    </BreadCrumbItemLayout>
  );
};

const BreadCrumbItemLayout = styled.li`
  ${({ theme }) => css`
    display: inline-block;

    a {
      color: ${theme.color.grey['900']};
      transition: 0.3s ease all;
      text-transform: capitalize;

      &:hover,
      &.active {
        color: ${theme.color.black[1000]};
      }
    }

    &:last-child {
      pointer-events: none;
    }

    & + li {
      position: relative;
      margin-left: ${rem(8)};
      padding-left: ${rem(10)};

      &::before {
        content: '/';
        display: inline-block;
        position: absolute;
        color: ${theme.color.black['900']};
        top: 0;
        left: 0;
        width: 1px;
        height: 100%;
      }
    }
  `}
`;
