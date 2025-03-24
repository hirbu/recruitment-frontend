"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-space-sans)",
  },
  cssVariables: true,
});

export default theme;
