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
        boxShadow: "0 0 3px 0 #444",
        // border: "3px solid #ace",
        backgroundImage: "linear-gradient(0deg,#ccc 0%,#eee 100%)",
      },
      cursor: "pointer",
      display: ({ task, isEditing }: TaskStyleProps) =>
        isEditing.isEditing && task.id !== isEditing.id ? "none" : "flex",
      flexDirection: "column",
      // marginTop: spacing(1),
      marginBottom: spacing(2),
      padding: theme.spacing(1),
      backgroundImage: ({ task }: TaskStyleProps) =>
        task.tags.includes("favorite")
          ? "linear-gradient(90deg,#bcc 0%,#fff 100%)"
          : "linear-gradient(0deg,#ddd 0%,#eee 100%)",
      boxShadow: "0 0 5px 0 #888",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
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
