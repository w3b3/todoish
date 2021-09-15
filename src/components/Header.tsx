import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { PropsWithChildren } from "react";

const HeaderStyles = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    root: {
      height: "clamp(5vh, 80px, 20vh)",
      textAlign: "center",
      position: "sticky",
      left: 0,
      top: 0,
      backgroundColor: "#FDD401",
      borderBottom: "1px solid rgb(51 51 51 / 28%)",
      boxShadow: "0 -15px 25px rgb(51 51 51)",
      zIndex: 100,
      [breakpoints.down("sm")]: {},
    },
    containerOverride: {
      height: "inherit",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
    },
  })
);

export const Header = ({ children }: PropsWithChildren<any>) => {
  const headerStyles = HeaderStyles();

  return (
    <header className={headerStyles.root}>
      <Container classes={{ root: headerStyles.containerOverride }}>
        {children}
      </Container>
    </header>
  );
};
