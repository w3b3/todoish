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

        // border: "3px solid #ace",
        // backgroundImage: "linear-gradient(0deg,#ccc 0%,#eee 100%)",
      },
      maxWidth: "75%",
      cursor: "pointer",
      display: ({ task, isEditing }: TaskStyleProps) =>
        isEditing.isEditing && task.id !== isEditing.id ? "none" : "flex",
      flexDirection: "column",
      // marginTop: spacing(1),
      marginBottom: spacing(2),
      padding: theme.spacing(1),
      border: ({ task }: TaskStyleProps) =>
        task.tags.includes("favorite")
          ? "10px solid pink"
          : "10px solid #BBB",
      // backgroundImage: ({ task }: TaskStyleProps) =>
      //   task.tags.includes("favorite")
      //     ? "linear-gradient(90deg,#bcc 0%,#fff 100%)"
      //     : "linear-gradient(0deg,#ddd 0%,#eee 100%)",
      boxShadow: "0 0 6px 2px #000",
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: "4px",
      // backgroundColor: "#222",
      // color: "#bbb",
      // border: "3px solid black",
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
