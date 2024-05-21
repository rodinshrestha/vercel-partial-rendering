import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.section`
  ${({ theme }) => css`
    position: relative;

    @media (max-width: ${theme.breakPoints.tab}) {
      overflow-x: hidden;
    }

    .breadcrumb-wrap {
      margin-bottom: ${rem(35)};

      @media (max-width: ${theme.breakPoints.tab}) {
        margin-bottom: 0;
        padding: ${rem(12)} 0;
      }
    }

    .product-img-inner-wrapper {
      padding-top: ${rem(15)};
      padding-left: ${rem(25)};
      position: relative;

      @media (max-width: ${theme.breakPoints.tab}) {
        padding: 0;
      }
    }

    .sticky-wrapper {
      position: sticky;
      top: 55px;
      padding: 0 ${rem(20)};

      @media (max-width: ${theme.breakPoints.tab}) {
        padding: 0 ${rem(10)};
      }
    }
  `}
`;

export const StyledContentWrap = styled.div`
  ${({ theme }) => css`
    .rating {
      margin-bottom: ${rem(20)};
    }

    .content-info-wrap {
      .price-fav-wrap {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: ${rem(50)};

        @media (max-width: ${theme.breakPoints.tab}) {
          margin-bottom: ${rem(25)};
        }

        @media (max-width: ${theme.breakPoints.mobile}) {
          flex-direction: column;
          align-items: flex-start;
          row-gap: ${rem(20)};
          margin-bottom: ${rem(30)};
        }

        .price-group {
          margin-right: ${rem(35)};

          span {
            &.price {
              ${theme.fontFamily.semibold}
              font-size: ${rem(28)};
              line-height: ${rem(34)};
              letter-spacing: ${rem(2.8)};

              @media (max-width: ${theme.breakPoints.mobile}) {
                font-size: ${rem(14)};
                line-height: ${rem(18)};
                letter-spacing: ${rem(1.4)};
              }
            }

            &.dis-prs {
              font-size: ${rem(18)};
              line-height: ${rem(20)};
              letter-spacing: ${rem(1.8)};
            }
          }
        }

        .fab-btn {
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              opacity: 1;

              svg {
                transform: none;

                path {
                  fill: ${theme.coreColor.body.default.color};
                }
              }
            }
          }
        }
      }

      .register-btn {
        display: inline-block;
        ${theme.fontFamily.semibold}
        text-decoration: underline;
        margin-bottom: ${rem(28)};

        @media (max-width: ${theme.breakPoints.tablet}) {
          margin-bottom: ${rem(10)};
        }
      }
    }

    .size-info-guide {
      margin-top: ${rem(10)};
      line-height: 0;

      span {
        display: inline-block;
        cursor: pointer;
        transition: 0.3s ease all;
        text-decoration: underline;
        ${theme.fontFamily.semibold}
        font-size: ${rem(12)};
        line-height: ${rem(18)};
        letter-spacing: ${rem(1.2)};
        text-transform: uppercase;

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: ${theme.coreColor.primary.default.background};
          }
        }
      }
    }
  `}
`;
