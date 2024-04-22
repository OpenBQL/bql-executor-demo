import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { CustomTheme, RootThemes } from "./RootOptions";
import ColorOptions from "./ColorOptions";

type IMuiThemeProviderProps = {
  children: React.ReactNode;
};

const MuiThemeProvider: React.FC<IMuiThemeProviderProps> = ({ children }) => {
  const mode = "light";
  const colors = ColorOptions[mode];
  const theme = CustomTheme(colors, { mode, common: { ...colors } });
  const themes = createTheme({ ...RootThemes, ...theme });
  return (
    <ThemeProvider theme={themes}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
