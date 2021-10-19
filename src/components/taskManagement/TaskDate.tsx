import { Task } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import {
  Box,
  createStyles,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { theme } from "../../theme/theme";

const useStyles = makeStyles(() =>
  createStyles({
    root: { flex: 1 },
    font: {
      "& > i": {
        marginRight: theme.spacing(0.5),
      },
    },
  })
);

export function TaskDate({ entry }: { entry: Task }) {
  const { locale } = useContext(AppSettingsContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
      <Typography className={styles.font} noWrap={true}>
        <i className="fas fa-calendar-alt" />
        {new Intl.DateTimeFormat(locale, {
          weekday: isMobile ? undefined : "short",
          month: isMobile ? "short" : "long",
          day: "2-digit",
        })
          .format(new Date(entry.lastUpdateTime || entry.creationTime))
          .toUpperCase()}
      </Typography>
    </Box>
  );
}
