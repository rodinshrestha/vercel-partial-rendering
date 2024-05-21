import { rem, transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    position: relative;
    background-color: ${theme.coreColor.light.default.background};
    border-radius: ${theme.radius};

    .form-title {
      margin-bottom: ${rem(35)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        margin-bottom: ${rem(20)};
      }
    }

    .title {
      border-bottom: 1px solid ${transparentize(0.3, theme.color.grey[900])};
      border-bottom: 1px solid
        ${transparentize(0.3, theme.coreColor.body.default.color)};
      padding-bottom: ${rem(10)};
      margin-bottom: 12px;
    }

    .shipping-form {
      max-width: 85%;
      max-width: 100%;
      margin: 0 auto;

      @media (max-width: ${theme.breakPoints.tab}) {
        max-width: 100%;
      }

      .field-row {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -10px;
        padding: 0 ${rem(25)};

        @media (max-width: ${theme.breakPoints.tablet}) {
          padding: 0 ${rem(15)};
        }

        @media (max-width: ${theme.breakPoints.tab}) {
          padding: 0 ${rem(20)};
        }

        @media (max-width: ${theme.breakPoints.mobile}) {
          padding: 0 ${rem(10)};
          display: block;
        }

        .field-col {
          padding: 0 ${rem(10)};
          margin-bottom: ${rem(40)};

          .field-wrap {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            align-items: flex-end;
            max-width: 50%;

            @media (max-width: ${theme.breakPoints.mobile}) {
              max-width: 100%;
            }
          }

          .custom-select {
            .select__control {
              padding: 0;
            }
          }

          &.col-12 {
            flex: 0 0 100%;
          }

          &.col-6 {
            flex: 0 0 50%;
          }
        }
        .email-info-wrapper {
          margin-left: ${rem(5)};
          margin-top: ${rem(8)};
          font-size: ${rem(12)};
          line-height: ${rem(14)};
          display: flex;
          gap: ${rem(5)};

          span {
            flex: 0 0 70%;
          }

          a {
            text-decoration: underline;
            font-size: ${rem(12)};
            flex: 0 0 30%;
          }
        }
      }
    }
  `}
`;
