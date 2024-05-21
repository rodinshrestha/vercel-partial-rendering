import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

import { color } from '@/theme/color';

export const StyledDiv = styled.div<{ $rounded: string | number }>`
  ${({ theme, $rounded }) => css`
    position: relative;
    border-radius: ${theme.radius};

    .basic-select {
      .select__control {
        background-color: transparent;
        border-radius: ${$rounded || 0};
        min-height: 30px;
        padding: 0 ${rem(10)};
        border: 0;
        border-bottom: 1px solid;
        border-color: ${theme.coreColor.body.default.color};
        cursor: pointer;
        font-size: ${rem(14)};
        letter-spacing: ${rem(1.4)};
        line-height: ${rem(26)};
        ${theme.fontFamily.regular}

        &--is-focused {
          outline: none;
          box-shadow: none;
        }

        .select__value-container {
          padding: 0;

          .select__single-value,
          .select__placeholder {
            font-size: inherit;
            text-transform: capitalize;
            color: inherit;
          }

          .select__input-container {
            color: inherit;
            font-size: inherit;
            font-family: inherit;
          }
        }

        .select__indicators {
          color: inherit;

          .select__indicator {
            color: inherit;

            svg {
              transition: 0.3s ease all;
            }
          }

          .select__clear-indicator,
          .select__indicator-separator {
            margin-right: 1px;
            background-color: transparent !important;
          }
        }

        &--menu-is-open {
          .icon-down_arrow,
          svg {
            transform: rotate(-180deg);
            color: inherit;
          }
        }

        &.variants {
          &.select__control--menu-is-open {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }

          &-opt {
            .select__single-value,
            .select__placeholder {
              ${theme.fontFamily.semibold}
            }
          }
        }
      }

      .select__menu {
        background-color: ${theme.color.black['200']};
        border-radius: 0 0 12px 12px;
        color: ${theme.color.white['200']};
        color: inherit;

        &-list {
          font-size: ${rem(14)};

          .select__option {
            background-color: transparent;
            padding: ${rem(10)} ${rem(20)};
            position: relative;
            cursor: pointer;
            transition: 0.3s ease all;

            &:hover,
            &.select__option--is-selected {
              ${theme.fontFamily.semibold}
            }

            & + .select__option {
              border-top: 1px solid;
              ${transparentize(0.3, theme.color.white['200'])};
            }

            @media (hover: hover) and (pointer: fine) {
              &:hover {
                ${theme.fontFamily.semibold}
              }
            }
          }
        }
      }

      &.has-error {
        .select__control {
          border-color: ${theme.color.red['900']} !important;

          .select__single-value,
          .select__placeholder {
            color: ${theme.color.red['900']};
          }

          .select__indicators {
            .select__indicator {
              span {
                color: ${theme.color.red['900']};
              }
            }
          }
        }
      }

      &.disable {
        opacity: 0.4;

        .input-field-loader {
          position: relative;
        }
      }
    }

    label {
      ${theme.fontFamily.semibold}
      font-size: ${rem(12)};
      letter-spacing: ${rem(1.2)};
      line-height: ${rem(16)};

      &.error {
        color: ${theme.coreColor.danger.default.background};
      }

      &.disabled {
        opacity: 0.4;
      }
    }

    .loader-overlay {
      top: -10px;
      transform-origin: center center;
    }

    .error-message {
      color: ${color.red['400']};
      font-size: ${rem(12)};
    }
  `}
`;
