import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    &.nshit-widget-container {
      @media (max-width: ${theme.breakPoints.tab}) {
        max-height: 500px;
        overflow: auto;
        padding: 0 ${rem(10)};
      }

      .nshift-checkout-widget {
        ul {
          li.nshift-option {
            box-shadow: none;
            border-radius: 0px;
            border-bottom: 1px solid ${theme.color.grey[700]};
            margin-bottom: 0;

            .nshift-outer-block {
              @media (max-width: ${theme.breakPoints.tablet}) {
                padding-left: ${rem(15)};
                padding-right: ${rem(15)};
              }

              @media (max-width: ${theme.breakPoints.mobile}) {
                padding-left: 0;
                padding-right: 0;
              }
            }

            .nshift-option-label {
              cursor: pointer !important;

              .nshift-separated-block {
                .nshift-option-header {
                  .nshift-input-radio {
                    min-height: 15px;
                    min-width: 15px;
                    height: 15px;
                    width: 15px;

                    .nshift-input-radio-overlay1 {
                      box-shadow: none;
                      border-color: ${theme.coreColor.body.default.color};
                    }
                  }

                  .nshift-option-header-col1 {
                    .nshift-option-title {
                      ${theme.fontFamily.ultra}
                      font-size: ${rem(14)};
                      line-height: ${rem(18)};
                      letter-spacing: ${rem(1.4)};
                      margin-bottom: 0;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      text-transform: capitalize;
                      color: ${theme.coreColor.body.default.color};
                    }

                    .nshift-option-text1 {
                      font-size: ${rem(12)};
                      line-height: ${rem(16)};
                      letter-spacing: ${rem(1.2)};
                      color: ${theme.color.grey[900]};
                    }
                  }
                }
              }
            }

            .nshift-folding-block {
              .nshift-option-pickup-points {
                button {
                  min-height: 50px;

                  &:focus,
                  &:active {
                    outline: none;
                    box-shadow: none;
                    color: ${theme.coreColor.body.default.color};
                  }
                }
              }

              .nshift-option-text2 {
                color: ${theme.color.grey[900]};
                font-size: ${rem(12)};
                line-height: ${rem(18)};
              }
            }

            &.nshift-selected {
              .nshift-input-radio-overlay1 {
                box-shadow: none;
                background-color: ${theme.coreColor.body.default.color};
                border-color: ${theme.coreColor.body.default.color};

                .nshift-input-radio-overlay2 {
                  background: none;
                  position: absolute;
                }
              }
            }

            .nshift-option-badges {
              .nshift-badge {
                &.nshift-blue {
                  color: ${theme.coreColor.body.default.color};
                }

                &.nshift-green {
                  color: ${theme.coreColor.body.default.color};
                }
              }

              .nshift-badge-icon {
                filter: hue-rotate(250deg);
              }
            }
          }
        }

        .nshift-branding {
          display: none;
        }
      }
    }
  `}
`;
