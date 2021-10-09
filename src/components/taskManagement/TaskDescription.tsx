import { Task } from "../../types/types";
import React, { useContext, useEffect, useState } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { ExclusionMessages } from "./ExclusionMessages";
import { CountdownModal } from "../CountdownModal";

export function TaskDescription({ entry }: { entry: Task }) {
  const { isEditing, addKeyword } = useContext(AppSettingsContext);
  const [parts, setParts] = useState<string[] | null>(null);
  const [cardBody, setCardBody] = useState<string>("");
  const [cardKeyword, setCardKeyword] = useState<string>("");
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
      <Grid container justifyContent={"space-between"}>
        <Typography
          variant={"subtitle1"}
          style={{
            cursor: "pointer",
            textTransform: "uppercase",
            backgroundColor: "rgba(250,30,99,0.25)",
            padding: "0 0.5em 0 0.25em",
            borderLeft: "5px solid red",
            display: "flex",
            alignItems: "center",
          }}
        >
          {cardKeyword ?? "None"}
        </Typography>
        <CountdownModal options={{ cardKeyword, cardBody }} />
      </Grid>
      <Typography
        id={`task${entry.id}`}
        style={{
          flex: 1,
          userSelect: "text",
          wordBreak: "break-word",
          fontSize: "1.5rem",
        }}
      >
        {cardBody ?? "None"}
      </Typography>
    </Grid>
  );
}
