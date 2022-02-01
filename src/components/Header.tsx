import {
  Grid,
  createStyles,
  makeStyles,
  Theme,
  Container,
} from "@material-ui/core";
import React, { PropsWithChildren } from "react";

const HeaderStyles = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      height: "clamp(5vh, 80px, 20vh)",
      padding: "0 1rem",
      textAlign: "center",
      position: "sticky",
      left: 0,
      top: 0,

      borderBottom: "1px solid rgb(51 51 51 / 28%)",

      zIndex: 100,
    },
  })
);

export const Header = ({ children }: PropsWithChildren<any>) => {
  const headerStyles = HeaderStyles();

  return (
    <Container>
      <Grid container className={headerStyles.root}>
        {children}
      </Grid>
    </Container>
  );
};
