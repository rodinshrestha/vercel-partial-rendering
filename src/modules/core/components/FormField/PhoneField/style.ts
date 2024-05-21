import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    width: 100%;

    .react-tel-input {
      font-family: inherit;
      color: inherit;
      font-size: inherit;
      line-height: inherit;
      letter-spacing: inherit;

      .form-control {
        background-color: transparent;
        width: 100%;
        border-radius: 0;
        border: 0;
        border-color: inherit;
        border-bottom: 1px solid;
        font-size: ${rem(12)};
        line-height: ${rem(18)};
        letter-spacing: ${rem(1.2)};

        &::placeholder {
          color: ${theme.color.black['800']};
          opacity: 0.8;
          font-size: ${rem(12)};
          letter-spacing: ${rem(1.2)};
          ${theme.fontFamily.light};
        }
      }

      .flag-dropdown {
        background-color: transparent;
        border: 0;

        .selected-flag {
          &:hover {
            background-color: transparent;
          }
        }

        .country-list {
          .country {
            .country-name {
              text-transform: uppercase;
            }
          }
        }

        &.open {
          .selected-flag {
            background-color: transparent;
          }
        }
      }
    }

    .error-message {
      color: ${theme.color.red['900']};
      font-size: ${rem(12)};
    }

    &.error {
      .react-tel-input {
        .form-control {
          border-color: ${theme.color.red['900']};

          &::placeholder {
            color: ${theme.color.red['900']} !important;
          }
        }

        .flag-dropdown {
          border-color: ${theme.color.red['900']};

          .selected-flag {
            border-color: ${theme.color.red['900']};
          }
        }
      }
    }
  `}
`;
