'use client';

import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const OrderDetailsWrap = styled.div`
  ${({ theme }) => css`
    /* border-top: 1px solid ${theme.coreColor.body.default.color};
    padding-top: ${rem(20)}; */
    max-width: 650px;

    @media (max-width: ${theme.breakPoints.tab}) {
      max-width: 100%;
    }

    .order-table {
      .order-table-wrapper {
        .order-content {
          margin: 0 -15px;

          @media (max-width: ${theme.breakPoints.mobile}) {
            min-width: 80px;
            margin: 0 -12px;
          }
        }
      }
    }

    .btn-wrapper {
      display: flex;
      flex-direction: column;
      row-gap: ${rem(15)};
      align-items: flex-end;
      justify-content: flex-end;
      margin-top: ${rem(20)};

      @media print {
        display: none;
      }

      button,
      a {
        text-decoration: underline;
        margin-right: 0;               
    }

    .order-table-wrapper {
      .order-content {
        .order-col {
          padding: 0;
        }
      }
    }
  `}
`;
