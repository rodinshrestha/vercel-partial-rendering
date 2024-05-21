'use client';
import { rem } from 'polished';
import styled from 'styled-components';

export const StyledDiv = styled.div`
  .content-wrap {
    text-align: center;
    margin-bottom: ${rem(50)};

    h2 {
      margin-bottom: ${rem(15)};
    }

    p {
      margin-bottom: 0;

      & + P,
      & + a {
        margin-top: ${rem(15)};
      }
    }
  }
`;
