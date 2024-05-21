'use client';
import React from 'react';

import styled from 'styled-components';

import Loader from '@/core/components/Loader';

const CategoryProductLoader = () => {
  return (
    <StyledDiv>
      <Loader color="primary" type="spinner" />
    </StyledDiv>
  );
};

export default CategoryProductLoader;

const StyledDiv = styled.div`
  position: relative;
  height: 30rem;
`;
