import React, {
  KeyboardEvent,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Locale, Task } from "../../types/types";
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

      containerRootOverride: {
        // width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        [breakpoints.down("sm")]: {
          // padding: 0,
        },
      },

      tasksControlsWrapper: {
        marginTop: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        padding: spacing(1),
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      },
    })
);

function ArticlesList(props: {
  tasks: Task[];
  callbackfn: (entry: Task, i: number) => JSX.Element;
}) {
  const taskManagementStyles = TaskManagementStyles();

  return (
    <section className={taskManagementStyles.articlesWrapper}>
      {props.tasks && props.tasks.map(props.callbackfn)}
    </section>
  );
}

export function TaskManagement() {
  const taskManagementStyles = TaskManagementStyles();
  const { locale, setLocale, toggleEditing, isEditing, keywords } =
    useContext(AppSettingsContext);
  const [taskName, setTaskName] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>([]);
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

  const handleEdit = async (id: string) => {
    toggleEditing(id);
    setTaskName(
      taskList.find((e) => e.id === id)?.name ?? "N/A"
    ); /*N/A should never occur*/
  };

  const handleCancelEdit = () => {
    toggleEditing();
    setTaskName("");
  };

  const findTask = (id: string) => taskList.find((e) => e.id === id);

  const handleAddTask = async () => {
    if (!taskName) return;
    if (isEditing.isEditing) {
      const newTask = { ...findTask(isEditing.id)! };
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

  const handleDelete = async (id: string) => {
    toggleEditing();
    setTaskName("");
    await deleteEntry(id);
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
    // setApiPagination(newList.pagination);
    setTotalNumberOfTasks(newList.tasks.length); //TEMPORARY SOLUTION - FLAKY SINCE ITS WITHOUT PAGINATION
  };

  const handleFavorite = async (id: string) => {
    const newTask = { ...findTask(id)! };
    newTask.tags = newTask.tags.find((tag) => tag === "favorite")
      ? newTask.tags.filter((tag) => tag !== "favorite")
      : newTask.tags.concat("favorite");
    await editEntry(newTask);
    toggleEditing();
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
  };

  const handleComplete = async (id: string) => {
    const newTask = { ...findTask(id)! };
    newTask.isDone = true;
    newTask.tags = newTask.tags.filter((tag) => tag !== "favorite");
    newTask.lastUpdateTime = new Date().valueOf();
    await editEntry(newTask);
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
  };

  const handleRestore = async (id: string) => {
    const newTask = { ...findTask(id)! };
    newTask.isDone = false;
    newTask.lastUpdateTime = new Date().valueOf();
    await editEntry(newTask);
    toggleEditing();
    setTaskName("");
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
  };

  useEffect(() => {
    getAllEntries().then((newList) => {
      if (newList && newList.tasks) {
        setTaskList(newList.tasks);
        setTotalNumberOfTasks(newList.tasks.length); //TEMPORARY SOLUTION - FLAKY SINCE ITS WITHOUT PAGINATION
        // setApiPagination(newList.pagination);
      }
    });
  }, []);

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
            taskName={taskName}
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
        taskName={taskName}
      />

      <Typography>
        <i className="fas fa-tasks" />
        &nbsp;
        {`${
          locale === Locale.BR ? STRINGS.LIST_TITLE.pt : STRINGS.LIST_TITLE.en
        } (${totalNumberOfTasks})`}
      </Typography>
      <Grid>
        {keywords.map((e) => (
          <span key={e}>{e}</span>
        ))}
      </Grid>
      <ArticlesList
        tasks={taskList}
        callbackfn={(entry, i) => {
          return (
            <TaskStyled key={entry.id} task={entry} order={i}>
              <TaskDescription entry={entry} />

              {isEditing.isEditing && isEditing.id === entry.id && (
                <TaskInput
                  // handleAddTask={handleAddTask}
                  handleTypeTaskName={handleTypeTaskName}
                  handleEnter={handleEnter}
                  taskName={taskName}
                />
              )}
              <TaskControls
                entry={entry}
                handleDelete={handleDelete}
                handleRestore={handleRestore}
                handleFavorite={handleFavorite}
                handleComplete={handleComplete}
                handleCancelEdit={handleCancelEdit}
                handleEdit={handleEdit}
              />
              {entry.isDone && (
                <TaskCountdown
                  countdownAutoDelete={() => handleDelete(entry.id)}
                />
              )}
            </TaskStyled>
          );
        }}
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
