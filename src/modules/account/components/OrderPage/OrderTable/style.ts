import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const OrderTableWrap = styled.div`
  ${({ theme }) => css`
    border-bottom: 1px solid ${transparentize(0.3, theme.color.grey[900])};
    padding-bottom: ${rem(15)};
    margin-bottom: ${rem(15)};

    .order-table-wrapper {
      display: flex;
      flex-wrap: wrap;

      .order-img {
        img {
          min-width: 80px;
          height: auto;

          @media (max-width: ${theme.breakPoints.mobile}) {
            min-width: 65px;
            height: auto;
          }
        }
      }

      .order-content {
        display: flex;
        flex-wrap: wrap;
        flex-grow: 1;

        @media (max-width: ${theme.breakPoints.mobile}) {
          min-width: 80px;
        }

        .order-col {
          padding: 0 ${rem(15)};
          min-width: 250px;

          @media (max-width: ${theme.breakPoints.mobile}) {
            min-width: 80px;
            padding: 0 ${rem(12)};
          }

          span {
            display: inline-block;
            ${theme.fontFamily.light}
            font-size: ${rem(12)};
            line-height: ${rem(16)};
            letter-spacing: ${rem(1.2)};

            &.date {
              ${theme.fontFamily.regular}
            }

            a {
              text-decoration: underline;
              text-transform: capitalize;
            }
          }

          .order-id {
            text-transform: uppercase;
            margin-bottom: ${rem(12)};

            h6 {
              font-size: ${rem(14)};
              line-height: ${rem(18)};
              letter-spacing: ${rem(1.4)};

              @media (max-width: ${theme.breakPoints.mobile}) {
                font-size: ${rem(12)};
                line-height: ${rem(18)};
                letter-spacing: ${rem(1.2)};
              }
            }
          }

          .status-wrap {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: ${rem(10)};
            margin-bottom: ${rem(15)};
            text-transform: capitalize;

            .track {
              @media print {
                display: none;
              }
            }
          }

          .order-date {
            margin-bottom: ${rem(15)};
          }

          &.action-btn {
            margin-left: auto;
            min-width: 50px;
          }
        }
      }
    }
  `}
`;
