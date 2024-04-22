import type { ThemeOptions } from "@mui/material";

const buildVar = function (name: string) {
  const NAMESPACE = "--so-";
  return `${NAMESPACE}${name}`;
};
export const ComponentOptions = {
  typography: {
    fontFamily: `"JetBrains Mono"`,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => {
        const common: any = theme.palette.common;
        const vars = Object.keys(common).reduce((prev: any, next: any) => {
          prev[buildVar(next)] = common[next];
          return prev;
        }, {});

        return {
          html: {
            ...vars,
            "@media (min-width: 0px)": {
              scrollPadding: "84px 0 0 0",
            },
            "@media (min-width: 960px)": {
              scrollPadding: "120px 0 0 0",
            },
          },
          body: {
            fontFamily: `"JetBrains Mono"`,
            color: common.text,
            background: "var(--so-body)",
          },
          a: {
            textDecoration: "none",
            color: "inherit",
          },
          picture: { display: "inline-flex" },
          input: {
            "&::placeholder": {
              color: "var(--so-text2) !important",
            },
            "&:-webkit-autofill, &:-webkit-autofill:focus": {
              transition: "background-color 600000s 0s, color 600000s 0s",
            },
          },
        };
      },
    },
    MuiContainer: {
      defaultProps: {
        disableGutters: true,
        maxWidth: "xl",
        sx: {
          px: {
            xs: 12,
            md: 40,
            lg: 80,
            xl: 0,
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontFamily: `"JetBrains Mono"`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 0,
          fontFamily: `"JetBrains Mono"`,
          textTransform: "capitalize",
        },
        outlinedPrimary: {
          border: "1px solid var(--so-text)",
          color: "var(--so-text)",
          "&:hover": {
            backgroundColor: "var(--so-body3)",
            border: "1px solid var(--so-text)",
          },
        },
        containedPrimary: {
          backgroundColor: "var(--so-body2)",
          "&:hover": {
            backgroundColor: "var(--so-body3)",
          },
        },
        textPrimary: {
          color: "var(--so-text)",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontFamily: `"JetBrains Mono"`,
        },
        root: {
          transition: "border ease-in .1s",
          "&.Mui-focused": {
            color: "var(--so-text)",
            borderColor: "var(--so-text)",
          },
          "&.Mui-error": {
            borderColor: "var(--so-red)",
            color: "var(--so-red)",
          },
          "&.MuiInputBase-multiline": {
            height: "auto",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          height: "44px",
          backgroundColor: "var(--so-body)",
          "&.Mui-focused": {
            border: "1px solid var(--so-text)",
          },
        },
        input: {
          WebkitTextFillColor: "var(--so-text) !important",
          display: "flex !important",
        },
        notchedOutline: {
          borderColor: "var(--so-border)",
          borderWidth: "1px !important",
        },
      },
    },
    MuiInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          padding: "12px",
          boxSizing: "border-box",
          backgroundColor: "var(--so-body)",
          color: "var(--so-text)",
          border: "1px solid var(--so-border)",
          gap: 10,
        },
      },
    },
    MuiFormLabel: {
      defaultProps: {
        focused: false,
      },
      styleOverrides: {
        root: {
          color: "var(--so-text)",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "var(--so-text)",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          border: "1px solid var(--so-text)",
          borderRadius: 0,
          background: "var(--so-body2)",
        },
      },
    },
  },
} as ThemeOptions;

export default ComponentOptions;
