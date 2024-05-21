import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    &.out-of-stock {
      background-color: ${theme.coreColor.danger.default.background};
      color: ${theme.coreColor.danger.default.color};
      opacity: 0.6;
    }

    .quantity {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      min-width: 45px;
      line-height: normal;

      span {
        display: inline-block;
        font-size: ${rem(12)};
        line-height: 0;
        margin-bottom: 0;
        cursor: pointer;

        &.disabled {
          cursor: not-allowed;
          color: grey;
          opacity: 0.4;

          i {
            pointer-events: none;
          }
        }

        &.quantity-minus {
          &.disabled {
            cursor: not-allowed;
            color: grey;
            opacity: 0.4;
          }
        }
      }

      .product-qty-value {
        background-color: transparent;
        display: inline-block;
        border: none;
        ${theme.fontFamily.semibold};
        color: ${theme.color.black['200']};
        padding: 0 ${rem(5)};
        min-width: 50px;
        text-align: center;
        font-display: ${rem(14)};
        line-height: ${rem(14)};
        ${theme.fontFamily.regular}

        &.qty-error {
          color: ${theme.color.red['100']};
        }
      }
    }
  `}
`;
