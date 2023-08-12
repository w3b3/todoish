import { Task } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import {
  CircularProgress,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ExclusionMessages } from "./ExclusionMessages";
import { theme } from "../../theme/theme";

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
      // color: "#000",
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    body: {
      padding: theme.spacing(0),
    },
    doneWrapper: {
      flex: 1,
      whiteSpace: "pre-wrap",
    },
  })
);

export function TaskDescription({ entry }: { entry: Task }) {
  const { isEditing } = useContext(AppSettingsContext);
  const styles = useStyles();

  if (entry.isDone) {
    return (
      <section className={styles.doneWrapper}>
        <CircularProgress
          variant={"indeterminate"}
          thickness={5}
          size={"1em"}
        />
        <Typography display={"inline"}>
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
      {/*<Grid container className={styles.body} justifyContent={"space-between"}>*/}
      {/*  <Typography>🏷{entry.name.split(" ")[0]} </Typography>*/}
      {/*  <TaskDate entry={entry} />*/}
      {/*</Grid>*/}
      <Typography id={`task${entry.id}`} className={styles.bodyFont}>
        {entry.name ?? "None"}
      </Typography>
    </>
  );
}
