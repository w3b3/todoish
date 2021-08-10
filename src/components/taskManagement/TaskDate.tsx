import { Task } from "../../types";
import React from "react";

export function TaskDate(props: { input: Task }) {
  const { input: entry } = props;
  return (
    <div style={{ flex: 1, textAlign: "left" }}>
      <i className="fas fa-calendar-alt" />{" "}
      {new Intl.DateTimeFormat("pt-br", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(new Date(entry.lastUpdateTime || entry.creationTime))}
    </div>
  );
}
