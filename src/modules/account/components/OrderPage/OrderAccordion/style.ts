'use client';

import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyleOrder = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.color.white[1000]};
    padding: ${rem(15)};
    border-radius: 20px;
    margin-bottom: ${rem(15)};
    position: relative;

    @media (max-width: ${theme.breakPoints.mobile}) {
      padding: ${rem(15)} ${rem(10)};
    }

    .acc-btn {
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
    }

    &.active {
      .acc-btn {
        top: 20px;
        transform: none;
      }
    }

    .heading,
    .icon,
    .re-order {
      cursor: pointer;
    }

    .heading {
      .title,
      .sub-title {
        display: flex;
        align-items: center;

        span {
          font-size: ${rem(12)};
          line-height: ${rem(20)};
          color: ${theme.color.grey[900]};
          flex: 0 0 50%;
        }
      }

      .title {
        h4,
        h6 {
          flex: 0 0 50%;
        }

        .reprint {
          cursor: pointer;
          display: inline-block;
          flex: 0;
        }
      }
    }

    .accordion-content {
      .accordion-contain-wrap {
        .re-order {
          text-decoration: underline;
          font-family: ${theme.fontFamily.semibold};

          @media (hover: hover) and (pointer: fine) {
            &:hover {
              color: ${theme.color.grey[900]};
            }
          }
        }

        span {
          display: block;

          &.date {
            color: ${theme.color.grey[900]};
            margin-bottom: ${rem(10)};
          }
        }

        strong {
          margin-right: ${rem(5)};
        }

        .status-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: ${rem(5)};

          p {
            @media (max-width: ${theme.breakPoints.mobile}) {
              font-size: ${rem(12)};
              line-height: ${rem(14)};
            }
          }

          .link-btn {
            text-decoration: underline;
          }
        }

        .item-table {
          margin-top: ${rem(25)};

          .table-wrapper {
            margin: 0 -10px;

            table {
              padding-bottom: ${rem(8)};
              width: 100%;
              border-bottom: 1px solid ${theme.coreColor.body.default.color};

              tr {
                th {
                  padding: ${rem(5)} ${rem(5)};
                }

                th,
                td {
                  text-align: left;
                  padding: ${rem(3)} ${rem(10)};

                  &:first-child {
                    width: 50%;
                  }

                  &:last-child {
                    text-align: right;
                  }

                  &.sub-total-item {
                    ${theme.fontFamily.semibold}
                  }
                }
              }
            }
          }

          .total-order-wrapper {
            max-width: 49%;
            margin-left: auto;

            @media (max-width: ${theme.breakPoints.mobile}) {
              max-width: 100%;
            }

            .total-order {
              .item-list {
                .item-title {
                  ${theme.fontFamily.semibold}
                }
              }
            }
          }
        }
      }
    }
  `}
`;

export const StyleDiv = styled.div`
  padding: 0;
  opacity: 0.2;
`;
