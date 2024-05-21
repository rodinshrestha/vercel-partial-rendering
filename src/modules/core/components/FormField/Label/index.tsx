import React from 'react';

import styled, { css } from 'styled-components';
import { rem } from 'polished';

import { color } from '@/theme/color';

type LableProps = {
  text: string | React.ReactNode;
  className?: string;
  htmlFor?: string;
  before?: JSX.Element;
  after?: JSX.Element;
};

const Label = ({ text, before, after, ...props }: LableProps) => {
  return (
    <StyledLabel {...props}>
      {before ? <div className="label-before">{before}</div> : null}
      {text}
      {after ? <div className="label-after">{after}</div> : null}
    </StyledLabel>
  );
};

export default Label;

export const StyledLabel = styled.label`
  ${({ theme }) => css`
    ${theme.fontFamily.semibold}
    font-size: ${rem(12)};
    line-height: ${rem(16)};
    text-transform: uppercase;

    &.error {
      color: ${color.red['900']};
    }
  `}
`;
