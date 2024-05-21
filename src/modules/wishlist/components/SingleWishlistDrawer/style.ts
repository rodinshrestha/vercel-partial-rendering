import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const DrawerContainer = styled.div`
  ${() => css``}
`;

export const DrawerFooter = styled.div`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.color.grey[900]};
    padding: ${rem(15)} ${rem(10)};
  `}
`;

export const StyledWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    margin: 0 ${rem(10)};

    @media (max-width: ${theme.breakPoints.tab}) {
      margin: 0;
    }

    & + .favourite-item {
      padding-top: ${rem(20)};
      margin-top: ${rem(20)};
      border-top: 1px solid ${transparentize(0.3, theme.color.grey[900])};
    }
  `}
`;

export const PriceGroup = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: ${rem(10)};

    @media (max-width: ${theme.breakPoints.mobile}) {
      display: block;
    }

    .price-wrap {
      padding-right: 10px;
      flex: 0 0 calc(100% - 75px);
    }

    .price-wrap {
      .regular-price {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 5px;

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

    .member-price-wrapper {
      font-size: ${rem(10)};
      line-height: ${rem(14)};
      color: ${theme.coreColor.primary.default.background};

      span {
        ${theme.fontFamily.semibold}
      }
    }
  `}
`;
