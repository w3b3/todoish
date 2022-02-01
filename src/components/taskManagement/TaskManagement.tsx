import React, {
  KeyboardEvent,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { addEntry } from "../../api/addEntry";
import { getAllEntries } from "../../api/getAllEntries";
import { deleteEntry } from "../../api/deleteEntry";
import { editEntry } from "../../api/editEntry";
import { TaskInput } from "./TaskInput";
import AppSettingsContext from "../../context/appSettingsContext";
import { createStyles, makeStyles, Theme, Container } from "@material-ui/core";
import { theme } from "../../theme/theme";
import { findTask } from "../../utils";
import { ArticlesList } from "./ArticlesList";
import { TaskSummary } from "./TaskSummary";
import { LocaleSelector } from "./LocaleSelector";

export const TaskManagementStyles = makeStyles(
  ({ breakpoints, spacing }: Theme) =>
    createStyles({
      root: {},
      emptyWrapper: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      articlesWrapper: {
        marginTop: spacing(2),
        padding: spacing(0),
      },

      containerRootOverride: {},

      tasksControlsWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        "& button:not(:first-child)": {
          marginLeft: theme.spacing(1),
        },
      },
    })
);

export function TaskManagement() {
  const {
    locale,
    setLocale,
    toggleEditing,
    isEditing,
    taskName,
    setTaskName,
    taskList,
    setTaskList,
    setCurrentFilter,
    currentFilter,
  } = useContext(AppSettingsContext);

  const [totalNumberOfTasks, setTotalNumberOfTasks] = useState<number>(0);

  useEffect(() => {
    getAllEntries().then((newList) => {
      if (newList && newList.tasks) {
        setTaskList(newList.tasks);
        setTotalNumberOfTasks(newList.tasks.length); //TEMPORARY SOLUTION - FLAKY SINCE ITS WITHOUT PAGINATION
      }
    });
  }, []);

  const handleEnter = (typeEvent: KeyboardEvent) => {
    if (typeEvent.key === "Enter") {
      handleAddTask();
    }
  };

  const handleTypeTaskName = (typeEvent: SyntheticEvent<HTMLInputElement>) => {
    const target = typeEvent.target as HTMLInputElement;
    setTaskName(target.value);
  };

  const handleDelete = async (id: string) => {
    toggleEditing();
    setTaskName("");
    await deleteEntry(id);
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
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

  const handleLocaleClick = () => {
    setLocale(locale === "pt-br" ? "en-us" : "pt-br");
  };

  return (
    <>
      <Container>
        <TaskInput
          handleTypeTaskName={handleTypeTaskName}
          handleEnter={handleEnter}
        />
        <TaskSummary
          locale={locale}
          totalNumberOfTasks={totalNumberOfTasks}
          onClick={handleFilterHighlighted}
        />
        <LocaleSelector onChange={handleLocaleClick} value={locale} />
      </Container>
      <ArticlesList
        handleTypeTaskName={handleTypeTaskName}
        handleDelete={handleDelete}
        handleAddTask={handleAddTask}
      />
    </>
  );
}
