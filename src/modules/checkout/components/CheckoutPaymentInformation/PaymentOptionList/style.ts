import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    .title {
      padding-bottom: ${rem(10)};
    }

    .payment-error-wrapper {
      background-color: ${transparentize(
        0.6,
        theme.coreColor.danger.default.background
      )};
      padding: ${rem(5)} ${rem(15)};
      color: ${theme.color.white['100']};
      margin-bottom: ${rem(10)};
      border-radius: 5px;
    }

    .payment-opts {
      border-bottom: 1px solid #e6e9eb;
      border-top: 0;

      .accordion-header {
        h6 {
          padding: 16px 20px 16px 48px;
          ${theme.fontFamily.ultra};
          font-size: ${rem(14)};
          line-height: ${rem(18)};
          letter-spacing: ${rem(1.4)};

          &::before,
          &::after {
            top: 50%;
            left: 15px;
            transform: translatey(-50%);
            width: 14px;
            height: 14px;
          }
        }

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            h6 {
              &::before {
                box-shadow: 0 0 0 2px #d4d9db;
              }
            }
          }
        }
      }

      .accordion-content {
        .option-contain {
          padding: ${rem(16)};

          button {
            @media (hover: hover) and (pointer: fine) {
              &:hover {
                background-color: ${theme.color.black[1000]};
                color: ${theme.color.white[1000]};
                box-shadow:
                  0 0,
                  0 2px 4px -1px rgba(0, 0, 0, 0.2),
                  0 4px 5px 0 rgba(0, 0, 0, 0.14);
              }
            }
          }
        }
      }

      &.active {
        border-radius: 12px;
        margin: ${rem(10)} 0;
        padding: 0;
        background-color: #f7f8f9;
        border: 0;

        .accordion-header {
          margin: 0;
        }

        & + .payment-opts {
          border-top: 1px solid #e6e9eb;
        }
      }
    }

    .payment-opt {
      border-bottom: 1px solid ${theme.color.grey[900]};
      padding: ${rem(25)} ${rem(30)};

      @media (max-width: ${theme.breakPoints.mobile}) {
        padding: ${rem(15)} 0;
      }

      .accordion-header {
        h6 {
          ${theme.fontFamily.ultra}
          font-size: ${rem(24)};
          margin-bottom: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-transform: capitalize;

          @media (max-width: ${theme.breakPoints.tablet}) {
            font-size: ${rem(20)};
          }

          @media (max-width: ${theme.breakPoints.mobile}) {
            font-size: ${rem(16)};
          }

          &::after {
            content: '\e910';
            font-family: 'dogman' !important;
            font-size: ${rem(8)};
            line-height: 12px;
            text-align: center;
            color: ${theme.color.white[1000]};
          }
        }

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            h6 {
              &::before {
                box-shadow: 0 0 0 2px #d4d9db;
              }
            }
          }
        }
      }

      &.active {
        .accordion-header {
          margin-bottom: 0;
        }

        .accordion-content {
          padding: ${rem(20)} ${rem(30)};
        }
      }
    }

    .payment-btn-wrapper {
      margin-top: ${rem(35)};
      text-align: right;
    }
  `}
`;
