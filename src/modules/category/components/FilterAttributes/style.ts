import { rem, transparentize } from 'polished';
import styled from 'styled-components';
import { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    @media (min-width: calc(${theme.breakPoints.tab} + 1px)) {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    @media (max-width: ${theme.breakPoints.tab}) {
      height: 100%;
    }

    .scroll-wrap {
      @media (min-width: calc(${theme.breakPoints.tab} + 1px)) {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 50px;
        row-gap: ${rem(25)};
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        max-height: calc(100% - 53px + 15px);
        overflow: hidden auto;
        scroll-behavior: smooth;
      }

      .filter-category-wrapper {
        @media (max-width: ${theme.breakPoints.tab}) {
          padding-bottom: ${rem(15)};
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
              }

              i {
                font-size: 12px;
              }

              svg {
                margin-left: ${rem(10)};

                @media (max-width: ${theme.breakPoints.mobile}) {
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
              width: 100%;
              left: 0;
              top: calc(100% + 23px);
              z-index: 5;
              min-width: 200px;
              background-color: ${theme.coreColor.body.default.background};
              box-shadow: 0 1px 3px
                ${transparentize(0.84, theme.coreColor.body.default.color)};
            }

            .categore-filter-wrap {
              padding: ${rem(20)};
            }
          }
        }
      }
    }

    .filter-bottom {
      margin-left: ${rem(50)};

      @media (max-width: ${theme.breakPoints.tab}) {
        border-top: 1px solid ${transparentize(0.73, theme.color.grey[900])};
        padding: ${rem(15)} 0;
        margin-left: 0;
        text-align: right;
      }

      .reset-filter-btn {
        margin-right: 0;
        padding: 0;
        background-color: transparent;

        font-size: ${rem(12)};
        line-height: ${rem(16)};
        letter-spacing: ${rem(1.2)};

        @media (max-width: ${theme.breakPoints.mobile}) {
          font-size: ${rem(10)};
          line-height: ${rem(14)};
          letter-spacing: ${rem(1)};
        }

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: ${theme.coreColor.body.default.color};
            opacity: 0.5;
          }
        }
      }
    }
  `}
`;
