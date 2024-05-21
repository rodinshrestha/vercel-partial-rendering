import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const StyledSection = styled.section`
  ${({ theme }) => css`
    display: flex;
    position: relative;
    flex-direction: column;
    gap: ${rem(10)};

    .sucess-header {
      text-align: center;

      .title-block {
        margin-bottom: ${rem(50)};

        @media (max-width: ${theme.breakPoints.tablet}) {
          margin-bottom: ${rem(35)};
        }

        h1 {
          & + p {
            margin-top: ${rem(15)};
          }
        }
      }

      .detail-content {
        padding: 0 ${rem(15)};
        text-align: center;

        @media (max-width: ${theme.breakPoints.tablet}) {
          margin-bottom: ${rem(35)};
        }

        h1,
        h2,
        h3 {
          margin-bottom: 0;

          & + P {
            margin-top: ${rem(25)};
          }
        }

        p {
          margin-bottom: 0;

          & + P {
            margin-top: ${rem(20)};
          }
        }
      }
    }
  `}
`;

export const StyleOrderItem = styled.div`
  ${({ theme }) => css`
    table {
      width: 100%;
    }

    .order-summary-block {
      padding: ${rem(10)} 0;

      .order-wrap {
        .item-list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-between;

          p {
            text-transform: capitalize;
            margin-bottom: 0;

            @media (max-width: ${theme.breakPoints.tablet}) {
              font-size: ${rem(12)};
              line-height: ${rem(14)};
            }
          }

          .item-price {
            ${theme.fontFamily.semibold}
          }
        }

        &.total-order {
          border-color: ${theme.coreColor.body.default.color};
          margin-top: ${rem(10)};
        }
      }
    }
  `}
`;

export const OrderDetailsButton = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(10)};
  justify-content: center;
  margin-top: ${rem(35)};
`;

export const SucessAccordionWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    overflow: hidden;
    z-index: 1;

    .order-accordion {
      background-color: ${theme.coreColor.primary.default.background};
      padding: ${rem(20)};
      border-radius: 20px;
      box-shadow: 0 1px 3px
        ${transparentize(0.84, theme.coreColor.body.default.color)};

      @media (max-width: ${theme.breakPoints.mobile}) {
        padding: ${rem(20)};
      }

      .accordion-header {
        flex-grow: 1;

        h5 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-grow: 1;
        }
      }

      .accordion-content {
        .accordion-contain-wrap {
          span {
            display: block;

            &.date {
              color: ${transparentize(0.3, theme.coreColor.body.default.color)};
              margin-bottom: ${rem(10)};
            }
          }

          strong {
            margin-right: ${rem(5)};
          }

          p {
            @media (max-width: ${theme.breakPoints.mobile}) {
              font-size: ${rem(12)};
              line-height: ${rem(14)};
            }
          }

          .status-wrap {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: ${rem(5)};
            text-transform: capitalize;

            .link-btn {
              text-decoration: underline;
            }
          }

          .item-table {
            margin-top: ${rem(35)};

            .table-wrapper {
              margin: 0 -10px;

              table {
                padding-bottom: ${rem(8)};
                width: 100%;
                border-bottom: 1px solid ${theme.coreColor.body.default.color};

                @media (max-width: ${theme.breakPoints.mobile}) {
                  font-size: ${rem(12)};
                  line-height: ${rem(14)};
                }

                tr {
                  th {
                    padding: ${rem(5)} ${rem(10)};
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
    }
  `}
`;
