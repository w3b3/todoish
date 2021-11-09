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
      textTransform: "uppercase",
    },
    bodyFont: {
      flex: 1,
      userSelect: "text",
      wordBreak: "break-word",
      minHeight: theme.spacing(8),
      display: "block",
      fontFamily: "Luckiest Guy",
      fontSize: "2em",
      textShadow: "-1px 2px 0px #000000",
      color: "#ffffff",
      mixBlendMode: "overlay",
      textAlign: "center",
      contain: "strict",
      lineHeight: "1.2em",
    },
    body: {
      padding: theme.spacing(3),
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
          variant={"contained"}
          className={styles.keywordFont}
          onClick={() => setCurrentFilter(cardKeyword)}
        >
          {cardKeyword ?? "None"}
        </Button>
        <TaskDate entry={entry} />
        <CountdownModal options={{ cardKeyword, cardBody: entry.name }} />
      </Box>
      <Box className={styles.body}>
        <Typography
          id={`task${entry.id}`}
          variant={"h1"}
          className={styles.bodyFont}
        >
          {cardBody ?? "None"}
        </Typography>
      </Box>
    </>
  );
}
