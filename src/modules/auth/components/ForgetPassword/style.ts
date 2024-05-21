import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const SuccessMessage = styled.div`
  ${({ theme }) => css`
    .success-msg {
      font-size: ${rem(20)};
      font-weight: 500;
      text-align: center;
      color: ${theme.color.black['200']};
    }

    .home-btn {
      margin-top: ${rem(20)};
    }
  `}
`;
