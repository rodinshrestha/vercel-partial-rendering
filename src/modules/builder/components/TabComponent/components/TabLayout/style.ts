'use client';
import { rem } from 'polished';
import styled, { css } from 'styled-components';

import { breakPoints } from '@/theme/breakPoints';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    .tab-content-image {
      position: relative;
      padding-top: 56.56%;
      min-height: 195px;

      img {
        object-fit: contain;
      }
    }

    &.simple-tab-container {
      .tab-container {
        padding: ${rem(35)} ${rem(15)};
        background-color: ${theme.color.white['900']};
        margin-top: ${rem(50)};
        min-height: 295px;

        @media (max-width: ${breakPoints.tab}) {
          padding: ${rem(25)} ${rem(15)};
        }

        @media (max-width: ${breakPoints.mobile}) {
          padding: ${rem(10)} ${rem(12)};
        }

        .simple-tab-list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: ${rem(50)};

          @media (max-width: 767px) {
            margin-bottom: ${rem(35)};
          }

          .tab-item {
            padding: 0 ${rem(22)};

            @media (max-width: 767px) {
              padding: 0 ${rem(12)};
            }

            .simple-tab {
              cursor: pointer;
              font-family: ${theme.fontFamily.semibold};
              font-size: ${rem(15)};
              line-height: ${rem(22)};
              color: ${theme.Color.black['200']};
              text-transform: uppercase;

              @media (max-width: 991px) {
                font-size: ${rem(12)};
              }

              &.active,
              &:hover {
                text-decoration: underline;
                transition: 0.3s ease all;
              }
            }
          }
        }
      }
    }
  `}
`;
