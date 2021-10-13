import { Task } from "../../types/types";
import React, { useContext, useEffect, useState } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import {
  CircularProgress,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ExclusionMessages } from "./ExclusionMessages";
import { CountdownModal } from "../CountdownModal";
import { theme } from "../../theme/theme";
import { TaskDate } from "./TaskDate";

const useStyles = makeStyles(() =>
  createStyles({
    keywordFont: {
      cursor: "pointer",
      textTransform: "uppercase",
      backgroundColor: "rgba(250,30,99,0.25)",
      padding: "0 0.5em 0 0.25em",
      borderLeft: "5px solid red",
      display: "flex",
      alignItems: "center",
    },
    bodyFont: {
      flex: 1,
      userSelect: "text",
      wordBreak: "break-word",
      fontSize: "1.5rem",
      padding: theme.spacing(2),
    },
    doneWrapper: {
      flex: 1,
      whiteSpace: "pre-wrap",
    },
  })
);

export function TaskDescription({ entry }: { entry: Task }) {
  const { isEditing, addKeyword } = useContext(AppSettingsContext);
  const [parts, setParts] = useState<string[] | null>(null);
  const [cardBody, setCardBody] = useState<string>("");
  const [cardKeyword, setCardKeyword] = useState<string>("");
  const styles = useStyles();
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
      <section className={styles.doneWrapper}>
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
    <Grid>
      <Grid container justifyContent={"space-between"} alignItems={"stretch"}>
        <Typography variant={"subtitle1"} className={styles.keywordFont}>
          {cardKeyword ?? "None"}
        </Typography>
        <TaskDate entry={entry} />
        <CountdownModal options={{ cardKeyword, cardBody: entry.name }} />
      </Grid>
      <Typography id={`task${entry.id}`} className={styles.bodyFont}>
        {cardBody ?? "None"}
      </Typography>
    </Grid>
  );
}
