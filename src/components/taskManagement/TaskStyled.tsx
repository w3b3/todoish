import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { PropsWithChildren, useContext } from "react";
import { EditMode, Task } from "../../types/types";
import AppSettingsContext from "../../context/appSettingsContext";
import { theme } from "../../theme/theme";

interface TaskStyleProps {
  task: Task;
  isEditing: EditMode;
}

const TaskStyle = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    article: {
      "&:hover": {
        border: ({ task }: TaskStyleProps) =>
          task.tags.includes("favorite")
            ? "10px solid hotpink"
            : "10px solid #555",
      },
      maxWidth: "75%",
      cursor: "pointer",
      display: ({ task, isEditing }: TaskStyleProps) =>
        isEditing.isEditing && task.id !== isEditing.id ? "none" : "flex",
      flexDirection: "column",

      marginBottom: spacing(2),
      padding: theme.spacing(1),
      border: ({ task }: TaskStyleProps) =>
        task.tags.includes("favorite") ? "10px solid pink" : "10px solid #BBB",

      boxShadow: "0 0 6px 2px #000",
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: "4px",
    },
  })
);

interface TaskProps {
  task: Task;
}

export const TaskStyled = ({
  task,
  children,
}: PropsWithChildren<TaskProps>) => {
  const { isEditing } = useContext(AppSettingsContext);
  const classes = TaskStyle({ task, isEditing });
  return (
    <article className={classes.article} key={task.id}>
      {children}
    </article>
  );
};
