import { rem } from 'polished';
import styled from 'styled-components';
import { css } from 'styled-components';

export const StyledDiv = styled.header`
  ${({ theme }) => css`
    z-index: 3;
    background-color: ${theme.coreColor.header.default.background};

    .header-wrap {
      display: flex;
      justify-content: space-between;
      position: relative;
      padding: ${rem(10)} ${rem(20)};

      @media (max-width: ${theme.breakPoints.mobile}) {
        padding: ${rem(10)};
      }

      .logo {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    & + main {
      margin-top: 0;
    }
  `}
`;
