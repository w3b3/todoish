import { Task } from "../../types/types";
import { TaskDate } from "./TaskDate";
import { DeleteButton } from "./DeleteButton";
import { RestoreButton } from "./RestoreButton";
import FavoriteButton from "./FavoriteButton";
import { CompleteButton } from "./CompleteButton";
import { CancelEditButton } from "./CancelEditButton";
import { EditButton } from "./EditButton";
import React from "react";
import { TaskManagementStyles } from "./TaskManagement";

function TaskControls(props: {
  entry: Task;
  handleDelete: (id: string) => Promise<void>;
  handleRestore: (id: string) => Promise<void>;
  handleFavorite: (id: string) => Promise<void>;
  handleComplete: (id: string) => Promise<void>;
  handleCancelEdit: () => void;
  handleEdit: (id: string) => Promise<void>;
}) {
  const taskManagementStyles = TaskManagementStyles();

  return (
    <section className={taskManagementStyles.tasksControlsWrapper}>
      <TaskDate entry={props.entry} />
      <DeleteButton entry={props.entry} handleDelete={props.handleDelete} />
      <RestoreButton entry={props.entry} handleRestore={props.handleRestore} />
      <FavoriteButton
        handleFavorite={props.handleFavorite}
        entry={props.entry}
      />
      <CompleteButton
        handleComplete={props.handleComplete}
        entry={props.entry}
      />

      <CancelEditButton
        handleCancelEdit={props.handleCancelEdit}
        entry={props.entry}
      />
      <EditButton handleEdit={props.handleEdit} entry={props.entry} />
    </section>
  );
}

export { TaskControls };
