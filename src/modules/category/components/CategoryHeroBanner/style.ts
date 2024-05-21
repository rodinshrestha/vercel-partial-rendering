'use client';
import styled, { css } from 'styled-components';
import { rem } from 'polished';

import { breakPoints } from '@/theme/breakPoints';

export const StyledSection = styled.section`
  ${({ theme }) => css`
    padding: ${rem(10)} 0;
    position: relative;
    background-color: ${theme.coreColor.light.default.background};

    .banner-wrapper {
      position: relative;
      width: 100%;
      max-width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      .banner-content {
        position: relative;
        height: 100%;
        z-index: 1;
        display: flex;
        text-align: center;
        max-width: 80%;
        padding: 30px;

        @media (max-width: ${breakPoints.tablet}) {
          max-width: 100%;
        }

        p {
          max-width: 720px;

          @media (max-width: ${breakPoints.tablet}) {
            max-width: 100%;
          }
        }
      }
    }

    &.small {
      .banner-wrapper {
        min-height: 50vh;

        @media (max-width: ${breakPoints.tablet}) {
          min-height: 400px;
        }
      }
    }
  `}
`;
