"use client";
import React from "react";

import Loader from "@/core/components/Loader";

import { StyledDiv } from "./style";

const SearchSuspenseLoader = () => {
  return (
    <StyledDiv>
      <Loader type="spinner" color="primary" size="20px" />
    </StyledDiv>
  );
};

export default SearchSuspenseLoader;
