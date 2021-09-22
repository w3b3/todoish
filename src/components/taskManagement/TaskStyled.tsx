import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { PropsWithChildren, useContext } from "react";
import { EditMode, Task } from "../../types/types";
import AppSettingsContext from "../../context/appSettingsContext";
import { colorPositionInArray } from "../../utils";

interface TaskStyleProps {
  task: Task;
  isEditing: EditMode;
  order: number;
}

const TaskStyle = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    article: {
      display: ({ task, isEditing }: TaskStyleProps) =>
        isEditing.isEditing && task.id !== isEditing.id ? "none" : "flex",
      flexDirection: "column",
      margin: spacing(1),
      width: "calc(30% - 2em)",
      minHeight: ({ task }: TaskStyleProps) => (task.isDone ? "unset" : "35vh"),
      padding: spacing(2),
      backgroundColor: ({ task, order }: TaskStyleProps) =>
        task.isDone ? "#444" : colorPositionInArray(order),
      border: ({ task }: TaskStyleProps) =>
        task.tags.includes("favorite")
          ? "10px solid crimson"
          : "10px solid transparent",
      [breakpoints.down("md")]: {
        width: "calc(50% - 2em)",
        minHeight: "50vh",
        padding: spacing(1),
      },
      [breakpoints.down("sm")]: {
        width: `calc(100% - 5vw)`,
        minHeight: "65vh",
        padding: spacing(0),
      },
    },
  })
);

interface TaskProps {
  task: Task;
  order: number;
}

export const TaskStyled = ({
  task,
  order,
  children,
}: PropsWithChildren<TaskProps>) => {
  const { isEditing } = useContext(AppSettingsContext);
  const classes = TaskStyle({ task, isEditing, order });
  return (
    <article className={classes.article} key={task.id}>
      {children}
    </article>
  );
};
