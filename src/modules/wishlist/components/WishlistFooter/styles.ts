import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    padding: ${rem(15)} ${rem(10)};
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: ${rem(14)};
    letter-spacing: ${rem(1.4)};
    line-height: ${rem(14)};
    text-transform: uppercase;

    .footer-info {
      span {
        display: inline-block;
        ${theme.fontFamily.semibold}
        position: relative;
        cursor: pointer;
        transition: 0.3s ease all;
        background-color: ${theme.coreColor.primary.default.background};
        color: ${theme.coreColor.primary.default.color};
        padding: ${rem(15)} ${rem(25)};
        width: 100%;

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            background-color: ${theme.coreColor.primary.hover.background};
            color: ${theme.coreColor.primary.hover.color};
          }
        }
      }
    }
  `}
`;
