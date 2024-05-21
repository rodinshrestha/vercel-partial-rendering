import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

import { breakPoints } from '@/theme/breakPoints';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    text-align: inherit;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 0;
      margin-top: 0;
      text-transform: uppercase;

      & + p,
      .product-short-description {
        margin-top: ${rem(20)};

        @media (max-width: ${breakPoints.tablet}) {
          margin-top: ${rem(20)};
        }
      }

      & + h2,
      & + h3,
      & + h4,
      & + h5,
      & + h6 {
        margin-top: ${rem(20)};

        @media (max-width: ${breakPoints.tablet}) {
          margin-top: ${rem(20)};
        }
      }
    }

    p {
      margin-bottom: 0;

      & + p {
        margin-top: ${rem(20)};
      }
    }

    span {
      &.subtitle1 {
        display: inline-block;
        margin-bottom: ${rem(10)};
        text-transform: uppercase;
      }
    }

    &.section-heading {
      .text-center {
        text-align: center;
      }

      .text-left {
        text-align: left;
      }

      .text-right {
        text-align: right;
      }
    }

    div + .btn-wrapper {
      margin-top: ${rem(45)};

      @media (max-width: ${breakPoints.tablet}) {
        margin-top: ${rem(35)};
      }
    }

    &.has-border {
      position: relative;
      padding: ${rem(100)} 0;

      &::before,
      &::after {
        content: '';
        position: absolute;
        height: 1px;
        left: 0;
        width: calc(100vw - 20vw);
        margin-left: calc(50% - 40vw);
        margin-right: calc(50% - 40vw);
      }

      &::before {
        top: 0;
      }

      &::after {
        bottom: 0;
      }

      @media (max-width: ${breakPoints.tablet}) {
        padding: ${rem(75)} 0;
      }

      @media (max-width: ${breakPoints.tablet}) {
        padding: ${rem(60)} 0;
      }
    }

    &.border-color {
      &-dark {
        &::before,
        &::after {
          background-color: ${transparentize(0.6, theme.color.black[800])};
        }
      }

      &-light {
        &::before,
        &::after {
          background-color: ${transparentize(0.6, theme.color.white[1000])};
        }
      }
    }
  `}
`;
