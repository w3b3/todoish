import { Task } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";

export function TaskDescription(entry: Task) {
  const { isEditing } = useContext(AppSettingsContext);

  return isEditing.isEditing ? null : (
    <p
      id={`task${entry.id}`}
      className={"TaskDescription"}
      style={{
        flex: 1,
        padding: "0 1em",
        lineHeight: "2",
        textDecoration: entry.isDone ? "line-through" : "",
        color: entry.isDone ? "gray" : "black",
        userSelect: "text",
        wordWrap: "break-word",
        overflow: "hidden",
        maxWidth: "72ch",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {entry.name}
    </p>
  );
}
