'use client';
import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  width: 100%;
  transition: 0.3s ease all;

  &.disable {
    opacity: 0.3;
    pointer-events: none;
  }

  .accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.3s ease all;
    position: relative;
    cursor: pointer;

    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 0;
    }

    i {
      font-size: ${rem(14)};
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%) rotate(0deg);
      transition: 0.3s ease all;
    }
  }

  &.active {
    .accordion-header {
      margin-bottom: ${rem(10)};
    }
  }

  &.active &.gutter {
    margin: ${rem(20)} 0;
  }

  .accordion-content {
    overflow: hidden;

    table {
      font-size: ${rem(14)};
      line-height: ${rem(18)};

      tr {
        td {
          padding: ${rem(10)};

          h4,
          h5,
          h6 {
            font-size: inherit;
            line-height: inherit;
          }
        }
      }
    }
  }
`;

export const AccordionStyledTitle = styled.h3`
  ${({ theme }) => css`
    text-transform: capitalize;

    &.circle {
      position: relative;
      padding-left: ${rem(40)};

      &::before,
      &::after {
        content: '';
        position: absolute;
        border: 1px solid ${theme.coreColor.body.default.color};
        border-radius: 100%;
        transition: 0.3s ease all;
      }

      &::before {
        left: 0;
        top: 0;
        width: 20px;
        height: 20px;
        background-color: transparent;
      }

      &::after {
        width: 12px;
        height: 12px;
        background-color: ${theme.coreColor.body.default.color};
        top: 4px;
        left: 4px;
        opacity: 0;
        -webkit-transform: scale(0);
        transform: scale(0);
        padding: 1px;
      }

      &.circle-active {
        &::after {
          opacity: 1;
          -webkit-transform: scale(1.6);
          transform: scale(1.6);
          border-color: ${theme.coreColor.body.default.color};
        }
      }
    }
  `}
`;
