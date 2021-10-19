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
      marginTop: spacing(2),
      width: "43%",
      marginLeft: "1%",
      marginRight: "1%",
      backgroundImage: ({ task }: TaskStyleProps) =>
        task.tags.includes("favorite")
          ? "linear-gradient(43deg,#58d041 0%,#50c8c0 46%,#70ffcc 100%)"
          : "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
      borderRadius: "4px",
      [breakpoints.down("sm")]: {
        width: "100%",
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
