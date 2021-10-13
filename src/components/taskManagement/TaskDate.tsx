import { Task } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { Box, createStyles, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: { backgroundColor: "rgba(255, 255, 255, 0.15)", flex: 1 },
    font: { whiteSpace: "nowrap" },
  })
);

export function TaskDate({ entry }: { entry: Task }) {
  const { locale } = useContext(AppSettingsContext);
  const styles = useStyles();
  if (entry.isDone) {
    return null;
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      className={styles.root}
    >
      <Typography className={styles.font}>
        <i className="fas fa-calendar-alt" />
        {new Intl.DateTimeFormat(locale, {
          // weekday: "short",
          month: "numeric",
          day: "numeric",
        }).format(new Date(entry.lastUpdateTime || entry.creationTime))}
      </Typography>
    </Box>
  );
}
