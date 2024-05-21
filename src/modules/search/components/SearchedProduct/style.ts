import { rem } from 'polished';
import styled from 'styled-components';
import { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.color.lightBrown['900']};
    padding-top: ${rem(10)};
    margin: ${rem(10)} 0;

    .suggested-product-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `}
`;
