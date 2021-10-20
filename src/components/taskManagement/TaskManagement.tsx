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
  FormControlLabel,
  FormGroup,
  Grid,
  makeStyles,
  Switch,
  TextField,
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
        // minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        // alignItems: "flex-start",
        flexWrap: "wrap",
        marginTop: spacing(3),
        padding: spacing(1),
        [breakpoints.down("sm")]: {
          padding: 0,
        },
      },

      containerRootOverride: {},

      tasksControlsWrapper: {
        marginTop: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        // padding: spacing(1),
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
  handleAddTask,
  handleDelete,
}: {
  handleTypeTaskName: (event: any) => void;
  handleAddTask: () => void;
  handleDelete: (id: string) => void;
}) {
  const taskManagementStyles = TaskManagementStyles();
  const { taskList, isEditing } = useContext(AppSettingsContext);
  return (
    <section className={taskManagementStyles.articlesWrapper}>
      {taskList &&
        taskList.filter(useFilterEntry).map((entry, i) => {
          return (
            <TaskStyled key={entry.id} task={entry} order={i}>
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
        })}
    </section>
  );
}

function TaskSummary(props: {
  locale: string;
  totalNumberOfTasks: number;
  onClick: () => void;
}) {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Typography display={"inline"}>
        <i className="fas fa-tasks" />
        &nbsp;
        {`${
          props.locale === Locale.BR
            ? STRINGS.LIST_TITLE.pt
            : STRINGS.LIST_TITLE.en
        } (${props.totalNumberOfTasks})`}
      </Typography>
      <FormGroup style={{ marginLeft: theme.spacing(2) }}>
        <FormControlLabel
          control={<Switch onClick={props.onClick} />}
          label="Show only highlighted"
        />
      </FormGroup>
    </Grid>
  );
}

function TaskKeywords(props: {
  strings: Set<string>;
  callbackfn: (e: any, i: number) => JSX.Element;
  onClick: () => void;
  locale: string;
}) {
  return (
    <Grid container style={{ display: "flex", flexWrap: "wrap" }}>
      {Array.from(props.strings.values()).map(props.callbackfn)}
      <Button
        variant={"outlined"}
        startIcon={<i className="far fa-window-close" />}
        onClick={props.onClick}
      >
        {props.locale === Locale.BR
          ? STRINGS.CLEAR_FILTER.pt
          : STRINGS.CLEAR_FILTER.en}
      </Button>
    </Grid>
  );
}

export function TaskManagement() {
  const taskManagementStyles = TaskManagementStyles();
  const {
    locale,
    toggleEditing,
    isEditing,
    keywords,
    taskName,
    setTaskName,
    taskList,
    setTaskList,
    setCurrentFilter,
    currentFilter,
  } = useContext(AppSettingsContext);
  // const [internalKeywords, setInternalKeywords] = useState(keywords);
  const [totalNumberOfTasks, setTotalNumberOfTasks] = useState<number>(0);
  // const [apiPagination, setApiPagination] = useState<string>("");

  useEffect(() => {
    getAllEntries().then((newList) => {
      if (newList && newList.tasks) {
        setTaskList(newList.tasks);
        setTotalNumberOfTasks(newList.tasks.length); //TEMPORARY SOLUTION - FLAKY SINCE ITS WITHOUT PAGINATION
        // setApiPagination(newList.pagination);
      }
    });
  }, []);

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

  const handleFilterHighlighted = () => {
    if (currentFilter === "*") {
      setCurrentFilter(null);
    } else {
      setCurrentFilter("*");
    }
  };

  if (totalNumberOfTasks === 0) {
    return (
      <Container classes={{ root: taskManagementStyles.containerRootOverride }}>
        {!isEditing.isEditing && (
          <TaskInput
            // handleAddTask={handleAddTask}
            handleTypeTaskName={handleTypeTaskName}
            handleEnter={handleEnter}
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
      />
      <TaskSummary
        locale={locale}
        totalNumberOfTasks={totalNumberOfTasks}
        onClick={handleFilterHighlighted}
      />
      {keywords.size > 0 ? (
        <TaskKeywords
          strings={keywords}
          callbackfn={(e, i) => (
            <Button
              key={`${e}${i}`}
              variant={"outlined"}
              onClick={() => setCurrentFilter(e)}
            >
              {e.toUpperCase()}
            </Button>
          )}
          onClick={() => setCurrentFilter(null)}
          locale={locale}
        />
      ) : (
        <Typography>No filter yet</Typography>
      )}
      <ArticlesList
        // handleEnter={handleEnter}
        handleTypeTaskName={handleTypeTaskName}
        handleDelete={handleDelete}
        handleAddTask={handleAddTask}
      />
    </Container>
  );
}
