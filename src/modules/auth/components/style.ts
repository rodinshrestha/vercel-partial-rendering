import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 50px);
  margin: auto;
  align-items: center;
  justify-content: center;

  .section-title {
    z-index: 1;
    position: relative;
    text-transform: uppercase;
  }
`;

export const FormWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.color.white['1000']};
    padding: ${rem(40)} ${rem(70)};
    width: 485px;
    max-width: 100%;
    margin: 0 auto;
    z-index: 1;
    position: relative;

    @media (max-width: ${theme.breakPoints.mobile}) {
      padding: ${rem(30)} ${rem(15)};
    }

    form {
      .input-field,
      .checkField {
        margin-bottom: ${rem(40)};

        input {
          padding: ${rem(5)} 0;
        }
      }

      .checkField {
        label {
          line-height: ${rem(18)};

          &:before {
            height: 14px;
            width: 14px;
          }

          &:after {
            height: 10px;
            width: 10px;
            top: 2px;
            left: 2px;
          }
        }
      }

      .form-row {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -10px;

        .form-col {
          padding: 0 ${rem(10)};

          &.half-col {
            flex: 0 0 50%;
          }
          &.full-col {
            flex: 0 0 100%;
          }
        }
      }
    }

    .btn-wrap,
    .link-wrap {
      text-align: center;
      line-height: 0;

      .loader-wrap {
        .spinner {
          width: 18px;
          height: 18px;
        }
      }
    }

    .link-wrap {
      display: flex;
      flex-direction: column;
      row-gap: ${rem(10)};
      margin-top: ${rem(50)};

      a {
        font-size: ${rem(10)};
        line-height: ${rem(12)};
        letter-spacing: ${rem(1)};
        text-transform: uppercase;
        text-decoration: underline;

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            opacity: 0.7;
          }
        }

        &.register-link {
          ${theme.fontFamily.light}
        }
      }
    }

    &.register-form,
    &.forget-password-wrapper {
      width: 671px;

      .link-wrap {
        margin-top: ${rem(15)};
      }
    }
  `}
`;

export const FormTitle = styled.div`
  ${() => css`
    margin-bottom: ${rem(30)};
    text-align: center;
    text-transform: uppercase;
  `}
`;
