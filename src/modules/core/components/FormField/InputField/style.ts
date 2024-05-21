import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    &.input-field {
      display: inline-block;
      width: 100%;
      position: relative;

      .input-field-loader {
        z-index: 100;
      }
    }

    .input-wrap {
      position: relative;
    }

    .error-message {
      color: ${theme.color.red['900']};
      font-size: ${rem(12)};
    }

    .eye {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%) rotate(45deg);
    }
  `}
`;

export const InputStyle = styled.input<{ $rounded: string | number }>`
  ${({ theme, $rounded }) => css`
    display: inline-block;
    font-size: ${rem(12)};
    line-height: ${rem(18)};
    min-height: 35px;
    letter-spacing: ${rem(1.2)};
    padding: ${rem(5)};
    width: 100%;
    border: 0;
    background-color: transparent;
    border-bottom: 1px solid;
    border-radius: ${$rounded || 0};
    border-color: ${theme.coreColor.body.default.color};
    color: inherit;
    ${theme.fontFamily.light};

    &::placeholder {
      color: ${theme.color.black['800']};
      opacity: 0.8;
      font-size: ${rem(12)};
      letter-spacing: ${rem(1.2)};
      ${theme.fontFamily.light};
    }

    &:focus {
      outline: none;
      box-shadow: none;
    }

    &:-webkit-autofill,
    &:-internal-autofill-selected {
      background-color: transparent;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }

    &.error {
      border-color: ${theme.color.red['900']};
      padding: ${rem(5)} ${rem(10)};

      &::placeholder {
        color: ${theme.color.red['900']} !important;
      }
    }

    &.disabled {
      opacity: 0.4;
    }

    &:autofill,
    &:-webkit-autofill-strong-password,
    &:-webkit-autofill-strong-password-viewable,
    &:-webkit-autofill-and-obscured {
      background-color: inherit !important;
    }

    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  `}
`;

export const LableStyle = styled.label`
  ${({ theme }) => css`
    ${theme.fontFamily.semibold}
    font-size: ${rem(12)};
    line-height: ${rem(16)};
    text-transform: uppercase;

    &.error {
      color: ${theme.coreColor.danger.default.background};
    }

    &.disabled {
      opacity: 0.4;
    }
  `}
`;

interface Props {
  color?: string;
}

export const StyledTextArea = styled.textarea`
  border: ${(props: Props) => props.color};
`;
