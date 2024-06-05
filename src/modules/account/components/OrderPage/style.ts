'use client';
import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const OrderSection = styled.div`
  ${({ theme }) => css`
    position: relative;
    overflow: hidden;
    z-index: 1;
    /* min-height: calc(100vh - 60px); */
    max-width: 650px;

    @media (max-width: ${theme.breakPoints.tab}) {
      max-width: 100%;
    }

    @media (max-width: ${theme.breakPoints.tab}) {
      max-width: 100%;
    }

    .title-head {
      margin-bottom: ${rem(15)};
      text-transform: capitalize;
    }

    .order-wrapper {
      max-width: 86%;
    }
  `}
`;
