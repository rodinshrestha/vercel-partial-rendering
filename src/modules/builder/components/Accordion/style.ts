'use client';
import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    position: relative;

    .guideAccordion-wrap {
      text-align: center;

      .content-wrap {
        margin-bottom: ${rem(50)};

        h2,
        h3,
        h4 {
          margin-bottom: ${rem(20)};
        }
      }

      .accordion-container {
        @media (min-width: 768px) {
          max-width: 420px;
          margin: 0 auto;
        }
      }

      .accordion-item {
        padding: ${rem(15)} 0 ${rem(10)};
        border-top: 0;
        border-bottom: ${rem(0.25)} solid;
        border-color: ${theme.color.grey['600']};

        .accordion-header {
          padding: 0;

          h3,
          h4,
          h5 {
            margin-bottom: 0;
            text-transform: uppercase;
          }

          span {
            &.icon-down-arrow {
              font-size: ${rem(18)};
              line-height: ${rem(26)};
            }
          }
        }

        &.active {
          .accordion-title {
            border-bottom: 0;
          }
        }

        .accordion-content {
          padding: 0;
          text-align: left;
          margin: ${rem(15)} 0;

          p,
          .content {
            margin-bottom: 0;

            & + P {
              margin-top: ${rem(20)};

              @media (max-width: 1199px) {
                margin-top: ${rem(15)};
              }
            }

            img {
              max-width: 100%;
              height: 100%;
            }
          }

          ul {
            list-style: none;
            margin-bottom: 0;
            padding-left: 0;

            li {
              & + li {
                margin-top: ${rem(15)};
              }
            }
          }

          .accordion-image {
            position: relative;
            margin: ${rem(15)};

            img {
              object-fit: contain;
              max-width: 100% !important;
              height: 100% !important;
            }
          }
        }

        ul.icon-bar {
          margin-top: ${rem(35)};
          li {
            display: inline-block;
            margin-right: ${rem(50)};

            img {
              height: 50px;
            }

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  `}
`;
