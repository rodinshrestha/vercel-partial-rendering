import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    margin-bottom: ${rem(40)};

    @media (max-width: ${theme.breakPoints.tab}) {
      margin-bottom: ${rem(25)};
    }

    .var-title {
      display: inline-block;
      text-transform: uppercase;
      font-size: ${rem(12)};
      line-height: ${rem(12)};
      letter-spacing: ${rem(1)};
      margin-bottom: ${rem(10)};
      ${theme.fontFamily.semibold}

      @media (max-width: ${theme.breakPoints.tab}) {
        margin-bottom: ${rem(5)};
      }
    }

    .varaints-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;

      .varaint-list {
        ${theme.fontFamily.semibold}
        cursor: pointer;
        text-align: center;
        min-width: 30px;
        min-height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: ${rem(2)};
        border: 1px solid transparent;

        &:has(img) {
          height: auto;
        }

        img {
          width: 80px;
          height: 100px;

          @media (max-width: ${theme.breakPoints.tablet}) {
            width: auto;
            height: 80px;
          }
        }

        .variants-title {
          transition: 0.3s ease all;
          letter-spacing: normal;
          padding: 8px 8px 5px;

          & + .variants-price {
            border-top: 1px solid ${theme.color.grey[900]};
            padding-top: ${rem(5)};
            margin-top: ${rem(5)};
          }
        }

        &.disable {
          position: relative;
          cursor: not-allowed;
          pointer-events: none;
          color: ${theme.color.grey[900]};
          opacity: 0.3;

          .variants-title,
          .variants-price {
            text-decoration: line-through;
            pointer-events: none;
          }
        }

        &:hover,
        &.active {
          ${theme.fontFamily.semibold}
          border-color: ${theme.coreColor.primary.default.background};
          box-shadow: 0 1px 2px
            ${transparentize(0.84, theme.coreColor.body.default.color)};

          .variants-title {
            & + .variants-price {
              border-color: ${theme.color.green[1100]};
            }
          }
        }

        &.b2b-variant-list {
          border: 1px solid transparent;

          &:hover,
          &.active {
            border: 1px solid ${theme.coreColor.primary.default.background};
          }
        }
      }

      &.size-attr {
        gap: 30px;

        .b2b-variant-list {
          border: 1px solid transparent;

          &:hover,
          &.active {
            border: 1px solid ${theme.coreColor.body.default.color};
          }
        }
      }
    }
  `}
`;
