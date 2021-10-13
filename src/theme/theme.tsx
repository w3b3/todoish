import { createTheme, ThemeOptions } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: colors.amber,
    secondary: colors.indigo,
  },
  typography: {
    fontFamily: ["Source Code Pro", "monospace"].join(","),
  },
  overrides: {
    MuiButton: {
      root: {
        border: "4px solid white",
      },
      outlinedPrimary: {
        color: "black",
        backgroundColor: "goldenrod",
        "&:hover": {
          color: "black",
        },
      },
      outlinedSecondary: {
        color: "ghostwhite",
        backgroundColor: "darkgray",
        "&:hover": {
          color: "black",
        },
      },
      text: {
        border: "none",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: colors.amber[700],
          borderColor: colors.amber[900],
        },
      },
    },
  },
} as ThemeOptions);

export { theme };
