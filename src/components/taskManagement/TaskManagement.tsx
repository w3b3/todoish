import React, {
  KeyboardEvent,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Locale } from "../../types/types";
import { addEntry } from "../../api/addEntry";
import { getAllEntries } from "../../api/getAllEntries";
import { deleteEntry } from "../../api/deleteEntry";
import { editEntry } from "../../api/editEntry";
import { TaskDescription } from "./TaskDescription";
import { TaskInput } from "./TaskInput";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";
import {
  Box,
  Button,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { TaskStyled } from "./TaskStyled";
import { TaskCountdown } from "./TaskCountdown";
import { TaskControls } from "./TaskControls";
import { theme } from "../../theme/theme";
import { findTask, useFilterEntry } from "../../utils";

export const TaskManagementStyles = makeStyles(
  ({ breakpoints, spacing }: Theme) =>
    createStyles({
      root: {
        padding: spacing(2),
        [breakpoints.down("sm")]: {
          padding: spacing(1),
        },
      },
      emptyWrapper: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      articlesWrapper: {
        minHeight: "50vh",
        display: "flex",
        // alignItems: "flex-start",
        flexWrap: "wrap",
        padding: spacing(1),
        [breakpoints.down("sm")]: {
          padding: 0,
          justifyContent: "center",
        },
      },

      containerRootOverride: {},

      tasksControlsWrapper: {
        marginTop: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        padding: spacing(1),
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        "& button:not(:first-child)": {
          marginLeft: theme.spacing(1),
        },
      },
    })
);

function ArticlesList({
  handleTypeTaskName,
  handleEnter,
  handleDelete,
}: {
  handleTypeTaskName: (event: any) => void;
  handleEnter: (event: any) => void;
  handleDelete: (id: string) => void;
}) {
  const taskManagementStyles = TaskManagementStyles();
  const { isEditing, taskList } = useContext(AppSettingsContext);
  return (
    <section className={taskManagementStyles.articlesWrapper}>
      {taskList &&
        taskList.filter(useFilterEntry).map((entry, i) => {
          return (
            <TaskStyled key={entry.id} task={entry} order={i}>
              <TaskDescription entry={entry} />

              {isEditing.isEditing && isEditing.id === entry.id && (
                <TaskInput
                  // handleAddTask={handleAddTask}
                  handleTypeTaskName={handleTypeTaskName}
                  handleEnter={handleEnter}
                  // taskName={taskName}
                />
              )}
              <TaskControls entry={entry} />
              {entry.isDone && (
                <TaskCountdown entry={entry} handleDelete={handleDelete} />
              )}
            </TaskStyled>
          );
        })}
    </section>
  );
}

export function TaskManagement() {
  const taskManagementStyles = TaskManagementStyles();
  const {
    locale,
    setLocale,
    toggleEditing,
    isEditing,
    keywords,
    taskName,
    setTaskName,
    taskList,
    setTaskList,
    setCurrentFilter,
    // currentFilter,
  } = useContext(AppSettingsContext);
  // const [internalKeywords, setInternalKeywords] = useState(keywords);
  const [totalNumberOfTasks, setTotalNumberOfTasks] = useState<number>(0);
  // const [apiPagination, setApiPagination] = useState<string>("");

  const handleEnter = (typeEvent: KeyboardEvent) => {
    if (typeEvent.key === "Enter") {
      handleAddTask();
    }
  };

  const handleTypeTaskName = (typeEvent: SyntheticEvent<HTMLInputElement>) => {
    //  Use this for field validation
    const target = typeEvent.target as HTMLInputElement;
    setTaskName(target.value);
  };

  const handleDelete = async (id: string) => {
    toggleEditing();
    setTaskName("");
    await deleteEntry(id);
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
    // setApiPagination(newList.pagination);
    setTotalNumberOfTasks(newList.tasks.length); //TEMPORARY SOLUTION - FLAKY SINCE ITS WITHOUT PAGINATION
  };

  const handleAddTask = async () => {
    if (!taskName) return;
    if (taskList && isEditing.isEditing) {
      const newTask = { ...findTask(isEditing.id, taskList)! };
      newTask.name = taskName;
      newTask.lastUpdateTime = new Date().valueOf();
      newTask.tags?.push("updated");
      await editEntry(newTask);
      toggleEditing();
    } else {
      await addEntry(taskName);
    }
    setTaskName("");
    const newList = await getAllEntries();
    if (newList && newList.tasks) {
      setTaskList(newList.tasks);
      // setApiPagination(newList.pagination);
      // setTotalNumberOfTasks(newList.rowCount); //DOES NOT WORK
      setTotalNumberOfTasks(newList.tasks.length); //TEMPORARY SOLUTION - FLAKY SINCE ITS WITHOUT PAGINATION
    }
  };

  useEffect(() => {
    getAllEntries().then((newList) => {
      if (newList && newList.tasks) {
        setTaskList(newList.tasks);
        setTotalNumberOfTasks(newList.tasks.length); //TEMPORARY SOLUTION - FLAKY SINCE ITS WITHOUT PAGINATION
        // setApiPagination(newList.pagination);
      }
    });
  }, [setTaskList]);

  const handleLocaleClick = () => {
    setLocale(locale === "pt-br" ? "en-us" : "pt-br");
  };
  if (totalNumberOfTasks === 0) {
    return (
      <Container classes={{ root: taskManagementStyles.containerRootOverride }}>
        {!isEditing.isEditing && (
          <TaskInput
            // handleAddTask={handleAddTask}
            handleTypeTaskName={handleTypeTaskName}
            handleEnter={handleEnter}
            // taskName={taskName}
          />
        )}
        <Box className={taskManagementStyles.emptyWrapper}>
          <Typography variant={"h1"} align={"center"}>
            {locale === Locale.BR
              ? STRINGS.EMPTY_LIST.pt
              : STRINGS.EMPTY_LIST.en}
          </Typography>
        </Box>
      </Container>
    );
  }
  return (
    <Container>
      <TaskInput
        // handleAddTask={handleAddTask}
        handleTypeTaskName={handleTypeTaskName}
        handleEnter={handleEnter}
        // taskName={taskName}
      />
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Typography display={"inline"}>
          <Box display={"flex"} whiteSpace={"nowrap"}>
            <i className="fas fa-tasks" />
            &nbsp;
            {`${
              locale === Locale.BR
                ? STRINGS.LIST_TITLE.pt
                : STRINGS.LIST_TITLE.en
            } (${totalNumberOfTasks})`}
          </Box>
        </Typography>
        <Box style={{ display: "flex", flexWrap: "wrap" }}>
          {keywords.size > 0 ? (
            <>
              {Array.from(keywords.values()).map((e, i) => (
                <Box
                  marginLeft={1}
                  marginRight={1}
                  fontWeight={"bold"}
                  display={"inline"}
                  key={`${e}${i}`}
                  style={{ cursor: "pointer" }}
                >
                  <Button
                    variant={"outlined"}
                    onClick={() => setCurrentFilter(e)}
                  >
                    {e.toUpperCase()}
                  </Button>
                </Box>
              ))}
              <Button
                variant={"outlined"}
                startIcon={<i className="far fa-window-close" />}
                onClick={() => setCurrentFilter(null)}
              >
                {locale === Locale.BR
                  ? STRINGS.CLEAR_FILTER.pt
                  : STRINGS.CLEAR_FILTER.en}
              </Button>
            </>
          ) : (
            <Typography>No filter yet</Typography>
          )}
        </Box>
      </Grid>
      <ArticlesList
        handleEnter={handleEnter}
        handleTypeTaskName={handleTypeTaskName}
        handleDelete={handleDelete}
      />
      <section style={{ display: "flex", alignItems: "center" }}>
        <Typography variant={"body1"}>
          {locale === Locale.BR
            ? STRINGS.LANGUAGE_SWITCHER.pt
            : STRINGS.LANGUAGE_SWITCHER.en}
        </Typography>

        <Button variant={"contained"} onClick={handleLocaleClick}>
          {locale}
        </Button>
      </section>
    </Container>
  );
}
