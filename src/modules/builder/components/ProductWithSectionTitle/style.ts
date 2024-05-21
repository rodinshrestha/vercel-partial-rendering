import styled from 'styled-components';
import { css } from 'styled-components';
import { rem } from 'polished';

import { breakPoints } from '@/theme/breakPoints';

export const StyledSection = styled.section`
  ${({ theme }) => css`
    overflow-x: hidden;

    .section-heading {
      margin-bottom: ${rem(12)};

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        @media (max-width: ${breakPoints.mobile}) {
          font-size: ${rem(14)};
          line-height: ${rem(18)};
          letter-spacing: ${rem(1.4)};
        }
      }

      p {
        max-width: 50%;

        @media (max-width: ${breakPoints.mobile}) {
          max-width: 100%;
        }
      }
    }

    .swiper {
      .swiper-button-prev,
      .swiper-button-next {
        @media (max-width: ${breakPoints.tablet}) {
          color: ${theme.coreColor.body.default.color};
        }
      }
    }

    .product-card {
      margin: 0;

      .product-image-wrapper {
        padding-top: 135%;
      }
    }

    .custom-col {
      flex: 0 0 25%;
      max-width: 25%;

      @media (max-width: ${theme.breakPoints.tab}) {
        flex: 0 0 33.33%;
        max-width: 33.33%;
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        flex: 0 0 50%;
        max-width: 50%;
      }
    }

    .btn-wrapper {
      .see-more,
      .see-more a {
        display: inline-block;
        font-size: ${rem(18)};
        line-height: ${rem(24)};
        letter-spacing: ${rem(1.8)};
        text-transform: uppercase;
        position: relative;
        padding-right: ${rem(25)};
        transition: 0.3s ease all;

        @media (max-width: ${theme.breakPoints.tab}) {
          font-size: ${rem(16)};
          line-height: ${rem(20)};
          letter-spacing: ${rem(1.6)};
        }

        @media (max-width: ${theme.breakPoints.mobile}) {
          font-size: ${rem(14)};
          line-height: ${rem(18)};
          letter-spacing: ${rem(1.4)};
        }

        svg {
          position: absolute;
          top: calc(50% - 2px);
          right: 0;
          transform: translateY(-50%);
          transition: 0.3s ease all;
        }

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            text-decoration: underline;

            svg {
              transform: translate(10px, -50%);
            }
          }
        }
      }
    }

    &.dark {
      background: ${theme.coreColor.dark.default.background};
      color: ${theme.coreColor.dark.default.color};
    }

    .has-border-top,
    .has-border-bottom {
      border-color: inherit;
    }

    .has-border-top {
      border-top: 1px solid;
      padding-top: 50px;
    }

    .has-border-bottom {
      border-bottom: 1px solid;
      padding-bottom: 50px;
    }
  `}
`;
