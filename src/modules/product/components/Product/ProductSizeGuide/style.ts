import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    row-gap: ${rem(50)};
    max-width: 620px;
    margin: 0 auto;

    @media (max-width: ${theme.breakPoints.mobile}) {
      max-width: 100%;
    }

    .container,
    .container-fluid {
      max-width: 100%;
    }

    .text-content {
      text-align: center;
      padding: 0;
    }

    .banner {
      margin-top: ${rem(50)};

      .banner-wrapper {
        min-height: 370px;
      }
    }
  `}
`;

export const StyledLoader = styled.div`
  min-height: 5vh;
  position: relative;
`;
