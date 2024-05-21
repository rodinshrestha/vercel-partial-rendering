import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    .price-group {
      .product-price {
        line-height: normal;

        span {
          margin-bottom: 0;
          font-size: ${rem(13)};
          line-height: ${rem(16)};
          letter-spacing: ${rem(1.3)};
          /* color: ${theme.coreColor.danger.default.background}; */
          color: inherit;

          @media (min-width: calc(${theme.breakPoints.largeDesktop} + 1px)) {
            font-size: ${rem(17)};
            line-height: ${rem(23)};
            letter-spacing: ${rem(1.7)};
          }

          @media (max-width: ${theme.breakPoints.mobile}) {
            font-size: ${rem(10)};
            line-height: ${rem(12)};
            letter-spacing: ${rem(1)};
          }

          & + span {
            text-decoration: line-through;
            color: ${theme.color.grey[1100]};
            ${theme.fontFamily.regular}
            font-size: ${rem(10)};
            line-height: ${rem(12)};
            letter-spacing: ${rem(1)};
            padding-left: ${rem(5)};

            @media (max-width: ${theme.breakPoints.mobile}) {
              font-size: ${rem(8)};
              line-height: ${rem(12)};
              letter-spacing: ${rem(0.8)};
            }
          }

          &:first-child {
            /* color: ${theme.coreColor.body.default.color}; */
            color: inherit;
          }
        }

        &.green {
          color: ${theme.color.green['500']};
        }

        & + .product-price {
          margin-top: ${rem(5)};
        }
      }
    }
  `}
`;
