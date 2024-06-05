import React from 'react';

import { rem } from 'polished';
import styled, { css } from 'styled-components';

const PageTitle = ({ title, tag }: { title: string; tag?: string }) => {
  return (
    <StyledDiv>
      <h3 className={tag}>
        <strong>{title}</strong>
      </h3>
    </StyledDiv>
  );
};

export default PageTitle;

const StyledDiv = styled.div`
  ${() => css`
    margin-bottom: ${rem(15)};
    text-transform: uppercase;
  `}
`;
