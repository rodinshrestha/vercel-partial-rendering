import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    display: inline-block;

    span {
      &.btn-discount-code {
        cursor: pointer;
        display: inline-block;
        text-transform: uppercase;
        text-decoration: underline;
        font-size: ${rem(12)};
        line-height: ${rem(14)};
        letter-spacing: ${rem(1.2)};
        ${theme.fontFamily.semibold}
        transition: 0.3s ease all;

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            opacity: 0.6;
          }
        }
      }
    }

    form {
      .add-discount-code-form {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        max-width: 320px;

        .text-field {
          padding-right: ${rem(15)};
          flex-grow: 1;

          input {
            border-color: ${theme.color.grey[900]};
            height: 32px;

            &::placeholder {
              text-transform: capitalize;
              opacity: 0.6;
            }
          }
        }

        button {
          padding: ${rem(6)} ${rem(15)};
        }
      }
    }

    .voucher {
      text-decoration: underline;
      color: ${transparentize(0.73, theme.color.grey[900])};
      cursor: pointer;
      transition: 0.3s ease all;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: ${theme.coreColor.danger.default.background};
        }
      }

      @media (max-width: ${theme.breakPoints.tablet}) {
        .voucher {
          margin: ${rem(20)};
        }
      }
    }
  `}
`;
