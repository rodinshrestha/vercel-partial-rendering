import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const AddressWrap = styled.div`
  ${({ theme }) => css`
    /* border-top: 1px solid ${theme.coreColor.body.default.color};
    padding-top: ${rem(20)}; */
    max-width: 650px;

    @media (max-width: ${theme.breakPoints.tab}) {
      max-width: 100%;
    }
  `}
`;

export const AddressFormWrap = styled.div`
  ${({ theme }) => css`
    /* border-bottom: 1px solid ${theme.coreColor.body.default.color}; */
    /* margin-bottom: ${rem(40)}; */
    padding-bottom: ${rem(40)};

    .form-title {
      padding-bottom: ${rem(10)};
      margin-bottom: ${rem(15)};
      border-bottom: 1px solid ${transparentize(0.5, theme.color.grey[900])};

      h6 {
        font-size: ${rem(14)};
        line-height: ${rem(18)};
        letter-spacing: ${rem(1.4)};
        text-transform: uppercase;
      }
    }

    .form-row {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10px;

      .col {
        &-full {
          flex: 0 0 100%;
          padding: 0 ${rem(10)};
        }

        &-half {
          flex: 0 0 50%;
          padding: 0 ${rem(10)};

          @media (max-width: calc(${theme.breakPoints.mobile})) {
            flex: 0 0 100%;
          }
        }
      }

      .custom-select {
        margin-bottom: ${rem(40)};

        @media (max-width: calc(${theme.breakPoints.mobile})) {
          margin-bottom: ${rem(20)};
        }

        .basic-select {
          .select__control {
            padding: 0;

            input {
              background: 0px center !important;
            }
          }
        }
      }

      .form-text {
        margin-top: ${rem(35)};
        margin-bottom: ${rem(15)};
        font-size: ${rem(14)};
        line-height: ${rem(20)};
      }
    }

    label {
      display: block;
    }

    .input-field {
      margin-bottom: ${rem(40)};

      @media (max-width: calc(${theme.breakPoints.mobile})) {
        margin-bottom: ${rem(20)};
      }
    }

    .btn-wrapper {
      text-align: right;

      .link-btn {
        justify-content: flex-end;
      }
    }
  `}
`;
