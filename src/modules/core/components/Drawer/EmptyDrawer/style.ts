import { rem } from 'polished';
import styled from 'styled-components';
import { css } from 'styled-components';

export const StyledDiv = styled.div`
  ${({ theme }) => css`
    text-align: center;
    padding: ${rem(40)} ${rem(30)};
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    gap: ${rem(20)};
    max-width: 450px;
    margin: 0 auto;

    .title {
      text-transform: uppercase;

      h6 {
        font-size: ${rem(16)};
        line-height: ${rem(22)};
        letter-spacing: ${rem(1.6)};
      }
    }

    .description {
      font-size: ${rem(14)};
      max-width: 450px;

      a {
        margin-right: ${rem(5)};
        color: inherit;
      }

      .link-btn {
        text-decoration: underline;
        ${theme.fontFamily.semibold}
        cursor: pointer;

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  `}
`;
