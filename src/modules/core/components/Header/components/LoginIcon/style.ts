import styled, { css } from "styled-components";

export const StyledWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    line-height: 0;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        span.icon {
          .loader-wrap {
            .spinner {
              border-top-color: ${theme.color.white[1000]};
              border-left-color: ${theme.color.white[1000]};
            }
          }
        }
      }
    }

    .icon {
      display: flex;
      align-items: center;
    }

    .user-name {
      @media (max-width: ${theme.breakPoints.tablet}) {
        display: none;
      }
    }

    .menu-svg {
      display: none;

      @media (max-width: ${theme.breakPoints.tablet}) {
        display: block;
      }
    }
  `}
`;
