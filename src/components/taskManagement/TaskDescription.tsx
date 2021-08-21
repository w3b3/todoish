import { Task } from "../../types/types";
import React from "react";

export function TaskDescription(entry: Task) {
  return (
    <p
      id={`task${entry.id}`}
      style={{
        flex: 1,
        padding: "0 1em",
        lineHeight: "2",
        textDecoration: entry.isDone ? "line-through" : "",
        color: entry.isDone ? "gray" : "black",
        userSelect: "text",
        wordWrap: "break-word",
        overflow: "hidden",
      }}
    >
      {entry.name}
    </p>
  );
}
