import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    position: relative;

    @media (max-width: ${theme.breakPoints.tab}) {
      margin: 0;
    }

    .loader-container {
      position: absolute;
      z-index: 3;
      width: 100%;
      height: 100%;
    }

    .favourite-wrapper {
      position: relative;
      display: flex;
      flex-wrap: wrap;

      .favourite-img {
        width: 70px;
        height: 101px;
        position: relative;
        cursor: pointer;

        a {
          display: block;
          height: 100%;
          max-width: 100%;
        }

        img {
          object-fit: contain;
          object-position: top;
        }
      }

      .favourite-content-wrapper {
        padding-left: ${rem(15)};
        display: flex;
        justify-content: space-between;
        flex: 0 0 calc(100% - 90px);
        flex-grow: 1;

        @media (max-width: ${theme.breakPoints.tab}) {
          padding-left: ${rem(10)};
        }

        .favourite-content {
          padding-right: 15px;
          flex-grow: 1;

          span {
            &.favourite-item-sku {
              ${theme.fontFamily.light}
              display: inline-block;
              margin-bottom: ${rem(5)};
              font-size: ${rem(10)};
              line-height: ${rem(12)};
              opacity: 0.5;
            }
          }

          .favourite-item-title {
            margin-bottom: ${rem(10)};

            h2 {
              ${theme.fontFamily.light}
              font-size: ${rem(12)};
              line-height: ${rem(18)};
              letter-spacing: ${rem(1.2)};
              text-transform: uppercase;

              a {
                color: inherit;

                @media (hover: hover) and (pointer: fine) {
                  &:hover {
                    text-decoration: none;
                  }
                }
              }
            }
          }

          .favourite-product-info {
            margin-bottom: ${rem(5)};

            .favourite-product-attribute-list {
              display: flex;
              gap: 10px;
              margin-bottom: ${rem(5)};
            }

            span {
              font-size: ${rem(12)};
              line-height: ${rem(18)};
              letter-spacing: ${rem(1.2)};

              &.price {
                display: flex;
                flex-wrap: wrap;
                align-items: baseline;
                gap: 5px;
                margin-bottom: ${rem(5)};

                span {
                  color: ${theme.color.red[900]};
                  ${theme.fontFamily.semibold}

                  & + span {
                    text-decoration: line-through;
                    font-size: ${rem(12)};
                    line-height: ${rem(16)};
                    ${theme.fontFamily.regular}
                    color: ${transparentize(0.73, theme.color.grey[900])};

                    @media (max-width: ${theme.breakPoints.mobile}) {
                      font-size: ${rem(9)};
                      line-height: ${rem(12)};
                    }
                  }

                  &:last-child {
                    color: inherit;
                  }
                }
              }
            }
          }

          .btn-wrapper {
            a {
              border-bottom: 1px solid ${theme.color.grey[900]};
              color: inherit;
              text-align: left;
            }
          }
        }

        .btnGroup {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;

          .remove-btn {
            cursor: pointer;
            transition: 0.3s ease all;

            i {
              font-size: ${rem(12)};
              line-height: ${rem(12)};
            }

            @media (hover: hover) and (pointer: fine) {
              &:hover {
                opacity: 0.7;
              }
            }
          }
        }
      }
    }

    & + .favourite-item {
      padding-top: ${rem(15)};
      margin-top: ${rem(15)};
      border-top: 1px solid ${transparentize(0.3, theme.color.grey[900])};
    }
  `}
`;

export const LoaderContainerStyle = styled.div`
  ${({ theme }) => css`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${transparentize(0.4, theme.color.grey[300])};
    z-index: 1;
    transform: scaleX(1.08) scaleY(1.2);
    border-radius: 20px;
    transition: 0.3s ease all;
    background: linear-gradient(
      110deg,
      ${theme.color.grey[300]} 8%,
      ${theme.color.white[300]} 18%,
      ${theme.color.grey[300]} 33%
    );
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
    opacity: 0.8;

    @keyframes shine {
      to {
        background-position-x: -200%;
      }
    }
  `}
`;
