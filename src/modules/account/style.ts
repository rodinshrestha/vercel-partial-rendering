'use client';
import { rem } from 'polished';
import styled from 'styled-components';
import { css } from 'styled-components';

export const StyledSection = styled.section`
  ${({ theme }) => css`
    position: relative;

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      z-index: 0;
      left: 0;
      position: absolute;
      background-size: cover;
      background-repeat: no-repeat;
      opacity: 0.5;
      background-position: top left;
      top: 0;

      @media (max-width: ${theme.breakPoints.mobile}) {
        background-size: contain;
        top: 100px;
      }
    }

    .page-title {
      position: relative;
      margin-left: ${rem(25)};
      margin-right: ${rem(40)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        margin-left: ${rem(25)};
        margin-right: ${rem(25)};
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        margin-left: ${rem(10)};
        margin-right: ${rem(10)};
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        margin-left: 0;
        margin-right: 0;
      }

      .back-btn-wrapper {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);

        .link-btn {
          svg {
            width: 24px;
            height: 24px;
            transform: rotate(-180deg);
          }
        }
      }

      h1 {
        padding: 0 ${rem(32)};
      }
    }

    & > .container-fluid,
    & > .container {
      position: relative;
      z-index: 3;
    }
  `}
`;

export const ContentArea = styled.div`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.coreColor.body.default.color};
    margin: 0 ${rem(40)};
    padding-top: ${rem(25)};
    min-height: calc(100vh - 103px - 54px - 48px - 75px);

    @media (max-width: ${theme.breakPoints.tablet}) {
      margin: 0 ${rem(25)};
    }

    @media (max-width: ${theme.breakPoints.tab}) {
      margin: 0 ${rem(10)};
    }
  `}
`;
