'use client';
import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const TextBlock = styled.div`
  ${({ theme }) => css`
    position: relative;

    &.text-block {
      span {
        display: inline-block;
        text-transform: uppercase;

        + h1,
        + h2,
        + h3,
        + h4,
        + h5,
        + h6 {
          margin-top: ${rem(10)};
        }
      }

      h1,
      h2,
      h3,
      h4 {
        margin-bottom: 0;

        & + P {
          margin-top: ${rem(15)};
        }
      }

      .contentImg {
        display: inline-block;
        margin: ${rem(20)};
      }

      p {
        margin-bottom: 0;

        & + P,
        & + a {
          margin-top: ${rem(12)};
        }

        & + h4,
        + h5,
        + h6 {
          margin-top: ${rem(20)};
        }

        img {
          display: inline-block;
          width: 400px;
          height: 240px;
          margin-top: ${rem(30)};
          max-width: 100%;

          @media (max-width: ${theme.breakPoints.mobile}) {
            max-width: 100%;
            height: 100%;
          }
        }
      }
    }
  `}
`;
