'use client';
import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    &.button-tab-container {
      .btn-repeater-container {
        margin-bottom: ${rem(50)};

        .btn-repeater-list {
          display: flex;
          flex-wrap: wrap;
          gap: ${rem(20)};
          justify-content: center;

          .btn-container {
            &.active {
              cursor: not-allowed;

              button {
                pointer-events: none;
                border: 1px solid transparent;
              }
            }

            & + .btn-container {
              @media (max-width: ${theme.breakPoints.mobile}) {
                margin-top: ${rem(5)};
              }
            }
          }

          & + .btn-repeater-list {
            margin-top: ${rem(15)};

            @media (max-width: ${theme.breakPoints.tablet}) {
              margin-top: ${rem(10)};
            }
          }
        }
      }

      .btn-render-content {
        overflow: auto hidden;
        scroll-behavior: smooth;

        h2,
        h3,
        h4 {
          margin-bottom: ${rem(20)};
        }

        p {
          margin-bottom: 0;
          font-size: ${rem(12)};
          line-height: ${rem(18)};

          & + P,
          & + a {
            margin-top: ${rem(20)};
          }
        }

        table {
          border: none;
          width: 100% !important;
          height: 100% !important;
          border: 1px solid ${theme.color.grey[300]} !important;

          tbody {
            tr {
              height: 100% !important;

              td {
                border: none;
                padding: ${rem(10)};
                text-transform: uppercase;
                margin-bottom: 0;
                width: auto !important;
                font-size: ${rem(12)};
                line-height: ${rem(18)};
                height: 100% !important;
                border-bottom: 1px solid ${theme.color.grey[300]} !important;

                &:first-child {
                  ${theme.fontFamily.semibold};
                  min-width: 150px;
                  font-size: ${rem(10)};
                  border-top: 1px solid ${theme.color.grey[300]} !important;

                  p {
                    font-size: ${rem(10)};
                  }
                }
              }
            }
          }
        }

        .btn-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          padding-top: 33.33%;
          display: flex;
          margin: 0 auto;

          img {
            object-fit: contain;
          }
        }
      }
    }
  `}
`;
