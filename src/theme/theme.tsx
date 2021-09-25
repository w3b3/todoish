import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        label: {
          color: "hotpink",
        },
      },
    },
  },
} as any);

export { theme };
