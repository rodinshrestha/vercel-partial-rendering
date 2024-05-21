"use client";

import React from "react";

import { ThemeProvider } from "styled-components";

import { getTheme } from "@/theme/theme";

type Props = {
  children: React.ReactNode;
};

const StyleThemeProvider = ({ children }: Props) => {
  const theme = getTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default StyleThemeProvider;
