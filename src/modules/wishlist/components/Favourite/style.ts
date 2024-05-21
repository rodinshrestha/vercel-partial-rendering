import { rem } from 'polished';
import styled from 'styled-components';
import { css } from 'styled-components';

export const FavouriteSection = styled.section`
  ${({ theme }) => css`
    .fav-content-wrapper {
      position: relative;
      padding-top: ${rem(35)};
      padding-bottom: ${rem(120)};

      a {
        text-decoration: underline;
        ${theme.fontFamily.semibold}
        padding: 0 5px;
        margin-top: ${rem(15)};

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: ${theme.coreColor.danger.default.background};
          }
        }
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        background-color: ${theme.color.white[1000]};
        --mask: radial-gradient(
              100.62px at 50% calc(100% - 135px),
              #000 99%,
              #0000 101%
            )
            calc(50% - 90px) 0/180px 100%,
          radial-gradient(
              100.62px at 50% calc(100% + 90px),
              #0000 99%,
              #000 101%
            )
            50% calc(100% - 45px) / 180px 100% repeat-x;
        -webkit-mask: var(--mask);
        mask: var(--mask);
        width: 100vw;
        margin-left: calc(50% - 50vw);
        margin-right: calc(50% - 50vw);
        height: 100%;
      }

      .section-title {
        z-index: 1;
        position: relative;
      }

      .search-wrap {
        z-index: 1;
        position: relative;

        input {
          background-color: ${theme.coreColor.body.default.background};
        }

        .btn-wrap {
          a {
            text-decoration: none;
          }
        }
      }
    }

    .favourite-item-wrapper {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -8px;
      row-gap: ${rem(40)};

      .favourite-item {
        flex: 0 0 25%;
        padding: 0 ${rem(8)};

        @media (max-width: ${theme.breakPoints.tablet}) {
          flex: 0 0 33.33%;
        }

        @media (max-width: ${theme.breakPoints.mobile}) {
          flex: 0 0 50%;
        }
      }
    }
  `}
`;
