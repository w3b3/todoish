import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const LogoStyles = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    logo: {
      height: "50%",
    },
  })
);

export function Logo() {
  const logoStyles = LogoStyles();
  return (
    <img
      className={logoStyles.logo}
      src="todoish-logos_transparent.png"
      alt="kind of a TODO app"
    />
  );
}
