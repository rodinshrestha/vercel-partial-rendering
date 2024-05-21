'use client';
import React from 'react';

import { rem } from 'polished';
import styled, { css } from 'styled-components';

const Step = () => {
  return (
    <StepWrap>
      <ul>
        <li>
          <span>1</span>
        </li>
        <li>
          <span>2</span>
        </li>
        <li>
          <span className="icon-checkmark" />
        </li>
      </ul>
    </StepWrap>
  );
};

export default Step;

export const StepWrap = styled.div`
  ${({ theme }) => css`
    margin-top: ${rem(15)};

    ul {
      list-style: none;
      padding-left: 0;
      display: inline-flex;
      align-items: center;
      flex-wrap: wrap;
      position: relative;
      margin-bottom: 0;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 100%;
        height: 2px;
        background-color: ${theme.coreColor.primary.default.background};
      }

      li {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${theme.coreColor.primary.default.background};
        color: ${theme.coreColor.dark.default.color};
        position: relative;
        text-align: center;
        z-index: 1;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin-right: ${rem(20)};
        ${theme.fontFamily.semibold}

        &:last-child {
          margin-right: 0;
        }

        span {
          font-weight: 600;
        }
      }
    }
  `}
`;
