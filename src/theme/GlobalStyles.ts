'use client';
import { createGlobalStyle, css } from 'styled-components';
import { rem, transparentize } from 'polished';

const GlobalStyles = createGlobalStyle`
${({ theme }) => css`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-font-smoothing: subpixel-antialiased;
    box-sizing: border-box;
    text-rendering: optimizelegibility;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    background-color: ${theme.coreColor.light.default.background};
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 1.4px;
    overflow-x: hidden;
    scrollbar-gutter: stable;
    ${theme.fontFamily.regular}
    color: ${theme.coreColor.body.default.color};
    background-color: ${theme.coreColor.body.default.background};
  }

  /* Normalize */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-weight: normal;
    ${theme.fontFamily.regular};

    strong {
      ${theme.fontFamily.semibold};
    }
  }

  h1,
  .h1 {
    font-size: ${rem(theme.typography.h1.fontSize)};
    line-height: ${rem(theme.typography.h1.lineHeight)};
    letter-spacing: ${rem(theme.typography.h1.letterSpacing)};
    ${theme.typography.h1.responsive};
  }

  h2,
  .h2 {
    font-size: ${rem(theme.typography.h2.fontSize)};
    line-height: ${rem(theme.typography.h2.lineHeight)};
    letter-spacing: ${rem(theme.typography.h2.letterSpacing)};
    ${theme.typography.h2.responsive};
  }

  h3,
  .h3 {
    font-size: ${rem(theme.typography.h3.fontSize)};
    line-height: ${rem(theme.typography.h3.lineHeight)};
    letter-spacing: ${rem(theme.typography.h3.letterSpacing)};
    ${theme.typography.h3.responsive};
  }

  h4,
  .h4 {
    font-size: ${rem(theme.typography.h4.fontSize)};
    line-height: ${rem(theme.typography.h4.lineHeight)};
    letter-spacing: ${rem(theme.typography.h4.letterSpacing)};
    ${theme.typography.h4.responsive};
  }

  h5,
  .h5 {
    font-size: ${rem(theme.typography.h5.fontSize)};
    line-height: ${rem(theme.typography.h5.lineHeight)};
    letter-spacing: ${rem(theme.typography.h5.letterSpacing)};
    ${theme.typography.h5.responsive};
  }

  h6,
  .h6 {
    font-size: ${rem(theme.typography.h6.fontSize)};
    line-height: ${rem(theme.typography.h6.lineHeight)};
    letter-spacing: ${rem(theme.typography.h6.letterSpacing)};
    ${theme.typography.h6.responsive};
  }

  p {
    font-size: ${rem(theme.typography.p.fontSize)};
    line-height: ${rem(theme.typography.p.lineHeight)};
    letter-spacing: ${rem(theme.typography.p.letterSpacing)};
    ${theme.typography.p.responsive};
  }

  small,
  .small {
    font-size: ${rem(theme.typography.small.fontSize)};
    line-height: ${rem(theme.typography.small.lineHeight)};
    letter-spacing: ${rem(theme.typography.small.letterSpacing)};
    ${theme.typography.small.responsive};
  }

  big,
  .big {
    font-size: ${rem(theme.typography.big.fontSize)};
    line-height: ${rem(theme.typography.big.lineHeight)};
    letter-spacing: ${rem(theme.typography.big.letterSpacing)};
    ${theme.typography.big.responsive};
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: 0.3s ease all;
  }

  .d {
    &-block {
      display: block;
    }

    &-none {
      display: none;
    }

    &-flex {
      display: flex;
    }
  }

  .m {
    &t-0 {
      margin-top: 0;
    }

    &-auto {
      margin: auto;
    }

    &x-auto {
      margin: 0 auto;
    }

    &y-auto {
      margin: auto 0;
    }

    &l-auto {
      margin-left: auto;
    }

    &r-auto {
      margin-right: auto;
    }

    &t-30 {
      margin-top: ${rem(30)};
    }
    &b-30 {
      margin-bottom: ${rem(30)};
    }

    &t-35 {
      margin-top: ${rem(35)};
    }
    &b-35 {
      margin-bottom: ${rem(35)};
    }

    &t-50 {
      margin-top: ${rem(50)};
    }
    &b-50 {
      margin-bottom: ${rem(50)};
    }
  }

  .p {
    &-0 {
      padding: 0;
    }

    &t-25 {
      padding-top: ${rem(25)};

      @media (max-width: ${theme.breakPoints.mobile}) {
        padding-top: ${rem(15)};
      }
    }

    &b-25 {
      padding-bottom: ${rem(25)};

      @media (max-width: ${theme.breakPoints.mobile}) {
        padding-bottom: ${rem(15)};
      }
    }

    &t-30 {
      padding-top: ${rem(30)};

      @media (max-width: ${theme.breakPoints.mobile}) {
        padding-top: ${rem(20)};
      }
    }

    &b-30 {
      padding-bottom: ${rem(30)};

      @media (max-width: ${theme.breakPoints.mobile}) {
        padding-bottom: ${rem(20)};
      }
    }

    &t-35 {
      padding-top: ${rem(35)};
    }

    &b-35 {
      padding-bottom: ${rem(35)};
    }

    &t-50 {
      padding-top: ${rem(50)};
    }
    &b-50 {
      padding-bottom: ${rem(50)};
    }

    &t-60 {
      padding-top: ${rem(60)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        padding-top: ${rem(50)};
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        padding-top: ${rem(35)};
      }
    }

    &b-60 {
      padding-bottom: ${rem(60)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        padding-bottom: ${rem(50)};
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        padding-bottom: ${rem(35)};
      }
    }

    &t-75 {
      padding-top: ${rem(75)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        padding-top: ${rem(50)};
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        padding-top: ${rem(40)};
      }
    }

    &b-75 {
      padding-bottom: ${rem(75)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        padding-bottom: ${rem(50)};
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        padding-bottom: ${rem(40)};
      }
    }

    &t-90 {
      padding-top: ${rem(90)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        padding-top: ${rem(70)};
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        padding-top: ${rem(50)};
      }
    }
    &b-90 {
      padding-bottom: ${rem(90)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        padding-bottom: ${rem(70)};
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        padding-bottom: ${rem(50)};
      }
    }

    &t-120 {
      padding-top: ${rem(120)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        padding-top: ${rem(100)};
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        padding-top: ${rem(80)};
      }
    }
    &b-120 {
      padding-bottom: ${rem(120)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        padding-bottom: ${rem(100)};
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        padding-bottom: ${rem(80)};
      }
    }

    &t-150 {
      padding-top: ${rem(150)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        padding-top: ${rem(120)};
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        padding-top: ${rem(90)};
      }
    }
    &b-150 {
      padding-bottom: ${rem(150)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        padding-bottom: ${rem(120)};
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        padding-top: ${rem(90)};
      }
    }
  }

  /** == text == **/
  .text {
    &-left {
      text-align: left;
    }
    &-right {
      text-align: right;
    }
    &-center {
      text-align: center;
    }

    &-uppercase {
      text-transform: uppercase;
    }

    &-lowercase {
      text-transform: lowercase;
    }

    &-capitalize {
      text-transform: capitalize;
    }

    &-balck {
      color: ${theme.color.black['200']};
    }

    &-white {
      color: ${theme.color.white['1000']};
    }
  }

  .flex {
    &-row {
      flex-direction: row;

      &-reverse {
        flex-direction: row-reverse;
      }
    }
  }

  .align-items {
    &-center {
      align-items: center;
    }

    &-start {
      align-items: flex-start;
    }

    &-end {
      align-items: flex-end;
    }
  }

  /** == image == **/
  .object {
    &-cover {
      object-fit: cover;
    }
    &-contain {
      object-fit: contain;
    }
    &-auto {
      object-fit: auto;
    }
    &-fill {
      object-fit: fill;
    }
  }

  img {
    max-width: 100%;
  }

  .overflow {
    overflow: hidden;

    &-hidden {
      overflow: hidden !important;
    }

    &-x {
      overflow-x: hidden;
    }

    &-y {
      overflow-y: hidden;
    }
  }

  .menu-open {
    overflow: hidden;

    @media (min-width: calc(${theme.breakPoints.tab} + 1px)) {
      padding-right: 3px;
    }
  }

  /** ==  select__menu-portal == **/

  .select__menu-portal {
    z-index: 1060 !important;

    .select__menu {
      box-shadow: none;
      border-radius: 6px;
      border: 1px solid ${theme.color.grey[900]};
      background: ${theme.color.white['1000']};
      color: ${theme.color.black['900']};
      cursor: pointer;

      &-list {
        font-size: ${rem(12)};
        line-height: ${rem(18)};
        text-transform: uppercase;
        border-radius: 12px;
        box-shadow: none;

        .select__option {
          background-color: transparent;
          padding: ${rem(8)} ${rem(18)};
          position: relative;
          color: inherit;
          cursor: pointer;
          transition: 0.3s ease all;

          &:hover,
          &.select__option--is-selected {
            ${theme.fontFamily.semibold}
            color: ${theme.color.black['900']};
          }

          & + .select__option {
            border-top: 1px solid ${theme.color.grey[900]};
          }

          &.price-select {
            transition: 0.3s ease all;
            padding: ${rem(12)} ${rem(15)};

            span {
              ${theme.fontFamily.semibold}
            }

            &:hover,
            &.select__option--is-selected {
              &::after {
                content: '';
                position: absolute;
                top: 5px;
                left: 0;
                height: calc(100% - 10px);
                width: calc(100% - 10px);
                margin-left: 5px;
                background-color: ${theme.color.grey[600]};
                z-index: -1;
                border-radius: 20px;
              }
            }
          }
        }
      }

      &.variants {
        &-opt {
          border-radius: 20px;
          overflow: hidden;

          .select__menu-list {
            margin: 0 auto;
            width: 96%;

            .select__option {
              &:hover,
              &.select__option--is-selected {
                &::after {
                  content: '';
                  position: absolute;
                  top: 5px;
                  left: 0;
                  height: calc(100% - 10px);
                  width: 100%;
                  background-color: ${theme.coreColor.primary.default
                    .background};
                  z-index: -1;
                  border-radius: 20px;
                }
              }
            }
          }
        }
      }

      &.org-select-field {
        min-width: 200px;
        right: 0;
        background: ${theme.color.white[900]};
      }

      &.price-select {
        font-size: ${rem(12)};

        &.price-select-field {
          @media (min-width: calc(${theme.breakPoints.mobile} + 1px)) {
            min-width: calc(100% + 68px + 5px);
          }
        }
      }

      &.country {
        min-width: 200px;
      }
    }
  }

  .loader-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${transparentize(0.5, theme.color.grey[300])};
    z-index: 1;
  }

  /* nshift popup start */

  .nshift-popup-container {
    .nshift-pickup-points-popup {
      max-width: 80%;
      max-height: 80%;
      min-height: 65%;
      color: ${theme.coreColor.body.default.color} !important;

      @media (max-width: ${theme.breakPoints.tab}) {
        max-width: 95%;
      }

      .nshift-pickup-points-popup-title {
        ${theme.fontFamily.semibold};

        button {
          span {
            svg {
              width: 18px;
              height: 18px;
            }
          }
        }
      }

      .nshift-list-column {
        .nshift-list-container {
          ul {
            li {
              transition: 0.3s ease all;
              padding: ${rem(12)};

              .nshift-pickup-point-list-label {
                cursor: pointer;

                .nshift-pickup-point-list-item-header {
                  margin-bottom: ${rem(8)};
                }

                .nshift-input-radio {
                  .nshift-input-radio-overlay1 {
                    border-color: ${theme.color.grey[700]};
                    box-shadow: none;
                  }
                }

                .nshift-pickup-point-list-text {
                  .nshift-pickup-point-list-name {
                    color: ${theme.coreColor.body.default.color};
                    font-size: ${rem(14)};
                    line-height: $[rem(18)];
                  }
                }

                .nshift-pickup-point-list-item-address,
                .nshift-open-hours-toggle {
                  margin-left: ${rem(25)};
                }

                .nshift-folding-block {
                  height: 100%;

                  & > div {
                    margin: 0 20px;
                  }

                  table {
                    tr {
                      td {
                        padding: 5px;
                      }
                    }
                  }
                }
              }

              .nshift-input-radio {
                width: 16px;
                height: 16px;
                min-width: 16px;
                min-height: 16px;
              }

              &.nshift-active {
                .nshift-input-radio {
                  .nshift-input-radio-overlay1 {
                    .nshift-input-radio-overlay2 {
                      transform: scale(2.7);
                      background: ${theme.coreColor.primary.default.background};
                    }
                  }
                }
              }
            }
          }
        }

        .nshift-list-actions {
          padding: ${rem(15)};

          button {
            background: ${theme.coreColor.primary.default.background};
            color: ${theme.coreColor.primary.default.color};
            border-radius: 0;
          }
        }
      }
    }
  }

  /* nshift popup start */

  .order-print-wrapper {
    padding: ${rem(50)} ${rem(15)};
    margin: ${rem(10)};
    height: 100vh;
    background-color: #fff;

    .item-table {
      padding: ${rem(25)} 0;
    }

    table {
      border-bottom: 1px solid #000;

      th,
      td {
        text-align: left;
        padding: ${rem(5)};
      }
    }

    .total-order-wrapper {
      max-width: 50%;
      margin-left: auto;
    }
  }

  /* width */
  ::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }

  ::-webkit-scrollbar:hover {
    width: 20px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    width: 2px;
    background: ${theme.color.grey[900]};
    background-color: #ebebeb;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${theme.color.black[800]};
    background-color: #c4c4c4;
    border-radius: 20px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.coreColor.body.default.color};
  }
`}
 `;
export default GlobalStyles;
