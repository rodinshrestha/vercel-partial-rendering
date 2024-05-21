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
      .item-list {
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          text-transform: uppercase;
          margin-bottom: ${rem(10)};
          letter-spacing: ${rem(0.8)};
        }
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
