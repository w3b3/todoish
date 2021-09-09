import { Task } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";

export function TaskDate({ entry }: { entry: Task }) {
  const { locale } = useContext(AppSettingsContext);

  return (
    <div style={{ flex: 1, textAlign: "left" }}>
      <i className="fas fa-calendar-alt" />{" "}
      {new Intl.DateTimeFormat(locale, {
        // weekday: "short",
        month: "numeric",
        day: "numeric",
      }).format(new Date(entry.lastUpdateTime || entry.creationTime))}
    </div>
  );
}
