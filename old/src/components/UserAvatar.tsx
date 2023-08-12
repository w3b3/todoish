import React from "react";
import { Box, createStyles, makeStyles, Theme, Avatar } from "@material-ui/core";

const styles = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    logo: {
      height: "50%",
    },
  })
);

export function UserAvatar() {
  const style = styles();
  return (
    <Box>
      <Avatar
        className={style.logo}
        src="avatar-gold.jpeg"
        alt="kind of a TODO app"
      />
      {/*<i className="fas fa-bars" />*/}
    </Box>
  );
}
