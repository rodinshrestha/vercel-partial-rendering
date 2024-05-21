import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { rem, transparentize } from 'polished';

export const StyledDiv = styled.div`
  ${() => css`
    position: relative;
    height: calc(100% - 130px);
  `}
`;

type DivProps = {
  depth: number;
};

export const MotionStyledDiv = styled(motion.div)<DivProps>`
  z-index: ${({ depth }) => depth};

  ${({ theme }) => css`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${theme.coreColor.light.default.background};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-transform: uppercase;

    .back-btn-wrapper {
      position: relative;
      padding: ${rem(20)} 0;
      border-top: 1px solid ${transparentize(0.73, theme.color.grey[900])};
      border-bottom: 1px solid ${transparentize(0.73, theme.color.grey[900])};

      .mobile-menu-drawer-title {
        border-top: 1px solid ${transparentize(0.73, theme.color.grey[900])};
        padding-top: ${rem(20)};
        margin-top: ${rem(20)};

        h6 {
          ${theme.fontFamily.semibold}
          font-size: ${rem(14)};
          line-height: ${rem(20)};
          letter-spacing: ${rem(1.4)};
        }
      }

      button {
        gap: ${rem(15)};

        i {
          padding-right: ${rem(5)};
        }
      }
    }

    &:not([depth='0']) {
      height: 100%;

      .mobile-top-menu {
        height: 100%;
      }

      .menu-list-wrapper {
        ${theme.fontFamily.light}
      }
    }

    .mobile-top-menu {
      height: calc(100% - 158px);
      overflow: hidden auto;
      scroll-behavior: smooth;
      padding-right: 10px;
    }
  `}
`;
