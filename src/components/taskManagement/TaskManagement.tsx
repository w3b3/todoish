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
  useMediaQuery,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
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
  const { taskList, isEditing, locale } = useContext(AppSettingsContext);
  const isLargerViewport = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <section className={taskManagementStyles.articlesWrapper}>
      {taskList === null ? (
        new Array(10).fill("", 0, 9).map((_) => (
          <Skeleton
            style={{
              backgroundImage:
                "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
              marginTop: theme.spacing(2),
              width: isLargerViewport ? "43%" : "100%",
              marginLeft: "1%",
              marginRight: "1%",
              borderRadius: "4px",
            }}
            variant={"rect"}
            height={184}
            animation={"pulse"}
          />
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

function TaskKeywords({
  strings,
  onClick,
}: {
  strings: Set<string>;
  onClick: () => void;
}) {
  const { setCurrentFilter, locale } = useContext(AppSettingsContext);
  return (
    <Grid container style={{ display: "flex", flexWrap: "wrap" }}>
      {Array.from(strings.values()).map((e, i) => (
        <Button
          key={`${e}${i}`}
          variant={"outlined"}
          onClick={() => setCurrentFilter(e)}
        >
          {e.toUpperCase()}
        </Button>
      ))}
      <Button
        variant={"outlined"}
        startIcon={<i className="far fa-window-close" />}
        onClick={onClick}
      >
        {locale === Locale.BR
          ? STRINGS.CLEAR_FILTER.pt
          : STRINGS.CLEAR_FILTER.en}
      </Button>
    </Grid>
  );
}

export function TaskManagement() {
  // const taskManagementStyles = TaskManagementStyles();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  /* TODO: Still need an implementation for a really empty list
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
          <Skeleton variant="rect" width={210} height={118} />
        </Box>
      </Container>
    );
  }
  */
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
          onClick={() => setCurrentFilter(null)}
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
