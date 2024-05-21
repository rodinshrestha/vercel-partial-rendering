'use client';

import styled, { css } from 'styled-components';

import { SkinType } from '../Button';

export const StyledLoader = styled.div<{ $color: SkinType; $size: string }>`
  ${({ theme, $color, $size }) => css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .growing-loader {
      background-color: ${theme.coreColor[$color].default.background};
      opacity: 0;
      width: ${$size};
      height: ${$size};
      border-radius: 50%;
      animation: 0.75s linear infinite spinner-grow;
      transform-origin: center;
    }

    .spinner {
      width: ${$size};
      height: ${$size};
      border: solid 2px transparent;
      border-radius: 50%;
      border-top-color: ${theme.coreColor[$color].default.color};
      border-left-color: ${theme.coreColor[$color].default.color};
      animation: progress-spinner 400ms linear infinite;
    }

    @keyframes progress-spinner {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes spinner-grow {
      0% {
        transform: scale(0);
      }

      50% {
        opacity: 1;
        transform: none;
      }
    }
  `}
`;
