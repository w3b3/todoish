import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { PropsWithChildren, useContext } from "react";
import { EditMode, Task } from "../../types/types";
import AppSettingsContext from "../../context/appSettingsContext";

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
      width: `25%`,
      boxShadow:
        "-0.0075em 0.0075em 0 rgba(58,30,99, 0.94),\n" +
        "  0.005em 0.005em 0 rgba(58,30,99, 0.6),\n" +
        "  0.01em 0.01em 0 rgba(58,30,99, 0.62),\n" +
        "  0.015em 0.015em rgba(58,30,99, 0.64),\n" +
        "  0.02em 0.02em 0 rgba(58,30,99, 0.66),\n" +
        "  0.025em 0.025em 0 rgba(58,30,99, 0.68),\n" +
        "  0.03em 0.03em 0 rgba(58,30,99, 0.70),\n" +
        "  0.035em 0.035em 0 rgba(58,30,99, 0.72)",
      backgroundColor: "rgb(211 211 211 / 70%)",
      // backgroundColor: ({ task, order }: TaskStyleProps) =>
      //   colorPositionInArray(order).base,
      // backgroundImage: ({ task, order }: TaskStyleProps) =>
      //   colorPositionInArray(order).gradient,
      [breakpoints.down("md")]: {
        width: "calc(45% - 1%)",
      },
      [breakpoints.down("xs")]: {
        width: "100%",
        maxWidth: "100%",
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
