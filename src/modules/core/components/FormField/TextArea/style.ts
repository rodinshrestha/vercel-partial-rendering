import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    &.text-field {
      display: block;
      width: 100%;
      position: relative;
      border: 1px solid;
      border-radius: ${rem(20)};
      border-color: ${theme.color.grey[900]};
      overflow: hidden;

      .input-field-loader {
        z-index: 100;
      }
    }

    .error-message {
      color: ${theme.color.red['900']};
      font-size: ${rem(12)};
    }

    .eye {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
    }
  `}
`;

export const TextAreaStyle = styled.textarea`
  ${({ theme }) => css`
    display: block;
    font-size: ${rem(14)};
    line-height: ${rem(18)};
    padding: ${rem(10)} ${rem(15)};
    background-color: transparent;
    width: 100%;
    height: 100%;
    border: 1px solid;
    color: inherit;
    border-color: ${theme.coreColor.body.default.color};

    &::placeholder {
      color: ${theme.color.black['800']};
      text-transform: capitalize;
      opacity: 1;
      font-size: ${rem(12)};
      display: none !important;
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
