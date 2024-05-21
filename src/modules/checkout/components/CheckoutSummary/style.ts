import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const SummaryWrap = styled.div`
  ${({ theme }) => css`
    position: relative;

    .content-title {
      margin-bottom: ${rem(10)};
    }

    span {
      font-size: ${rem(14)};
      line-height: ${rem(18)};
      letter-spacing: ${rem(1.4)};
      color: inherit;
      text-transform: capitalize;
      ${theme.fontFamily.light}

      &.item-price {
        ${theme.fontFamily.light}
      }
    }

    small {
      font-size: ${rem(10)};
      line-height: ${rem(14)};
      letter-spacing: ${rem(1)};
      color: ${theme.color.black[100]};
      ${theme.fontFamily.regular}
      text-transform: capitalize;

      &.item-price {
        ${theme.fontFamily.semibold}
      }
    }

    .summary-list {
      border-bottom: 1px solid ${transparentize(0.3, theme.color.grey[900])};
      padding-bottom: ${rem(10)};
      margin-bottom: ${rem(10)};
    }

    .summary-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 ${rem(40)};
      line-height: 0;

      @media (max-width: ${theme.breakPoints.tab}) {
        padding: 0 ${rem(25)};
      }

      &.discount-price {
        color: ${theme.coreColor.danger.default.background};
      }

      &.total-price {
        span {
          font-size: ${rem(18)};
          line-height: ${rem(24)};
          ${theme.fontFamily.semibold}
          text-transform: uppercase;
        }
      }

      & + .summary-item {
        margin-top: ${rem(5)};
      }
    }
  `}
`;
