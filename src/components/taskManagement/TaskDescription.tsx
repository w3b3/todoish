import { Task } from "../../types/types";
import React, { useContext, useEffect, useState } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { ExclusionMessages } from "./ExclusionMessages";

export function TaskDescription({ entry }: { entry: Task }) {
  const { isEditing, addKeyword } = useContext(AppSettingsContext);
  const [parts, setParts] = useState<string[] | null>(null);
  const [cardBody, setCardBody] = useState<string | null>(null);
  const [cardKeyword, setCardKeyword] = useState<string | null>(null);
  useEffect(() => {
    setParts(entry.name.split(" "));
  }, [entry]);

  useEffect(() => {
    if (parts) {
      setCardBody(
        parts
          .slice(1, parts.length)
          .filter((_, i) => i < 10)
          .join(" ")
          .concat(parts.length >= 10 ? " {✂}️" : "")
      );
      setCardKeyword(parts[0].split(":")[0]);
    }
  }, [parts]);

  useEffect(() => {
    if (cardKeyword) addKeyword(cardKeyword);
  }, [cardKeyword, addKeyword]);

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
          size={"1em"}
          color={"secondary"}
        />
        <Typography
          display={"inline"}
          color={"secondary"}
          style={{ fontSize: "1em" }}
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
    <Grid style={{ padding: "8px" }}>
      <Typography
        variant={"subtitle1"}
        style={{
          cursor: "pointer",
          fontWeight: 100,
          color: "rgba(0,0,0, 0.15)",
          textTransform: "uppercase",
          backgroundColor: "rgba(250,30,99,0.25)",
          padding: "0 0.5em 0 0.25em",
          borderLeft: "5px solid red",
          display: "inline-flex",
          textShadow:
            "-0.0075em 0.0075em 0 rgba(58,30,99, 0.94),\n" +
            "  0.005em 0.005em 0 rgba(58,30,99, 0.6),\n" +
            "  0.01em 0.01em 0 rgba(58,30,99, 0.62),\n" +
            "  0.015em 0.015em rgba(58,30,99, 0.64),\n" +
            "  0.02em 0.02em 0 rgba(58,30,99, 0.66),\n" +
            "  0.025em 0.025em 0 rgba(58,30,99, 0.68),\n" +
            "  0.03em 0.03em 0 rgba(58,30,99, 0.70),\n" +
            "  0.035em 0.035em 0 rgba(58,30,99, 0.72)",
        }}
      >
        {cardKeyword ?? "None"}
      </Typography>
      <Typography
        id={`task${entry.id}`}
        style={{
          flex: 1,
          userSelect: "text",
          wordBreak: "break-word",
          fontSize: "1em",
        }}
      >
        {cardBody ?? "None"}
      </Typography>
    </Grid>
  );
}
