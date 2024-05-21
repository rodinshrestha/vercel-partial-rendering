import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const SearchTitle = styled.section`
  ${({ theme }) => css`
    .tab-title {
      display: flex;
      gap: 25px;
      justify-content: center;
      align-items: center;
      margin-top: ${rem(35)};

      span {
        display: inline-block;
        ${theme.fontFamily.semibold}
        background-color: ${theme.coreColor.body.default.background};
        cursor: pointer;
        transition: 0.3s ease all;
        padding: ${rem(10)} ${rem(25)};
        border: 1px solid ${theme.coreColor.body.default.background};
        border-radius: ${theme.radius};

        &:hover,
        &.active {
          background-color: ${theme.color.green[100]};
          border-color: ${theme.color.green[200]};
        }

        &.disable,
        &.active {
          pointer-events: none;
        }

        &.disable {
          opacity: 0.5;
          position: relative;
        }
      }
    }
  `}
`;

export const StyledSection = styled.section`
  ${({ theme }) => css`
    .product-list-wrapper {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -8px;
      row-gap: 30px;
    }

    .active {
      ${theme.fontFamily.semibold};
    }

    .search-title {
      cursor: pointer;
    }
  `}
`;

export const CustomColWrap = styled.div`
  ${({ theme }) => css`
    &.custom-col-wrap {
      flex: 0 0 80%;
      max-width: 80%;

      @media (max-width: ${theme.breakPoints.tablet}) {
        flex: 0 0 75%;
        max-width: 75%;
      }

      @media (max-width: ${theme.breakPoints.tab}) {
        flex: 0 0 100%;
        max-width: 100%;
      }
    }
  `}
`;

export const StyledSearch = styled.div``;

export const TabContent = styled.div`
  .tab-title {
    text-align: center;
    margin-bottom: ${rem(25)};

    span {
      margin: 0 ${rem(10)};
    }
  }
`;

export const LoaderContainer = styled.div`
  position: relative;
  min-height: 50vh;
`;

export const StyleSection = styled.section`
  ${() => css`
    .search-not-found {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 166px);
    }
  `}
`;
