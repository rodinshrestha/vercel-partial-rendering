import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const FavouriteItemWrap = styled.div`
  ${({ theme }) => css`
    .favourite-wrapper {
      display: inline-block;
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: 0.4s ease all;
      background-color: ${theme.color.white[1000]};

      &.b2b-product-item {
        background-color: ${theme.color.white[1000]};
        border-radius: 12px;
      }

      .bg-grey {
        color: ${transparentize(0.73, theme.color.grey[900])};
      }

      .item-head {
        position: relative;

        .favourite-img {
          position: relative;
          padding-top: 110%;

          @media (min-width: calc( ${theme.breakPoints.largeDesktop} + 1px)) {
            padding-top: 105%;
          }
        }

        .fav-btn-wrap {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 1;
          padding: ${rem(10)} ${rem(15)};
          font-size: ${rem(22)};
          line-height: ${rem(22)};
          padding: ${rem(10)} ${rem(15)};

          @media (max-width: ${theme.breakPoints.tablet}) {
            font-size: ${rem(20)};
            line-height: ${rem(20)};
            padding: ${rem(10)};
          }

          @media (max-width: ${theme.breakPoints.tablet}) {
            font-size: ${rem(20)};
            line-height: ${rem(20)};
            padding: ${rem(10)};
          }

          @media (max-width: ${theme.breakPoints.mobile}) {
            font-size: ${rem(16)};
            line-height: ${rem(16)};
          }

          span {
            &.fav-btn {
              display: inline-block;
              position: relative;
              line-height: 0;
              transition: 0.3s ease all;

              i {
                cursor: pointer;

                @media (max-width: ${theme.breakPoints.mobile}) {
                  margin-left: ${rem(10)};
                }

                &.icon-heart {
                  color: ${theme.coreColor.danger.default.background};

                  &_outline {
                    @media (hover: hover) and (pointer: fine) {
                      &:hover {
                        color: ${theme.coreColor.danger.default.background};

                        &::before {
                          content: '\e90c';
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          .loader-wrap {
            position: static;
            transform: none;
          }
        }
      }

      .item-body {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        text-align: center;
        align-items: center;
        padding-top: ${rem(10)};

        .product-variant-opt-wrap {
          ul {
            display: flex;
            align-items: center;
          }
        }

        .favourite-item-info {
          position: relative;
          display: flex;
          height: 100%;
          text-align: center;
          flex-direction: column;
          align-items: center;

          .favourite-item-sku {
            ${theme.fontFamily.light}
            display: inline-block;
            margin-bottom: ${rem(5)};
            font-size: ${rem(10)};
            line-height: ${rem(12)};
            opacity: 0.5;
          }

          h2,
          h6 {
            ${theme.fontFamily.light}
            font-size: ${rem(11)};
            line-height: ${rem(13)};
            letter-spacing: ${rem(1.1)};
            text-transform: uppercase;
            height: auto;
            max-height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;

            @media (min-width: calc( ${theme.breakPoints.largeDesktop} + 1px)) {
              font-size: ${rem(16)};
              line-height: ${rem(20)};
              letter-spacing: ${rem(1.6)};
              max-height: 40px;
            }
          }

          a {
            &.custom-link {
              display: block;
              text-align: center;
              margin: ${rem(12)} 0;
              color: #6b6b6b;
            }
          }

          span {
            &.category-tag {
              color: ${theme.color.red[1100]};
              opacity: 0.5;
              font-size: ${rem(10)};
              line-height: ${rem(12)};
              letter-spacing: ${rem(1)};
              margin-bottom: ${rem(3)};
              display: block;

              @media (min-width: calc( ${theme.breakPoints
                  .largeDesktop} + 1px)) {
                font-size: ${rem(14)};
                line-height: ${rem(20)};
              }

              @media (max-width: ${theme.breakPoints.mobile}) {
                font-size: ${rem(9)};
                line-height: ${rem(14)};
              }
            }
          }

          .add-to-cart {
            margin-top: ${rem(10)};

            @media (min-width: calc(${theme.breakPoints.mobile} + 1px)) {
              opacity: 0;
              visibility: hidden;
              margin-top: 0;
            }

            &.out-of-stock {
              font-size: ${rem(12)};
              line-height: ${rem(16)};
              padding: ${rem(8)} ${rem(5)};
            }

            a {
              padding: ${rem(6)} ${rem(10)};
            }
          }
        }
      }

      .product-variant-opt-wrap {
        margin-top: ${rem(15)};

        ul {
          list-style: none;
          padding-left: 0;
          display: flex;
          align-items: center;

          li {
            margin-right: ${rem(10)};
            line-height: 0;

            &.variant-opt-item {
              border: 1px solid ${theme.coreColor.body.default.color};
              width: 16px;
              height: 16px;
              border-radius: 50%;
              position: relative;

              span {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: inline-block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
              }
            }

            .radio-field {
              label {
                font-size: 0;
                margin-bottom: 0;
                padding-left: 15px;
              }

              [type='radio'] {
                &:checked,
                &:not(:checked) {
                  display: none;
                  & + label {
                    &::after {
                      width: 8px;
                      height: 8px;
                    }

                    &::before {
                      width: 12px;
                      height: 12px;
                      top: 2px;
                      left: 2px;
                    }
                  }
                }
              }
            }
          }
        }
      }

      .btn-wrap {
        margin-top: ${rem(10)};

        .price-wrap {
          padding-right: 10px;

          .regular-price {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            gap: 5px;

            span {
              font-size: ${rem(13)};
              line-height: ${rem(15)};
              letter-spacing: ${rem(1.3)};
              color: ${theme.coreColor.primary.default.background};
              ${theme.fontFamily.semibold}

              @media (max-width: ${theme.breakPoints.tablet}) {
                font-size: ${rem(15)};
                line-height: ${rem(20)};
              }

              @media (max-width: ${theme.breakPoints.mobile}) {
                font-size: ${rem(13)};
                line-height: ${rem(18)};
              }

              & + span {
                text-decoration: line-through;
                font-size: ${rem(12)};
                line-height: ${rem(16)};
                ${theme.fontFamily.regular}
                color: ${transparentize(
                  0.73,
                  theme.color.grey[900]
                )} !important;

                @media (min-width: calc( ${theme.breakPoints
                    .largeDesktop} + 1px)) {
                  font-size: ${rem(14)};
                  line-height: ${rem(18)};
                }

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

        .member-price-wrapper {
          font-size: ${rem(10)};
          line-height: ${rem(14)};
          color: ${theme.coreColor.primary.default.background};

          span {
            ${theme.fontFamily.semibold}
          }
        }

        .fav-link-btn,
        .add-to-cart {
          margin-top: ${rem(10)};
          padding: ${rem(6)} ${rem(10)};

          @media (min-width: calc(${theme.breakPoints.mobile} + 1px)) {
            opacity: 0;
            visibility: hidden;
            margin-top: 0;
          }

          &.out-of-stock {
            font-size: ${rem(12)};
            line-height: ${rem(16)};
            padding: ${rem(8)} ${rem(5)};
          }

          a {
            padding: ${rem(6)} ${rem(10)};
          }
        }
      }

      &:hover {
        @media (hover: hover) and (pointer: fine) {
          .fav-link-btn,
          .rollover-image,
          .hover-img {
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }
  `}
`;
