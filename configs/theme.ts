"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-sans)",
  },
  cssVariables: true,
});

export default theme;
