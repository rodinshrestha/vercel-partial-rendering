import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    /* border-top: 1px solid ${theme.coreColor.body.default.color};
    padding-top: ${rem(20)}; */
    margin-bottom: ${rem(20)};
    max-width: 650px;

    @media (max-width: ${theme.breakPoints.tab}) {
      max-width: 100%;
    }

    .coupon-card-block {
      display: flex;
      flex-wrap: wrap;
      row-gap: ${rem(15)};
      margin: 0 -10px;

      .btn-wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-top: ${rem(10)};
      }

      .coupon-card-item {
        flex: 0 0 33.333%;
        max-width: 33.33%;
        padding: 0 ${rem(10)};

        @media (max-width: ${theme.breakPoints.tablet}) {
          flex: 0 0 50%;
          max-width: 50%;
        }

        @media (max-width: ${theme.breakPoints.mobile}) {
          flex: 0 0 100%;
          max-width: 100%;
        }
      }
    }

    .coupon-card {
      display: flex;
      flex-wrap: wrap;
      border-radius: ${rem(15)};
      background-color: ${theme.coreColor.light.default.background};
      overflow: hidden;

      .img-wrapper {
        flex: 0 0 30%;
        position: relative;
        padding-top: 48.6%;

        img {
          object-fit: cover;
        }
      }

      .coupon-detail {
        flex: 0 0 70%;
        padding: ${rem(10)};
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h6 {
          font-size: ${rem(16)};
          line-height: ${rem(22)};
          text-transform: capitalize;
        }

        p {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: normal;
        }

        .coupon-code {
          display: inline-block;
          padding: ${rem(10)} ${rem(15)};
          background-color: ${theme.color.green[100]};
          border-radius: ${rem(30)};
          margin-bottom: ${rem(10)};
          min-width: ${rem(150)};
          text-align: center;
          font-size: ${rem(14)};
          line-height: ${rem(20)};
          text-transform: uppercase;
        }

        .redeemed {
          background-color: ${theme.color.red[100]};
          border-radius: ${rem(30)};
          padding: 0 ${rem(5)};
        }
      }
    }

    .no-data {
      opacity: 0.2;
    }
  `}
`;
