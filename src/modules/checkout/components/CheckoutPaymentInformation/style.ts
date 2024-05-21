import { rem } from 'polished';
import styled from 'styled-components';
import { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    position: relative;
    background-color: ${theme.coreColor.light.default.background};
    border-radius: ${theme.radius};
    padding-bottom: ${rem(50)};
  `}
`;
