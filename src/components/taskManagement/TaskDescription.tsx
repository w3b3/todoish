import { Task } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
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
          color={"secondary"}
        />
        <Typography
          display={"inline"}
          color={"secondary"}
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
    <Grid>
      <Typography
        variant={"subtitle1"}
        style={{
          fontWeight: "bold",
          borderBottom: "3px solid white",
          color: "white",
          textShadow: "0 0 6px black",
        }}
      >
        {entry.name.split(" ")[0]}
      </Typography>
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
    </Grid>
  );
}
