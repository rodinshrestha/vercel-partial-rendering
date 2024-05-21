import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.coreColor.light.default.background};
    border-radius: ${theme.radius};
    position: relative;
    padding-bottom: ${rem(20)};

    &.error {
      border: 1px solid red;
    }

    .form-title {
      margin-bottom: ${rem(35)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        margin-bottom: ${rem(20)};
      }
    }

    .delivery-address-postal-wrapper {
      display: flex;
      flex-wrap: wrap;
      padding: 0 ${rem(30)};
      margin-bottom: ${rem(35)};
      align-items: self-start;
      margin: 0 -10px;

      @media (max-width: ${theme.breakPoints.tab}) {
        padding: 0 ${rem(30)};
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        padding: 0 ${rem(15)};
      }

      .input-field {
        flex: 0 0 55%;
        flex-grow: 1;
        padding-right: ${rem(15)};
      }

      button {
        flex: 0 0 15%;
        margin-top: ${rem(20)};

        @media (max-width: ${theme.breakPoints.tab}) {
          flex: 0 0 20%;
        }
      }

      .select-shiping {
        flex: 0 0 30%;
        max-width: 30%;
        padding-right: ${rem(15)};

        @media (max-width: ${theme.breakPoints.tab}) {
          flex: 0 0 100%;
          max-width: 100%;
          padding-right: 0;
          margin-bottom: ${rem(15)};
        }
      }
    }

    .delivery-option-wrapper {
      .title {
        padding-bottom: ${rem(10)};
        border-bottom: 1px solid ${theme.coreColor.body.default.color};
      }

      .delivery-notice {
        text-transform: uppercase;
        font-size: ${rem(12)};
        line-height: ${rem(18)};
        letter-spacing: ${rem(1.2)};
        padding: ${rem(40)} ${rem(25)};
        border-bottom: 1px solid ${transparentize(0.5, theme.color.grey[900])};

        @media (max-width: ${theme.breakPoints.tab}) {
          padding: ${rem(40)} ${rem(15)};
        }
      }

      .delivery-option-list {
        .delivery-opt {
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
          }

          .accordion-content {
            padding-bottom: 0;

            .delivery-body {
              max-height: 250px;
              height: 100%;
              overflow: hidden auto;
              scroll-behavior: smooth;
            }

            .radio-field {
              label {
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
                  font-size: ${rem(7)};
                  line-height: 10px;
                  text-align: center;
                  color: ${theme.color.white[1000]};
                }
              }

              .sub-label-price {
                display: block;
                width: 100%;
                padding: 0 ${rem(30)};
                color: ${transparentize(0.73, theme.color.grey[900])};
                margin-top: ${rem(5)};
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

        .delivery-opt-item {
          border-bottom: 1px solid ${theme.color.grey[900]};
          padding: ${rem(25)} ${rem(30)};

          .delivery-info {
            padding-left: 30px;

            p {
              font-size: ${rem(12)};
              line-height: ${rem(16)};
              letter-spacing: $[rem(1.2)];
              ${theme.fontFamily.light}

              &.delivery-price {
                ${theme.fontFamily.light}
              }
            }

            .delivery-description {
              margin-top: 50px;

              @media (max-width: ${theme.breakPoints.mobile}) {
                margin-top: ${rem(35)};
              }
            }
          }

          label {
            margin-bottom: 0;
            color: ${theme.coreColor.body.default.color};
          }

          @media (max-width: ${theme.breakPoints.mobile}) {
            padding: ${rem(15)} 0;
          }
        }
      }
    }

    .no-delivery-address-msg {
      margin-top: ${rem(15)};
      font-size: ${rem(12)};
      line-height: ${rem(18)};
      letter-spacing: ${rem(1.2)};
    }
  `}
`;
