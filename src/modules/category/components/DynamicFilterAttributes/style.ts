import { rem, transparentize } from 'polished';
import styled from 'styled-components';
import { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    position: relative;
    @media (max-width: ${theme.breakPoints.tab}) {
      border-top: 1px solid ${transparentize(0.73, theme.color.grey[900])};
      padding: ${rem(15)} 0;
    }

    .filter-accordion {
      position: relative;

      .accordion-header {
        h6 {
          font-size: ${rem(12)};
          line-height: ${rem(16)};
          letter-spacing: ${rem(1.2)};
          ${theme.fontFamily.regular}
          text-transform: uppercase;

          @media (max-width: ${theme.breakPoints.mobile}) {
            font-size: ${rem(10)};
            line-height: ${rem(14)};
            letter-spacing: ${rem(1)};
            width: 100%;
          }

          i {
            font-size: 12px;
          }

          svg {
            margin-left: ${rem(10)};

            @media (max-width: ${theme.breakPoints.tab}) {
              width: 9px;
              height: 9px;
            }
          }
        }
      }

      &.active {
        .accordion-header {
          margin-bottom: 0;
        }
      }

      .accordion-content {
        padding: 0;

        @media (min-width: calc(${theme.breakPoints.tab} + 1px)) {
          position: absolute;
          left: 0;
          z-index: 5;
          min-width: 200px;
          top: calc(100% + 23px);
          background-color: ${theme.coreColor.body.default.background};
          max-height: 350px;
          overflow: hidden auto;
          scroll-behavior: smooth;
          box-shadow: 0 1px 3px
            ${transparentize(0.84, theme.coreColor.body.default.color)};
        }

        .b2b-dynamic-filter-opts-wrapper {
          padding: ${rem(20)};
        }
      }
    }
  `}
`;
