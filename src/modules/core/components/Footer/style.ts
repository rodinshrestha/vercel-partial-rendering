import styled, { css } from 'styled-components';
import { rem } from 'polished';

export const StyleFooter = styled.footer`
  ${({ theme }) => css`
    position: relative;
    z-index: 1;
    background-color: ${theme.coreColor.body.default.color};
    color: ${theme.coreColor.body.default.background};

    @media print {
      display: none;
    }

    .footer-img {
      margin-bottom: ${rem(50)};

      @media (max-width: ${theme.breakPoints.mobile}) {
        margin-bottom: ${rem(35)};
      }

      img {
        @media (max-width: ${theme.breakPoints.mobile}) {
          width: 172.95px;
          height: 26.64px;
        }
      }
    }

    @media (max-width: ${theme.breakPoints.mobile}) {
      text-align: center;
      padding-top: ${rem(75)};
    }
  `}
`;

export const StyleWrapper = styled.div`
  ${({ theme }) => css`
    align-self: center;
    padding: 0 ${rem(12)} ${rem(12)};
    text-transform: uppercase;

    p {
      text-align: center;
      font-size: ${rem(10)};
      line-height: ${rem(16)};
      ${theme.fontFamily.light}
    }
  `}
`;

export const SocialMedia = styled.div`
  ${({ theme }) => css`
    margin-bottom: ${rem(50)};

    h6 {
      font-size: ${rem(12)};
      line-height: ${rem(16)};
      letter-spacing: ${rem(1.2)};
      margin-bottom: ${rem(20)};
      text-transform: uppercase;
    }

    .media-icons {
      display: flex;
      gap: ${rem(20)};
      height: 100%;
      align-items: center;
      margin-top: ${rem(22)};

      @media (max-width: ${theme.breakPoints.mobile}) {
        justify-content: center;
      }

      img {
        width: auto;
        height: 18px;

        @media (min-width: calc(${theme.breakPoints.largeDesktop} + 1px)) {
          width: auto;
          height: 25px;
        }
      }
    }
  `}
`;
