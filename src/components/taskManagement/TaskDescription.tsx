import { Task } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { CircularProgress, Typography } from "@material-ui/core";
import { ExclusionMessages } from "./ExclusionMessages";

export function TaskDescription(entry: Task) {
  const { isEditing } = useContext(AppSettingsContext);

  if (entry.isDone) {
    return (
      <section
        style={{
          flex: 1,
          whiteSpace: "pre-wrap",
        }}
      >
        <CircularProgress
          variant={"indeterminate"}
          thickness={5}
          size={"2em"}
        />
        <Typography
          display={"inline"}
          color={"primary"}
          style={{ fontSize: "2em" }}
        >
          <ExclusionMessages />
        </Typography>
      </section>
    );
  }

  if (isEditing.isEditing) {
    return null;
  }

  return (
    <Typography
      id={`task${entry.id}`}
      style={{
        flex: 1,
        userSelect: "text",
        wordBreak: "break-word",
        fontSize: "2em",
      }}
    >
      {entry.name}
    </Typography>
  );
}
