import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { Box, TextField, Typography, useMediaQuery } from "@material-ui/core";
import { theme } from "../../theme/theme";
import Skeleton from "@material-ui/lab/Skeleton";
import { Locale } from "../../types/types";
import { STRINGS } from "../../strings/strings";
import { useFilterEntry } from "../../utils";
import { TaskStyled } from "./TaskStyled";
import { TaskDescription } from "./TaskDescription";
import { TaskControls } from "./TaskControls";
import { TaskCountdown } from "./TaskCountdown";
import { TaskManagementStyles } from "./TaskManagement";

function LoadingTask(props: { largerViewport: boolean }) {
  return (
    <Skeleton
      style={{
        // backgroundImage: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
        marginTop: theme.spacing(2),
        width: props.largerViewport ? "43%" : "100%",
        marginLeft: "1%",
        marginRight: "1%",
        borderRadius: "4px",
      }}
      variant={"rect"}
      height={184}
      animation={"pulse"}
    />
  );
}

export function ArticlesList({
  handleTypeTaskName,
  handleAddTask,
  handleDelete,
}: {
  handleTypeTaskName: (event: any) => void;
  handleAddTask: () => void;
  handleDelete: (id: string) => void;
}) {
  const taskManagementStyles = TaskManagementStyles();
  const { taskList, isEditing, locale } = useContext(AppSettingsContext);
  const isLargerViewport = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <section className={taskManagementStyles.articlesWrapper}>
      {taskList === null ? (
        new Array(10)
          .fill("", 0, 9)
          .map((_, i) => (
            <LoadingTask key={i} largerViewport={isLargerViewport} />
          ))
      ) : taskList.length === 0 ? (
        <Box className={taskManagementStyles.emptyWrapper}>
          <Typography variant={"h1"} align={"center"}>
            {locale === Locale.BR
              ? STRINGS.EMPTY_LIST.pt
              : STRINGS.EMPTY_LIST.en}
          </Typography>
        </Box>
      ) : (
        taskList.filter(useFilterEntry).map((entry) => {
          return (
            <TaskStyled key={entry.id} task={entry}>
              <TaskDescription entry={entry} />
              {isEditing.isEditing && isEditing.id === entry.id && (
                <TextField
                  variant={"outlined"}
                  multiline={true}
                  minRows={5}
                  maxRows={10}
                  defaultValue={entry.name}
                  onChange={handleTypeTaskName}
                />
              )}
              <TaskControls entry={entry} handleAddTask={handleAddTask} />
              {entry.isDone && (
                <TaskCountdown entry={entry} handleDelete={handleDelete} />
              )}
            </TaskStyled>
          );
        })
      )}
    </section>
  );
}
