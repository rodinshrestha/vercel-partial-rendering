'use client';

import React from 'react';

import styled from 'styled-components';
import clsx from 'clsx';
import { rem } from 'polished';
import { css } from 'styled-components';

import { SkinType } from '../Button';

export type VariantType = 'contextual' | 'link' | 'outline';

type Props = {
  variant: VariantType;
  skin?: SkinType;
  children?: React.ReactNode;
  label?: string;
  rounded: boolean;
  className?: string;
};

/**
 *
 */
const Badge = ({
  skin = 'primary',
  variant = 'contextual',
  children,
  className,
  label,
  rounded = false,
  ...props
}: Props) => {
  return (
    <StyledBadge
      $variant={variant}
      $skin={skin}
      $rounded={rounded}
      className={clsx('badge', className, variant, skin)}
      {...props}
    >
      {label || children}
    </StyledBadge>
  );
};

export default Badge;

const StyledBadge = styled.span<{
  $variant: VariantType;
  $skin: SkinType;
  $rounded: boolean;
}>`
  ${({ theme, $skin, $variant, $rounded }) => css`
    font-size: ${rem(12)};
    line-height: 12px;
    letter-spacing: ${rem(1.2)};
    font-weight: bold;
    padding: ${rem(4)} ${rem(9)};
    border-radius: 2px;
    display: inline-block;
    margin-right: ${rem(5)};
    pointer-events: none;

    @media (min-width: calc( ${theme.breakPoints.largeDesktop} + 1px)) {
      padding: ${rem(6)} ${rem(12)};
    }

    @media (max-width: ${theme.breakPoints.tab}) {
      font-size: ${rem(9)};
      letter-spacing: ${rem(0.9)};
      padding: ${rem(4)} ${rem(8)};
      line-height: ${rem(10)};
    }

    &:last-child {
      margin-right: 0;
    }

    ${$variant === 'contextual' &&
    css`
      background-color: ${theme.coreColor[$skin].default.background};
      color: ${theme.coreColor[$skin].default.color};

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: ${theme.coreColor[$skin].hover.background};
          color: ${theme.coreColor[$skin].hover.color};
        }
      }
    `}

    ${$variant === 'outline' &&
    css`
      border-width: 1px;
      border-style: solid;
      border-color: ${theme.coreColor[$skin].default.background};
      color: ${theme.coreColor[$skin].default.background};

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          border-color: ${theme.coreColor[$skin].hover.background};
          color: ${theme.coreColor[$skin].hover.background};
        }
      }
    `}

    ${$variant === 'link' &&
    css`
      background-color: transparent;
      color: ${theme.coreColor[$skin].default.background};
      padding: 0;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: ${theme.coreColor[$skin].hover.color};
          opacity: 0.6;
        }
      }
    `}

    ${$rounded &&
    css`
      border-radius: ${rem(30)};
    `}
  `}
`;
