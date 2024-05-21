import { rem, transparentize } from 'polished';
import styled from 'styled-components';
import { css } from 'styled-components';

interface Props {
  size: 'fullscreen' | 'auto';
  width?: string | number;
}

export const DrawerHeader = styled.div<{ $hasHeaderBorder?: boolean }>`
  ${({ theme, $hasHeaderBorder }) => css`
    position: relative;
    padding: ${rem(25)} ${rem(10)};
    text-transform: uppercase;

    .drawer-header-wrapper {
      position: relative;

      .drawer-header-title {
        display: flex;
        text-align: center;
        justify-content: center;

        h3 {
          ${theme.fontFamily.semibold}
          font-size: ${rem(18)};
          line-height: ${rem(20)};
          letter-spacing: ${rem(1.8)};
          margin-bottom: 0;
          align-items: center;

          i {
            margin-right: ${rem(20)};
          }
        }

        .sub-title {
          margin: auto ${rem(7)};
          font-size: ${rem(16)};
          line-height: ${rem(18)};
          ${theme.fontFamily.semibold};
        }
      }

      .icon-close {
        cursor: pointer;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        font-size: ${rem(16)};
        line-height: ${rem(16)};

        @media (max-width: ${theme.breakPoints.tablet}) {
          font-size: ${rem(14)};
          line-height: ${rem(14)};
        }

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            opacity: 0.7;
          }
        }
      }

      .btn-block {
        button {
          margin: 0;
        }
      }
    }

    .action-clear {
      display: inline-block;
      padding-left: ${rem(20)};
      margin-bottom: ${rem(10)};
      cursor: pointer;
      transition: 0.3s all ease-in;
      text-decoration: underline;
      text-transform: capitalize;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          opacity: 0.7;
        }
      }
    }

    ${$hasHeaderBorder &&
    css`
      border-bottom: 1px solid ${transparentize(0.73, theme.color.grey[900])};
    `}
  `}
`;

export const StyledDiv = styled.div<Props>`
  ${({ theme, width, size }) => css`
    background-color: ${theme.color.white['1000']};
    position: fixed;
    height: 100%;
    display: flex;
    flex-direction: column;
    width: ${width || '100%'};
    max-width: 400px;

    &.left {
      left: 0;
    }

    &.right {
      right: 0;
    }

    &.top,
    &.bottom {
      width: 100%;
    }

    .drawer-body {
      height: ${size === 'fullscreen' ? '100%' : 'auto'};
      padding: ${rem(15)};
      overflow: hidden auto;
      scroll-behavior: smooth;
    }

    .drawer-footer {
      border-top: 1px solid ${theme.color.grey[900]};
      margin: 0 ${rem(10)};
    }

    &:has(.notice) {
      .drawer-header {
        border-bottom: 0;
      }
    }
  `}
`;
