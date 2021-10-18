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
      backgroundImage: ({ task }: TaskStyleProps) =>
        task.tags.includes("favorite")
          ? "linear-gradient(43deg,#58d041 0%,#50c8c0 46%,#70ffcc 100%)"
          : "none",
      border: "1px solid",
      borderColor: ({ task }: TaskStyleProps) =>
        task.tags.includes("favorite") ? "white" : "#222",
      borderRadius: "4px",
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
  // const [isFocused, setIsFocused] = useState(false);
  return (
    <article
      className={classes.article}
      key={task.id}
      // onMouseOver={() => setIsFocused(true)}
      // onMouseLeave={() => setIsFocused(false)}
    >
      {/*{isFocused && <i className="fas fa-arrow-circle-right" />}*/}
      {children}
    </article>
  );
};
