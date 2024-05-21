'use client';

import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    position: relative;
    flex-grow: 1;

    form {
      position: relative;
      z-index: 5;

      input {
        width: 100%;
        border-radius: 0;
        border: none;
        color: inherit;
        padding: ${rem(10)} ${rem(15)} ${rem(10)} ${rem(30)};
        background-color: ${theme.color.white[1000]};
        border-bottom: 1px solid ${theme.coreColor.body.default.color};
        ${theme.fontFamily.light}
        line-height: ${rem(18)};
        font-size: ${rem(14)};
        letter-spacing: ${rem(1.4)};

        &::placeholder {
          ${theme.fontFamily.light}
          font-size: ${rem(14)};
          line-height: ${rem(18)};
          letter-spacing: ${rem(1.4)};
          text-transform: uppercase;
          color: ${theme.coreColor.body.default.color};
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
      }
    }

    .btn-wrap {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      color: ${theme.color.black['800']};
      margin: 0;
      z-index: 1;
      cursor: pointer;
      line-height: ${rem(12)};
      font-size: ${rem(12)};

      &.remove-btn {
        right: 0;
        left: auto;
      }
    }

    &.active {
      display: block !important;
    }

    .info {
      padding: ${rem(10)};
      font-size: ${rem(12)};
      letter-spacing: ${rem(1.2)};
      opacity: 0.7;
    }
  `}
`;
export const StyleLoader = styled.div`
  .loader-wrap {
    left: 0;
    transform: translateY(-50%);
  }
`;
