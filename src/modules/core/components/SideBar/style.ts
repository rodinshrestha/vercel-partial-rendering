import { rem } from 'polished';
import styled from 'styled-components';
import { css } from 'styled-components';

export const SideBarWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.fontFamily.semibold}
    font-size: ${rem(14)};
    line-height: ${rem(18)};
    letter-spacing: ${rem(1.4)};
    margin: 0 ${rem(10)};

    @media print {
      display: none;
    }

    @media (max-width: ${theme.breakPoints.mobile}) {
      margin: 0;
      padding: 0 ${rem(8)};
    }

    .sidebar-opener {
      position: relative;
      display: none;
      background-color: ${theme.color.white[1000]};
      padding: ${rem(10)} ${rem(15)};
      border-radius: 15px;
      margin-bottom: ${rem(12)};
      text-transform: uppercase;

      @media (max-width: ${theme.breakPoints.tab}) {
        display: block;
        padding: ${rem(5)} 0;
        margin-bottom: ${rem(5)};
      }

      span {
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
        position: relative;
        padding-right: ${rem(30)};
        font-size: ${rem(14)};
        line-height: ${rem(14)};
      }

      i,
      svg {
        position: absolute;
        top: 0;
        right: 10px;
        transition: 0.3s ease all;
        font-size: ${rem(14)};
        line-height: ${rem(20)};

        &.active {
          transform: translateY(-50%) rotate(-180deg);
        }
      }
    }

    .side-bar-wrap {
      transition: 0.3s ease all;

      .sidebar-menu {
        &.show {
          display: block;
          opacity: 1;
          visibility: visible;
          transform-origin: top center;
        }

        @media (max-width: ${theme.breakPoints.tab}) {
          display: none;
          opacity: 0;
          visibility: hidden;
        }

        ul {
          list-style: none;
          padding: ${rem(10)} 0;
          margin: 0 ${rem(15)};
          background-color: ${theme.coreColor.body.default.background};
          overflow: hidden auto;
          height: 100%;
          max-height: 382px;
          border-bottom: 1px solid ${theme.coreColor.body.default.color};
          border-top: 1px solid ${theme.coreColor.body.default.color};

          @media (max-width: ${theme.breakPoints.tab}) {
            margin: 0;
          }

          li {
            a {
              ${theme.fontFamily.light}
              display: inline-block;
              color: inherit;
              padding: ${rem(10)} 0;
              font-size: ${rem(12)};
              line-height: ${rem(14)};
              letter-spacing: ${rem(1.2)};
              text-transform: uppercase;

              @media (max-width: ${theme.breakPoints.mobile}) {
                padding: ${rem(10)};
              }

              &:hover,
              &.active {
                ${theme.fontFamily.semibold}
              }

              &.disabled {
                opacity: 0.4;
                pointer-events: none;
              }
            }
          }
        }
      }

      .btn-wrapper {
        margin: ${rem(20)} 0;
        padding: 0 ${rem(15)};
      }
    }

    &.page-sidebar {
      .side-bar-wrap {
        @media (max-width: ${theme.breakPoints.tab}) {
          margin-bottom: ${rem(25)};
          display: block;
          visibility: visible;
          opacity: 1;

          .sidebar-menu {
            ul {
              display: block;
              background-color: ${theme.color.white[1000]};
              border-radius: 15px;
            }

            &.b2c-sidebar-menu {
              ul {
                display: flex;
                flex-wrap: wrap;
                background-color: transparent;
                gap: 10px;
                padding: 0;

                @media (max-width: ${theme.breakPoints.mobile}) {
                  border-radius: 0;
                }

                li {
                  border: none;

                  a {
                    background-color: ${theme.coreColor.light.default
                      .background};
                    padding: ${rem(10)} ${rem(25)};
                    border-radius: ${theme.radius};

                    &:hover,
                    &.active {
                      @media (max-width: ${theme.breakPoints.mobile}) {
                        background-color: ${theme.color.green[100]};
                        border: 1px solid ${theme.color.green[1200]};
                        color: ${theme.coreColor.body.default.color};
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `}
`;
