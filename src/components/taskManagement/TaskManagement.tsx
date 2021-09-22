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
import FavoriteButton from "./FavoriteButton";
import { CompleteButton } from "./CompleteButton";
import { EditButton } from "./EditButton";
import { RestoreButton } from "./RestoreButton";
import { DeleteButton } from "./DeleteButton";
import { CancelEditButton } from "./CancelEditButton";
import { TaskDate } from "./TaskDate";
import { TaskDescription } from "./TaskDescription";
import { TaskInput } from "./TaskInput";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";
import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import { TaskStyled } from "./TaskStyled";

const TaskManagementStyles = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    root: {
      padding: spacing(2),
      [breakpoints.down("sm")]: {
        padding: spacing(1),
      },
    },
    articlesWrapper: {
      minHeight: "70vh",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      flexWrap: "wrap",
      padding: spacing(1),
      [breakpoints.down("sm")]: {
        padding: 0,
        justifyContent: "center",
      },
    },

    containerRootOverride: {
      [breakpoints.down("sm")]: {
        padding: 0,
      },
    },

    tasksControlsWrapper: {
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      width: "100%",
      padding: spacing(1),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
);

export function TaskManagement() {
  const taskManagementStyles = TaskManagementStyles();
  const { locale, setLocale, toggleEditing, isEditing } =
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

      {totalNumberOfTasks ? (
        <h2
          style={{
            color: "whitesmoke",
            padding: "0 1em",
          }}
        >
          <i className="fas fa-tasks" />
          &nbsp;
          {`${
            locale === Locale.BR ? STRINGS.LIST_TITLE.pt : STRINGS.LIST_TITLE.en
          } (${totalNumberOfTasks})`}
        </h2>
      ) : (
        <h2
          style={{
            padding: "1em 1em 0",
            margin: "1rem 0",
          }}
        >
          {locale === Locale.BR ? STRINGS.EMPTY_LIST.pt : STRINGS.EMPTY_LIST.en}
        </h2>
      )}
      <section id="tasks" className={taskManagementStyles.articlesWrapper}>
        {taskList &&
          taskList.map((entry, i) => {
            return (
              <TaskStyled key={entry.id} task={entry} order={i}>
                <TaskDescription {...entry} />
                {isEditing.isEditing && isEditing.id === entry.id && (
                  <TaskInput
                    // handleAddTask={handleAddTask}
                    handleTypeTaskName={handleTypeTaskName}
                    handleEnter={handleEnter}
                    taskName={taskName}
                  />
                )}
                <div className={taskManagementStyles.tasksControlsWrapper}>
                  <TaskDate entry={entry} />
                  <DeleteButton entry={entry} handleDelete={handleDelete} />
                  <RestoreButton entry={entry} handleRestore={handleRestore} />
                  <FavoriteButton
                    handleFavorite={handleFavorite}
                    entry={entry}
                  />
                  <CompleteButton
                    handleComplete={handleComplete}
                    entry={entry}
                  />

                  <CancelEditButton
                    handleCancelEdit={handleCancelEdit}
                    entry={entry}
                  />
                  <EditButton handleEdit={handleEdit} entry={entry} />
                </div>
              </TaskStyled>
            );
          })}
      </section>
      <section style={{ display: "flex", alignItems: "center" }}>
        <p style={{ padding: "0 1em", color: "whitesmoke" }}>
          {locale === Locale.BR
            ? STRINGS.LANGUAGE_SWITCHER.pt
            : STRINGS.LANGUAGE_SWITCHER.en}
        </p>

        <button
          style={{
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            maxWidth: "clamp(50px, auto, 200px)",
          }}
          onClick={handleLocaleClick}
        >
          {locale}
        </button>
      </section>
    </Container>
  );
}
