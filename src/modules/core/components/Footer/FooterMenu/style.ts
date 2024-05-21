'use client';
import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyleDiv = styled.div`
  ${({ theme }) => css`
    margin-bottom: ${rem(50)};
    text-transform: uppercase;
    ${theme.fontFamily.regular}

    @media (max-width: ${theme.breakPoints.mobile}) {
      margin-bottom: ${rem(32)};
    }

    h6 {
      font-size: ${rem(12)};
      line-height: ${rem(16)};
      letter-spacing: ${rem(1.2)};
      margin-bottom: ${rem(30)};
    }

    ul {
      list-style: none;

      li {
        font-size: ${rem(12)};
        line-height: ${rem(16)};
        letter-spacing: ${rem(1.2)};

        a {
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              ${theme.fontFamily.semibold}
            }
          }
        }

        & + li {
          margin-top: ${rem(30)};
        }
      }
    }
  `}
`;
