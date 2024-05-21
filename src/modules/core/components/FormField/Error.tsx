import React from 'react';

import styled from 'styled-components';

import { color } from '@/theme/color';

type ErrorProps = {
  message: string;
  className?: string;
};

const Error = ({ message, ...props }: ErrorProps) => {
  return (
    <StyledError className={(props.className, 'error-message')} {...props}>
      {message}
    </StyledError>
  );
};

export default Error;

export const StyledError = styled.div`
  color: ${color.red['400']};
  display: block;
  margin: 0;
`;
