'use client';

import React from 'react';

import styled, { css } from 'styled-components';
import clsx from 'clsx';

import useNavMenuStore from '../store/useNavMenuStore';

const Hamburger = () => {
  const { toggleNavMenuDrawer, navMenuDrawer } = useNavMenuStore();

  return (
    <StyledDiv
      className={clsx('hamburgerMenu action', {
        'is-active': navMenuDrawer,
      })}
      onClick={toggleNavMenuDrawer}
    >
      <span />
      <span />
      <span />
    </StyledDiv>
  );
};

export default Hamburger;

const StyledDiv = styled.div`
  ${({ theme }) => css`
    &.hamburgerMenu {
      position: relative;
      top: 0;
      cursor: pointer;
      display: inline-block;
      width: 18px;
      display: block;

      span {
        width: 100%;
        height: 2px;
        display: block;
        background-color: ${theme.color.black['800']};
        margin-bottom: 4px;
        transition: 0.3s ease all;
        border-radius: 3px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      &.is-active {
        span {
          &:nth-child(2) {
            opacity: 0;
          }

          &:nth-child(1) {
            transform: translateY(6px) rotate(45deg);
          }

          &:nth-child(3) {
            transform: translateY(-6px) rotate(-45deg);
          }
        }
      }
    }
  `};
`;
