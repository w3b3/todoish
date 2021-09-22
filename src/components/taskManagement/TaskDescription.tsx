import { Task } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";

export function TaskDescription(entry: Task) {
  const { isEditing } = useContext(AppSettingsContext);

  return isEditing.isEditing ? null : (
    <section
      id={`task${entry.id}`}
      className={"TaskDescription"}
      style={{
        flex: 1,
        padding: "0 1em",
        lineHeight: "2",
        textDecorationLine: entry.isDone ? "line-through" : "none",
        textDecorationColor: "crimson",
        color: entry.isDone ? "gray" : "black",
        userSelect: "text",
      }}
    >
      {entry.name}
    </section>
  );
}
