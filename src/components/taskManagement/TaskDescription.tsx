import { Task } from "../../types/types";
import React, { useContext, useEffect, useState } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import {
  Box,
  Button,
  CircularProgress,
  createStyles,
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
      // cursor: "pointer",
      textTransform: "uppercase",
      padding: "0 0.5em 0 0.25em",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      textDecoration: "underline",
      fontWeight: "bold",
      // backgroundColor: "rgba(255, 255, 255, 0.15)",
    },
    bodyFont: {
      // fontFamily: "Rampart One",
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
    header: {
      display: "flex",
      alignItems: "space-between",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      flexWrap: "nowrap",
    },
  })
);

export function TaskDescription({ entry }: { entry: Task }) {
  const { isEditing, addKeyword, setCurrentFilter } =
    useContext(AppSettingsContext);
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
    <>
      <Box className={styles.header}>
        <Button
          variant={"text"}
          className={styles.keywordFont}
          onClick={() => setCurrentFilter(cardKeyword)}
        >
          {cardKeyword ?? "None"}
        </Button>
        <TaskDate entry={entry} />
        <CountdownModal options={{ cardKeyword, cardBody: entry.name }} />
      </Box>
      <Typography id={`task${entry.id}`} className={styles.bodyFont}>
        {cardBody ?? "None"}
      </Typography>
    </>
  );
}
