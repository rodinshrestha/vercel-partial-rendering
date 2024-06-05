import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    /* border-top: 1px solid ${theme.coreColor.body.default.color};
    padding-top: ${rem(20)}; */
    max-width: 650px;

    @media (max-width: ${theme.breakPoints.tab}) {
      max-width: 100%;
    }

    .form-wrap {
      max-width: 72%;

      @media (max-width: calc(${theme.breakPoints.tab})) {
        max-width: 100%;
        width: 100%;
      }

      .my-profile {
        .tab {
          padding: ${rem(10)} ${rem(20)};
          cursor: pointer;
          display: inline-block;
          position: relative;

          &.active {
            background-color: ${theme.coreColor.light.default.background};
            border-radius: 20px 20px 0 0;

            &::before {
              height: 40px;
            }
          }

          &::before {
            content: '';
            position: absolute;
            bottom: -20px;
            height: 0;
            left: 0;
            width: 100%;
            background-color: ${theme.coreColor.light.default.background};
            z-index: -1;
          }
        }
      }

      h4 {
        padding: 0 ${rem(10)};
        margin-bottom: ${rem(10)};
      }

      .profile-form {
        background-color: ${theme.coreColor.light.default.background};

        .form-row {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -8px;

          .col {
            &-half,
            &-full {
              flex: 0 0 100%;
              flex-grow: 1;
            }

            @media (min-width: calc(${theme.breakPoints.mobile} + 1px)) {
              &-full {
                flex: 0 0 100%;
                padding: 0 8px;
              }

              &-half {
                flex: 0 0 50%;
                padding: 0 8px;
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

        .input-field {
          margin-bottom: ${rem(15)};

          @media (max-width: calc(${theme.breakPoints.mobile})) {
            margin-bottom: ${rem(10)};
          }
        }

        .btn-wrapper {
          text-align: right;

          .link-btn {
            justify-content: flex-end;
          }
        }
      }
    }

    .tab-nav-wrap {
      display: inline-flex;
      align-items: center;

      .nav-item {
        cursor: pointer;
        transition: 0.3s ease all;

        span {
          ${theme.fontFamily.semibold}
          text-transform: uppercase;
          display: inline-block;
        }
      }
    }
  `}
`;

export const ContactInfoWrap = styled.div`
  ${({ theme }) => css`
    position: relative;
    border-bottom: 1px solid ${theme.coreColor.body.default.color};
    padding-bottom: ${rem(20)};
    margin-bottom: ${rem(20)};

    .contact-info-wrap {
      max-width: 90%;

      .info-content {
        p {
          ${theme.fontFamily.light}
        }
      }

      .contact-info-title {
        margin-bottom: ${rem(15)};

        @media (max-width: ${theme.breakPoints.mobile}) {
          margin-bottom: ${rem(20)};
        }

        h2 {
          font-size: ${rem(14)};
          line-height: ${rem(14)};
          letter-spacing: ${rem(1.4)};
          text-transform: uppercase;
        }
      }

      .contact-info-item {
        display: flex;
        flex-wrap: wrap;
        font-size: ${rem(14)};
        line-height: ${rem(14)};
        letter-spacing: ${rem(1.4)};

        span {
          ${theme.fontFamily.light}
          font-size: inherit;
          line-height: inherit;
          letter-spacing: inherit;

          &.info-title {
            flex: 0 0 10%;
            ${theme.fontFamily.regular}
          }
        }

        & + .contact-info-item {
          margin-top: ${rem(15)};
        }
      }
    }

    .btn-wrapper {
      position: absolute;
      bottom: 15px;
      right: 0;

      @media (max-width: ${theme.breakPoints.mobile}) {
        position: static;
        text-align: right;
        margin-top: ${rem(20)};
      }
    }
  `}
`;

export const UpdatedProfileFormWrap = styled.div`
  ${({ theme }) => css`
    h4 {
      padding: 0 ${rem(10)};
      margin-bottom: ${rem(10)};
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

          @media (max-width: ${theme.breakPoints.mobile}) {
            flex: 0 0 100%;
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
