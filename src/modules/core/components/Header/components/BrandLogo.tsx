'use client';
import React from 'react';

import styled, { css } from 'styled-components';
import clsx from 'clsx';

import Link from '@/core/components/Link';
import ImageWithFallback from '@/core/components/ImageWithFallback';
import useResolver from '@/core/hooks/useResolver';

interface LogoProps {
  className?: string;
}

const BrandLogo = ({ className }: LogoProps) => {
  const { site_meta } = useResolver();
  const { primary } = site_meta.logo;

  return (
    <StyledDiv className={clsx(className)}>
      <Link href="/">
        <ImageWithFallback
          src={primary || '/images/jacson.svg'}
          alt="logo"
          width={120}
          height={18}
          quality={100}
          priority
        />
      </Link>
    </StyledDiv>
  );
};

export default BrandLogo;

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    line-height: 0;
    z-index: 2;

    a {
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          opacity: 1;
        }
      }
    }

    img {
      width: 120px;
      height: 18px;

      @media (max-width: ${theme.breakPoints.mobile}) {
        width: 95px;
        height: 14.63px;
      }
    }
  `}
`;
