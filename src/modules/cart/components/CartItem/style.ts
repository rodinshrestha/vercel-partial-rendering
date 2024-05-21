import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const LoaderContainerStyle = styled.div`
  ${({ theme }) => css`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    /* transform: scaleX(1.08) scaleY(1.2); */
    transition: 0.5s ease all;
    background-color: ${transparentize(0.4, theme.color.grey[300])};
    background: linear-gradient(
      110deg,
      ${theme.color.grey[300]} 8%,
      ${theme.color.white[300]} 18%,
      ${theme.color.grey[300]} 33%
    );
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
    opacity: 0.8;

    @keyframes shine {
      to {
        background-position-x: -200%;
      }
    }
  `}
`;

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding-top: ${rem(20)};

    .cart-wrapper {
      position: relative;
      flex-grow: 1;
      display: flex;
      flex-wrap: wrap;
      transition: 0.3s ease all;
    }

    & + .cart-item {
      padding-top: ${rem(15)};
      margin-top: ${rem(15)};
      border-top: 1px solid ${transparentize(0, theme.color.grey[900])};

      @media (max-width: ${theme.breakPoints.tab}) {
        margin-top: ${rem(20)};
        padding-top: ${rem(20)};
      }
    }

    .image {
      width: 67px;
      height: 101px;
      position: relative;
      cursor: pointer;

      a {
        display: block;
        height: 100%;
        max-width: 100%;
      }

      img {
        object-fit: contain;
        object-position: top;
      }
    }

    .content-wrapper {
      padding-left: ${rem(12)};
      position: relative;
      flex: 0 0 calc(100% - 100px);
      flex-grow: 1;

      .content-wrapper-inner {
        .not-proceed-msg {
          margin-top: ${rem(10)};
          ${theme.fontFamily.semibold}
          background-color: ${theme.coreColor.dark.default.background};
          line-height: ${rem(14)};
          font-size: ${rem(10)};
          padding: ${rem(2)} ${rem(10)} ${rem(5)};
          color: ${theme.coreColor.danger.default.color};
          border-radius: ${rem(10)};
          opacity: calc() 0.4;
          width: 80%;
        }

        .sku-no {
          padding-right: ${rem(20)};
          font-size: ${rem(10)};
          line-height: ${rem(12)};
          letter-spacing: ${rem(1)};
          margin-bottom: ${rem(5)};

          span {
            display: block;
            text-transform: capitalize;
            display: inline-block;
            ${theme.fontFamily.light}
          }
        }

        h2 {
          ${theme.fontFamily.light}
          font-size: ${rem(12)};
          line-height: ${rem(14)};
          letter-spacing: ${rem(1.2)};
          height: auto;
          max-height: 28px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: ${rem(10)};
          text-transform: uppercase;

          a {
            color: inherit;
          }
        }

        h6 {
          font-size: ${rem(14)};
          opacity: 0.5;
          color: ${theme.coreColor.danger.default.background};
        }

        p {
          margin-bottom: 0;
          font-size: ${rem(14)};
          line-height: ${rem(20)};
          text-transform: uppercase;

          & + p {
            margin-top: ${rem(5)};
          }
        }

        .info {
          line-height: normal;
          display: flex;
          gap: ${rem(20)};
          row-gap: ${rem(5)};
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: ${rem(15)};
          /* flex-direction: column; */

          span {
            margin-bottom: 0;
            font-size: ${rem(12)};
            line-height: ${rem(14)};
            letter-spacing: normal;
            text-transform: capitalize;
            ${theme.fontFamily.light}

            &.value {
              ${theme.fontFamily.regular}
            }
          }
        }

        .quantity-price-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          margin-bottom: ${rem(25)};

          .price-wrap {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            flex: 0 0 50%;
            gap: 5px;

            .price {
              margin-bottom: 0;
              font-size: ${rem(12)};
              line-height: ${rem(14)};
              letter-spacing: ${rem(1.2)};

              & + span {
                font-size: ${rem(10)};
                line-height: ${rem(12)};
                text-decoration: line-through;
                color: ${theme.color.black['100']};
              }
            }
          }
        }

        small {
          &.error {
            font-size: ${rem(10)};
            margin-top: ${rem(15)};
            color: ${theme.coreColor.danger.default.background};
            opacity: 0.7;
          }
        }
      }
    }

    .btnGroup {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: ${rem(14)};
      line-height: ${rem(18)};
      ${theme.fontFamily.light}
      text-decoration: underline;
      letter-spacing: normal;

      .remove-cart {
        display: inline-flex;
        cursor: pointer;
        transition: 0.3s ease all;

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            opacity: 0.6;
          }
        }

        i {
          font-size: ${rem(12)};
          line-height: ${rem(12)};
        }

        &.disabled {
          cursor: not-allowed;

          i {
            pointer-events: none;
          }
        }
      }
    }

    &:first-child {
      padding-top: 0;
    }
  `}
`;
