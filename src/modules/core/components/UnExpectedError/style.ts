import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div<{ height: number | string }>`
  ${({ theme, height }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: ${rem(20)} 0;
    height: ${height ? `${height}` : 'calc(100vh - 131px)'};
    color: inherit;

    @media (max-width: ${theme.breakPoints.mobile}) {
      max-width: 100%;
    }

    &::after {
      content: '';
      position: absolute;
      top: 30px;
      left: 0;
      width: 100%;
      height: calc(100% - 60px);
      background-image: url('/images/error.png');
      background-origin: border-box;
      background-position: center right;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 30px;
    }

    .content-wrapper {
      text-align: center;
      max-width: 45%;
      margin: auto;
      position: relative;
      z-index: 1;

      @media (max-width: ${theme.breakPoints.tab}) {
        max-width: 80%;
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        max-width: 100%;
        padding: ${rem(10)};
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;

      & + P {
        margin-top: ${rem(25)};
      }
    }

    h1 {
      font-size: ${rem(72)};
      line-height: ${rem(80)};
      ${theme.fontFamily.regular}

      @media (max-width: ${theme.breakPoints.tab}) {
        font-size: ${rem(42)};
        line-height: ${rem(48)};
      }
    }

    p {
      ${theme.fontFamily.regular}
      font-size: ${rem(22)};
      line-height: ${rem(28)};

      @media (max-width: ${theme.breakPoints.tab}) {
        font-size: ${rem(18)};
        line-height: ${rem(24)};
      }
    }

    .btn-wrapper {
      margin-top: ${rem(50)};
      display: flex;
      justify-content: center;

      .link-btn {
        justify-content: center;

        a {
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    &.account-error {
      height: 50vh;
      background: ${theme.color.white[1000]};
      border-radius: 20px;
      max-width: 100%;

      .content-wrapper {
        max-width: 50%;
        margin: auto;

        @media (max-width: ${theme.breakPoints.mobile}) {
          max-width: 100%;
        }
      }
    }

    .server-error {
      margin: 0 ${rem(20)};

      @media (max-width: ${theme.breakPoints.mobile}) {
        margin: 0 ${rem(10)};
      }
    }
  `}
`;
