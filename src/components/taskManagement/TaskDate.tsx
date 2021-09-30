import { Task } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { Typography } from "@material-ui/core";

export function TaskDate({ entry }: { entry: Task }) {
  const { locale } = useContext(AppSettingsContext);

  if (entry.isDone) {
    return null;
  }

  return (
    <Typography style={{ flex: 1, whiteSpace: "nowrap" }}>
      <i className="fas fa-calendar-alt" />{" "}
      {new Intl.DateTimeFormat(locale, {
        // weekday: "short",
        month: "numeric",
        day: "numeric",
      }).format(new Date(entry.lastUpdateTime || entry.creationTime))}
    </Typography>
  );
}
