"use client";
import { createTheme } from "@mui/material";

export const GlobalTheme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#4D455D",
    },
    secondary: {
      main: "#E96479",
    },
  },
  typography: {
    fontFamily: "var(--font-notosans)",
  },
});
