import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { PropsWithChildren } from "react";

const HeaderStyles = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between" /*TODO: center in mobile*/,
      alignItems: "center",
      flexWrap: "wrap",
      width: "100%",
      height: "clamp(50px, 10vh, 15vh)",
      textAlign: "center",
      position: "sticky",
      left: 0,
      top: 0,
      backgroundColor: "#FDD401",
      borderBottom: "1px solid rgb(51 51 51 / 28%)",
      boxShadow: "0 -15px 25px rgb(51 51 51)",
      zIndex: 100,
      padding: spacing(2),
      [breakpoints.down("sm")]: {
        // border: `${spacing(1)}px solid tomato`,
        padding: spacing(0),
      },
    },
    logo: {
      height: "50%",
    },
  })
);
export const Header = ({ children }: PropsWithChildren<any>) => {
  const headerStyles = HeaderStyles();

  return (
    <header className={headerStyles.root}>
      <img
        className={headerStyles.logo}
        src="todoish-logos_transparent.png"
        alt="kind of a TODO app"
      />
      {children}
    </header>
  );
};
