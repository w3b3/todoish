import { createTheme, ThemeOptions } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: colors.amber,
    secondary: colors.indigo,
  },
  typography: {
    fontFamily: ["Raleway", "sans-serif"].join(","),
  },
  overrides: {
    MuiButton: {
      root: {
        border: "4px solid white",
        "&:not(:first-child)": {
          marginLeft: "8px",
        },
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
