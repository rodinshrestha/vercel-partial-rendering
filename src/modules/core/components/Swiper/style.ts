'use client';

import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledSwiper = styled.div`
  ${({ theme }) => css`
    .swiper {
      @media (max-width: ${theme.breakPoints.tablet}) {
        overflow: visible;
      }

      .swiper-wrapper {
        .swiper-slide {
          height: auto;

          @media (max-width: ${theme.breakPoints.tablet}) {
            overflow: visible;
            opacity: 1;
          }

          &.swiper-slide-prev {
            @media (max-width: ${theme.breakPoints.tablet}) {
              overflow: hidden;
              opacity: 0;
            }
          }
        }
      }

      .swiper-button-prev,
      .swiper-button-next {
        z-index: 10;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;

        &::after {
          font-size: 24px;
          font-family: 'dogman' !important;
        }
      }

      .swiper-button-prev {
        left: 15px;

        &::after {
          content: '\e905';
        }
      }

      .swiper-button-next {
        right: 15px;

        &::after {
          content: '\e906';
        }
      }

      .swiper-pagination {
        text-align: center;
        margin-top: ${rem(10)};
      }
    }
  `}
`;
