import { rem, transparentize } from 'polished';
import styled from 'styled-components';
import { css } from 'styled-components';

export const StyledCheckoutHeader = styled.header`
  ${({ theme }) => css`
    position: sticky;
    top: 0;
    z-index: 3;
    background-color: ${theme.coreColor.header.default.background};
    border-bottom: 1px solid ${transparentize(0.85, theme.color.grey[900])};

    .header-wrap {
      display: flex;
      justify-content: space-between;
      position: relative;
      padding: ${rem(10)} ${rem(20)};

      .link-btn {
        a {
          height: 100%;

          @media (max-width: ${theme.breakPoints.mobile}) {
            min-width: 30px;
            max-width: 30px;
          }
        }
      }

      .logo {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .login {
        span {
          cursor: pointer;
          font-size: ${rem(14)};
          ${theme.fontFamily.semibold}

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
            padding: ${rem(10)} ${rem(20)};
            border-radius: 50px;
            transition: 0.3s ease all;

            @media (max-width: ${theme.breakPoints.mobile}) {
              height: 30px;
              min-width: 30px;
              max-width: 30px;
              padding: 8px;
            }

            i {
              font-size: ${rem(16)};

              @media (max-width: ${theme.breakPoints.mobile}) {
                font-size: ${rem(14)};
              }
            }

            @media (hover: hover) and (pointer: fine) {
              &:hover {
                background-color: ${theme.color.black[800]};
                color: ${theme.color.white[1000]};

                img {
                  filter: invert(1);
                }
              }
            }

            a {
              opacity: 1;
            }

            .user-name {
              @media (max-width: ${theme.breakPoints.tab}) {
                display: none;
              }
            }
          }

          &.log-out {
            background-color: ${theme.coreColor.danger.default.background};
          }
        }
      }
    }

    & + main {
      margin-top: 0;
    }
  `}
`;
