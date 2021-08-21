import { Task } from "../../types/types";
import React from "react";

export function TaskDate({ entry }: { entry: Task }) {
  return (
    <div style={{ flex: 1, textAlign: "left" }}>
      <i className="fas fa-calendar-alt" />{" "}
      {new Intl.DateTimeFormat("pt-br", {
        // weekday: "short",
        month: "numeric",
        day: "numeric",
      }).format(new Date(entry.lastUpdateTime || entry.creationTime))}
    </div>
  );
}
