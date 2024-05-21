import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StylePaginationWrapper = styled.div``;

export const StylePagination = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${rem(10)};
    align-items: center;
    margin: ${rem(12)} 0;
    ${theme.fontFamily.semibold};

    .total-page-count {
      display: block;
    }

    .pagination-list {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      list-style: none;

      li {
        margin: 0 ${rem(10)};
        border-radius: 50%;

        a {
          list-style: none;
          font-size: ${rem(18)};
          line-height: ${rem(28)};
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          cursor: pointer;
          overflow: hidden;
          transition: 0.3s ease all;
          color: ${theme.color.grey[900]};

          @media (max-width: ${theme.breakPoints.tab}) {
            font-size: ${rem(14)};
            line-height: ${rem(22)};
          }
        }

        svg {
          path {
            stroke-width: 2px;
          }
        }

        span {
          display: block;
          width: 100%;
          line-height: 40px;

          @media (max-width: ${theme.breakPoints.tab}) {
            line-height: 30px;
          }
        }

        &.active,
        &.disabled {
          cursor: not-allowed;

          a {
            pointer-events: none;
          }

          span {
            pointer-events: none;
          }
        }

        &.disabled {
          opacity: 0.3;
        }

        &:hover:not(.disabled),
        &.active {
          a {
            ${theme.fontFamily.semibold}
            color: inherit;
          }
        }

        &.previous,
        &.next {
          margin: 0 15px;
        }
      }
    }
  `}
`;
