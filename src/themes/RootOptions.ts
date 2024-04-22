import type { PaletteOptions, ThemeOptions } from "@mui/material";
import { ComponentOptions } from "./ComponentOptions";
import { IThemeColor } from "./ColorOptions";

export const RootThemes: ThemeOptions = {
  ...ComponentOptions,
  typography: {
    fontFamily: "JetBrains Mono",
    button: {
      fontFamily: "JetBrains Mono",
    },
  },
  spacing: 1,
  breakpoints: {
    values: {
      xs: 0,
      sm: 641,
      md: 961,
      lg: 1281,
      xl: 1601,
    },
  },
};

export const CustomTheme = (
  colors: IThemeColor,
  extra?: PaletteOptions
): ThemeOptions => {
  return {
    palette: {
      ...extra,
      divider: colors.text,
      primary: {
        main: colors.body2,
        light: colors.body3,
        dark: colors.body2,
        contrastText: colors.text,
      },
      info: {
        main: colors.text,
        contrastText: colors.body2,
      },
      secondary: {
        main: colors.cyan,
        contrastText: colors.text,
      },
      success: {
        main: colors.green,
        contrastText: colors.body2,
      },
      warning: {
        main: colors.yellow,
        contrastText: colors.body2,
      },
      error: {
        main: colors.red,
        contrastText: colors.body2,
      },
    },
  };
};
