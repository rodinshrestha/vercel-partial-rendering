'use client';
import React from 'react';

import styled from 'styled-components';

import Loader from '..';

const FullPageLoader = () => {
  return (
    <StyledSection>
      <Loader color="primary" type="spinner" size="30px" />
    </StyledSection>
  );
};

export default FullPageLoader;

const StyledSection = styled.section`
  position: relative;
  height: calc(100vh - 60px);
  width: 100%;
`;
