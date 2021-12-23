import { Task } from "../../types/types";
import React, { useContext, useEffect, useState } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import {
  CircularProgress,
  createStyles,
  makeStyles,
  Typography,
  Container,
  Grid,
} from "@material-ui/core";
import { ExclusionMessages } from "./ExclusionMessages";
import { theme } from "../../theme/theme";
import { TaskDate } from "./TaskDate";

const useStyles = makeStyles(() =>
  createStyles({
    keywordFont: {
      textTransform: "uppercase",
    },
    bodyFont: {
      flex: 1,
      userSelect: "text",
      wordBreak: "break-word",
      display: "block",
      color: "#000",
    },
    body: {
      padding: theme.spacing(1),
    },
    doneWrapper: {
      flex: 1,
      whiteSpace: "pre-wrap",
    },
  })
);

export function TaskDescription({ entry }: { entry: Task }) {
  const { isEditing, addKeyword, setCurrentFilter } =
    useContext(AppSettingsContext);
  const styles = useStyles();

  if (entry.isDone) {
    return (
      <section className={styles.doneWrapper}>
        <CircularProgress
          variant={"indeterminate"}
          thickness={5}
          size={"1em"}
          color={"secondary"}
        />
        <Typography display={"inline"} color={"secondary"}>
          <ExclusionMessages />
        </Typography>
      </section>
    );
  }

  if (isEditing.isEditing) {
    return null;
  }

  return (
    <>
      <Grid container className={styles.body} justifyContent={"space-between"}>
        <TaskDate entry={entry} />
        <Typography color={"secondary"}>
          🏷{entry.name.split(" ")[0]}{" "}
        </Typography>
      </Grid>
      <Container>
        <Typography id={`task${entry.id}`} className={styles.bodyFont}>
          {entry.name ?? "None"}
        </Typography>
      </Container>
    </>
  );
}
