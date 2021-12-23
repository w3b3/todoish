import { Task } from "../../types/types";
import { DeleteButton } from "./DeleteButton";
import { RestoreButton } from "./RestoreButton";
import FavoriteButton from "./FavoriteButton";
import { CompleteButton } from "./CompleteButton";
import { CancelEditButton } from "./CancelEditButton";
import { EditButton } from "./EditButton";
import React, { useContext } from "react";
import { TaskManagementStyles } from "./TaskManagement";
import { deleteEntry } from "../../api/deleteEntry";
import { getAllEntries } from "../../api/getAllEntries";
import { editEntry } from "../../api/editEntry";
import AppSettingsContext from "../../context/appSettingsContext";
import { findTask } from "../../utils";
import { Box } from "@material-ui/core";
import { UpdateButton } from "./UpdateButton";
import {CountdownModal} from "../CountdownModal";

function TaskControls({
  entry,
  handleAddTask,
}: {
  entry: Task;
  handleAddTask: () => void;
}) {
  const taskManagementStyles = TaskManagementStyles();
  const { toggleEditing, setTaskName, taskList, setTaskList } =
    useContext(AppSettingsContext);
  // const [totalNumberOfTasks, setTotalNumberOfTasks] = useState<number>(0);

  const handleEdit = async (id: string) => {
    toggleEditing(id);
    setTaskName(
      taskList?.find((e) => e.id === id)?.name ?? null
    ); /*N/A should never occur*/
  };

  const handleCancelEdit = () => {
    toggleEditing();
    setTaskName("");
  };
  /*This is duplicated*/
  const handleDelete = async (id: string) => {
    toggleEditing();
    setTaskName("");
    await deleteEntry(id);
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
    // setApiPagination(newList.pagination);
    // setTotalNumberOfTasks(newList.tasks.length); //TEMPORARY SOLUTION - FLAKY SINCE ITS WITHOUT PAGINATION
  };

  const handleFavorite = async (id: string) => {
    const newTask = { ...findTask(id, taskList)! };
    newTask.tags = newTask.tags.find((tag) => tag === "favorite")
      ? newTask.tags.filter((tag) => tag !== "favorite")
      : newTask.tags.concat("favorite");
    setTaskName("");
    await editEntry(newTask);
    toggleEditing();
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
  };

  const handleComplete = async (id: string) => {
    const newTask = { ...findTask(id, taskList)! };
    newTask.isDone = true;
    newTask.tags = newTask.tags.filter((tag) => tag !== "favorite");
    newTask.lastUpdateTime = new Date().valueOf();
    await editEntry(newTask);
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
  };

  const handleRestore = async (id: string) => {
    const newTask = { ...findTask(id, taskList)! };
    newTask.isDone = false;
    newTask.lastUpdateTime = new Date().valueOf();
    await editEntry(newTask);
    toggleEditing();
    setTaskName("");
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
  };

  return (
    <Box className={taskManagementStyles.tasksControlsWrapper}>
      <CountdownModal entry={entry} />
      <UpdateButton entry={entry} handleAdd={handleAddTask} />
      <DeleteButton entry={entry} handleDelete={handleDelete} />
      <RestoreButton entry={entry} handleRestore={handleRestore} />
      <FavoriteButton handleFavorite={handleFavorite} entry={entry} />
      <CompleteButton handleComplete={handleComplete} entry={entry} />
      <CancelEditButton handleCancelEdit={handleCancelEdit} entry={entry} />
      <EditButton handleEdit={handleEdit} entry={entry} />
    </Box>
  );
}

export { TaskControls };
