'use client';

import React from 'react';

import { rem } from 'polished';
import styled, { css } from 'styled-components';

type Props = {
  title: string;
};
const SearchedTitle = ({ title }: Props) => {
  return <StyledH4>{title}</StyledH4>;
};

export default SearchedTitle;

const StyledH4 = styled.h4`
  ${({ theme }) => css`
    display: inline-block;
    margin-bottom: ${rem(12)};
    font-size: ${rem(14)};
    line-height: ${rem(22)};
    ${theme.fontFamily.semibold}
  `}
`;
