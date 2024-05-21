'use client';

import { rem, transparentize } from 'polished';
import styled from 'styled-components';
import { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    .search-list-outer {
      height: 100vh;
      width: 100vw;
      left: 0;
      top: 0;
      position: fixed;
      z-index: 2;
    }

    .search-list-wrapper {
      position: relative;
      width: 100%;
      min-height: 80px;
      max-height: calc(100vh - 50px - 40px - 60px - 30px);
      overflow: auto;
      scroll-behavior: smooth;
      z-index: 5;
      padding: 0 ${rem(20)};
      border-top: ${rem(15)} solid transparent;
      border-bottom: ${rem(15)} solid transparent;

      @media (max-width: ${theme.breakPoints.mobile}) {
        padding: 0;
        /* width: 100vw;
        margin-left: calc(50% - 50vw);
        margin-right: calc(50% - 50vw); */
        /* padding: 0 20px; */
        border: none;
        /* max-height: 250px; */
      }

      .search-not-found {
        padding: ${rem(20)};
      }
    }
  `}
`;

export const StyledLoaderDiv = styled.div`
  ${({ theme }) => css`
    min-height: 35vh;
    /* position: absolute; */
    position: relative;
    /* box-shadow: 0px 3px 6px ${transparentize(
      0.84,
      theme.color.black[1000]
    )}; */
    width: 100%;
    overflow: auto;
    scroll-behavior: smooth;
    z-index: 5;
    /* border-top-right-radius: 29px;
    border-top-left-radius: 29px; */
    padding: ${rem(30)} ${rem(15)};
    background-color: ${theme.color.white['1000']};
  `}
`;
