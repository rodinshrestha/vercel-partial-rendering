import { rem } from 'polished';
import styled, { css } from 'styled-components';

export const StyledSection = styled.section`
  ${({ theme }) => css`
    /* height: calc(100vh - 60px); */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .sucess-header {
      text-align: center;
      .title-block {
        margin-bottom: ${rem(50)};

        @media (max-width: ${theme.breakPoints.tablet}) {
          margin-bottom: ${rem(35)};
        }

        h1 {
          & + p {
            margin-top: ${rem(15)};
          }
        }
      }

      .detail-content {
        padding: 0 ${rem(15)};
        text-align: center;

        @media (max-width: ${theme.breakPoints.tablet}) {
          margin-bottom: ${rem(35)};
        }

        h1,
        h2,
        h3 {
          margin-bottom: 0;

          & + P {
            margin-top: ${rem(25)};
          }
        }

        p {
          margin-bottom: 0;

          & + P {
            margin-top: ${rem(20)};
          }
        }
      }
    }
  `}
`;

export const OrderDetailsButton = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(10)};
  justify-content: center;
  margin-top: ${rem(35)};
`;
