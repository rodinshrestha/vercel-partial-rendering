import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    &.adyen-payment-continer {
      .disable {
        display: none !important;
      }
    }

    &.adyen-payment-continer {
      .adyen-checkout__dropin {
        ul {
          li {
            max-height: 100%;

            &.adyen-checkout__payment-method {
              border-left: 0;
              border-right: 0;
              border-radius: 0;

              &:last-child {
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;

                &.adyen-checkout__payment-method--selected {
                  margin-bottom: 10px;
                }
              }

              &.adyen-checkout__payment-method--selected {
                border: 0;
                padding: 1px;
              }

              .adyen-checkout__payment-method__header {
                .adyen-checkout__payment-method__name_wrapper {
                  .adyen-checkout__payment-method__name {
                    ${theme.fontFamily.ultra};
                    font-size: ${rem(14)};
                    line-height: ${rem(18)};
                    letter-spacing: ${rem(1.4)};
                  }
                }

                .adyen-checkout__payment-method__radio {
                  border: 1px solid ${theme.coreColor.body.default.color};
                  background-color: transparent;

                  &.adyen-checkout__payment-method__radio--selected {
                    background-color: transparent;

                    &::after {
                      background-color: ${theme.coreColor.body.default.color};
                      height: 14px;
                      width: 14px;
                      transform: translateY(-50%) scale(1.3);
                    }
                  }
                }
              }

              .adyen-checkout__payment-method__details {
                .adyen-checkout__payment-method__details__content {
                  .adyen-checkout__button {
                    background-color: ${theme.coreColor.dark.default
                      .background};
                    border-radius: 0;
                    padding: ${rem(10)} ${rem(15)};
                    height: 40px;
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
