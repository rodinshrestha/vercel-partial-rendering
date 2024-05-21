import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const StyledHeader = styled.header`
  ${({ theme }) => css`
    position: sticky;
    width: 100%;
    width: 100vw;
    top: 0;
    z-index: 5;
    transition: 0.4s ease all;
    transform-origin: top center;
    background-color: ${theme.coreColor.light.default.background};
    border-bottom: 1px solid
      ${transparentize(0.98, theme.coreColor.body.default.color)};

    @media print {
      display: none;
    }

    .humburger-wrap {
      padding: ${rem(15)} 0;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .header-logo {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      padding: ${rem(15.8)} 0;
    }

    .nav-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 ${rem(15)};

      @media (max-width: ${theme.breakPoints.mobile}) {
        padding: 0 ${rem(10)};
      }

      .nav-menu-wrapper {
        @media (max-width: ${theme.breakPoints.tab}) {
          display: none;
        }
      }
    }
  `}
`;

export const StyledTopWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    position: relative;
    background-color: ${theme.coreColor.header.default.background};

    @media (max-width: ${theme.breakPoints.tab}) {
      padding-bottom: 60px;
      align-items: center;
    }

    .scroll-menu-wrap {
      flex-grow: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: ${rem(18)} ${rem(30)};
      height: 100%;
      transition: 0.4s ease all;
      margin-left: auto;

      &.sticky-wrap {
        background-color: ${theme.coreColor.header.default.background};
        padding: ${rem(12)} ${rem(30)};

        @media (max-width: ${theme.breakPoints.tablet}) {
          padding: ${rem(10)} ${rem(20)};
        }

        @media (max-width: ${theme.breakPoints.mobile}) {
          padding: ${rem(9)} ${rem(15)};
        }

        .nav-menu {
          li {
            .dropdown-menu {
              top: 82%;
            }
          }
        }
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        padding: ${rem(15)} ${rem(20)};
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        padding: ${rem(9)} ${rem(15)};
      }
    }

    &.stickyTopWrap {
      padding-bottom: 0;
      background-color: transparent;
    }
  `}
`;

export const StyledButtonWrap = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-grow: 1;
    border-top-left-radius: ${rem(10)};
    gap: 20px;
    flex-direction: row-reverse;
    position: static;
    justify-content: space-between;
    margin-left: auto;

    @media (max-width: ${theme.breakPoints.tab}) {
      flex-grow: unset;
      padding: 0;
      gap: 10px;
    }

    .search-wrap {
      flex-grow: 1;
      display: flex;
      align-items: center;
      position: relative;
      margin-left: ${rem(20)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        margin-left: 0;
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        position: static;
      }

      .hide {
        visibility: hidden;
        opacity: 0;
        width: 0;
        position: absolute;
        right: 15px;
        z-index: 1;
        background-color: ${theme.coreColor.header.default.background};
        padding: ${rem(5)} ${rem(15)};
        padding-right: 0;

        @media (max-width: ${theme.breakPoints.tab}) {
          top: 100%;
        }

        input {
          visibility: hidden;
          opacity: 0;
        }

        &.active {
          visibility: visible;
          opacity: 1;
          width: 460px;

          @media (min-width: calc( ${theme.breakPoints.desktop} + 1px)) {
            width: 620px;
            max-width: 620px;
          }

          @media (max-width: ${theme.breakPoints.tab}) {
            width: calc(100% - 30px);
          }

          input {
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
            visibility: visible;
            opacity: 1;
          }
        }
      }

      .search-bar {
        max-width: 555px;
        transition: 0.3s ease all;

        @media (min-width: calc( ${theme.breakPoints.desktop} + 1px)) {
          max-width: 65%;
        }

        @media (max-width: ${theme.breakPoints.tab}) {
          position: absolute;
          bottom: 10px;
          max-width: 100%;
          width: calc(100% - 30px);
          left: 0;
          margin-left: ${rem(15)};
        }
      }
    }

    span {
      &.icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: ${rem(5)};
        position: relative;
        background-color: ${theme.color.white[1000]};
        color: ${theme.color.black[800]};
        min-width: 40px;
        height: 40px;
        padding: 10px;
        border-radius: 50px;
        cursor: pointer;
        transition: 0.3s ease all;
        z-index: 1;

        @media (max-width: ${theme.breakPoints.mobile}) {
          height: 30px;
          min-width: 30px;
          max-width: 30px;
        }

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            background-color: ${theme.color.black[800]};
            color: ${theme.color.white[1000]};
          }
        }

        i {
          font-size: ${rem(18)};

          @media (max-width: ${theme.breakPoints.mobile}) {
            font-size: ${rem(14)};
          }

          &.icon-close {
            font-size: ${rem(14)};

            @media (max-width: ${theme.breakPoints.mobile}) {
              font-size: ${rem(12)};
            }
          }
        }
      }
    }

    &.sticky-button-wrap {
      flex-shrink: 1;
      flex-grow: 0;
      transition: 0.4s ease all;

      &:has(.fav) {
        @media (max-width: ${theme.breakPoints.tab}) {
          flex-shrink: unset;
          flex-grow: 1;
        }
      }

      .search-wrap {
        justify-content: flex-end;

        .btn-wrap {
          display: none;
        }
      }
    }
  `}
`;
