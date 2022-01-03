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
        boxShadow: "0 0 4px 0 #000",
        border: "3px solid crimson",
      },
      display: ({ task, isEditing }: TaskStyleProps) =>
        isEditing.isEditing && task.id !== isEditing.id ? "none" : "flex",
      flexDirection: "column",
      // marginTop: spacing(1),
      marginBottom: spacing(1),
      padding: theme.spacing(1),
      border: ({ task }: TaskStyleProps) =>
        task.tags.includes("favorite")
          ? "3px solid hotpink"
          : "3px solid transparent",
      boxShadow: "0 0 4px 0 #999",
      maxWidth: "100%",
      // width: "43%",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      backgroundImage: "linear-gradient(0deg,#eee 0%,#ddd 100%)",

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
