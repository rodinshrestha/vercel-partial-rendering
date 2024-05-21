import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${() => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${rem(20)};

    .filter-wrapper {
      display: flex;
      justify-content: space-between;
    }
  `}
`;

export const StyledHeaderDiv = styled.div`
  ${({ theme }) => css`
    display: flex;

    h6 {
      position: relative;
      font-size: ${rem(12)};
      line-height: ${rem(18)};
      letter-spacing: ${rem(1.2)};
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-transform: uppercase;
      gap: 5px;
      transition: 0.3s ease all;

      &.filter-title {
        &.active {
        }
      }

      &.product-count {
        ${theme.fontFamily.regular}
        padding-left: ${rem(30)};
      }
    }

    i,
    svg {
      font-size: ${rem(12)};
      line-height: ${rem(16)};

      @media (max-width: ${theme.breakPoints.mobile}) {
        width: 8px;
        height: 8px;
        margin-bottom: 2px;
      }
    }
  `}
`;
