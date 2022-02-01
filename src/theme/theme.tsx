import { createTheme, ThemeOptions } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {},
  typography: {},
  overrides: {
    MuiButton: {
      root: {},
      outlinedPrimary: {
        "&:hover": {},
      },
      outlinedSecondary: {
        "&:hover": {},
      },
      text: {
        "&:hover": {},
      },
    },
  },
} as ThemeOptions);

export { theme };
