import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    .checkout-item-list {
      .cart-drawer-item {
        .cart-item {
          .cart-wrapper {
            .image {
              width: 79px;
              height: 118.5px;

              img {
                object-fit: contain;
                object-position: top;
              }
            }
          }

          .content-wrapper {
            .content-wrapper-inner {
              font-size: ${rem(14)};
              line-height: ${rem(18)};
              letter-spacing: ${rem(1.4)};

              .title {
                h2 {
                  font-size: inherit;
                  line-height: inherit;
                  letter-spacing: inherit;
                }
              }

              .quantity-price-wrap {
                .price-wrap {
                  .price {
                    font-size: inherit;
                    line-height: inherit;
                    letter-spacing: inherit;
                  }
                }
              }
            }
          }

          .btnGroup {
            .remove-cart {
              display: inline-flex;
              cursor: pointer;
              transition: 0.3s ease all;

              @media (hover: hover) and (pointer: fine) {
                &:hover {
                  opacity: 0.6;
                }
              }

              .icon-close {
                &:before {
                  content: '\e911';
                  font-size: 10px;
                }
              }
            }
          }
        }

        & + .cart-drawer-item {
          margin-top: ${rem(15)};
          padding-top: ${rem(15)};
          border-top: 1px solid ${transparentize(0.5, theme.color.grey[900])};

          @media (max-width: ${theme.breakPoints.tab}) {
            margin-top: ${rem(20)};
            padding-top: ${rem(20)};
          }
        }
      }

      & + .checkout-item-list {
        border-top: 1px solid ${theme.color.grey[900]};
        padding-top: ${rem(20)};
        margin-top: ${rem(10)};
      }
    }
  `}
`;
