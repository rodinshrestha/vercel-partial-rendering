import styled from 'styled-components';
import { css } from 'styled-components';

interface Props {
  $size: 'fullscreen' | 'auto';
  $top: number;
  $zIndex: number;
  $width: number | string;
}

export const StyledDrawer = styled.div<Props>`
  ${({ theme, $top, $size, $zIndex }) => css`
    top: ${$top ? `${$top}px` : 0};
    position: fixed;
    height: ${$size === 'fullscreen' ? '100%' : 'auto'};
    width: 100%;
    background-color: transparent;
    z-index: ${$zIndex || 1};

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

    .drawer-toggle {
      width: 100%;
      height: 100%;
      position: absolute;
    }

    .drawer-wrap {
      @media (max-width: ${theme.breakPoints.tablet}) {
        width: 50%;
        max-width: 50%;
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        width: 100%;
        max-width: 100%;
      }
    }

    &.cart-drawer {
      &.single-cart-added {
        .drawer-wrap {
          height: auto;
        }
      }
    }

    &.nav-drawer,
    &.filter-drawer {
      .drawer-wrap {
        width: 90%;
      }
    }

    &.cart-drawer,
    &.choose-size {
      .drawer-wrap {
        .drawer-body {
          max-height: 100%;
          height: auto;
        }
      }
    }

    &.search-drawer {
      .drawer-wrap {
        max-width: 100%;
        width: 100%;
      }
    }
  `}
`;
