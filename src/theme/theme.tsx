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
        backgroundColor: "red",
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

      // textPrimary: {
      //   backgroundColor: colors.amber[500],
      //   backgroundImage: "unset",
      //   color: "black",
      //   fontWeight: "bold",
      //   "&:hover": {
      //     backgroundColor: colors.amber[700],
      //     borderColor: colors.amber[900],
      //   },
      // },
      // textSecondary: {
      //   // backgroundColor: colors.indigo[500],
      //   backgroundColor: "white",
      //   backgroundImage: "none",
      //   // color: "ghostwhite",
      //   color: "gray",
      //   "&:hover": {
      //     color: "black",
      //     backgroundColor: colors.amber[500],
      //     borderColor: colors.amber[700],
      //   },
      // },
    },
  },
} as ThemeOptions);

export { theme };
