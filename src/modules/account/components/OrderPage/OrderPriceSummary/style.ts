import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    position: relative;
    padding: ${rem(35)} 0;

    @media (max-width: ${theme.breakPoints.desktop}) {
      padding: ${rem(40)} 0;
      border: 0;
    }

    .order-wrap {
      .vat {
        p {
          color: ${theme.color.grey['900']};
          font-size: 10px;
        }
      }
      .item-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: ${rem(5)};

        p {
          text-transform: uppercase;
          margin-bottom: ${rem(10)};
          letter-spacing: ${rem(0.8)};
        }
      }
      .item-price {
        ${theme.fontFamily.semibold}
      }

      &.total-order {
        border-top: 1px solid ${theme.color.grey['500']};
        padding-top: ${rem(10)};

        p {
          margin-bottom: 0;
        }
      }
    }
  `}
`;
