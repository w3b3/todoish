import { sortTasks } from "../../utils";
import React, {
  KeyboardEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import {
  CancelEditButtonInterface,
  CompleteButtonInterface,
  DeleteButtonInterface,
  EditButtonInterface,
  EditMode,
  FavoriteButtonInterface,
  RestoreButtonInterface,
  Task,
} from "../../types";
import { addEntry } from "../../api/addEntry";
import { getAllEntries } from "../../api/getAllEntries";
import { deleteEntry } from "../../api/deleteEntry";
import { editEntry } from "../../api/editEntry";

function TaskDate(props: { input: Task }) {
  const { input: entry } = props;
  return (
    <div style={{ flex: 1, textAlign: "left" }}>
      <i className="fas fa-calendar-alt" />{" "}
      {new Intl.DateTimeFormat("pt-br", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(new Date(entry.lastUpdateTime || entry.creationTime))}
    </div>
  );
}

function FavoriteAddButton({
  handleFavorite,
  entry,
  editMode,
}: FavoriteButtonInterface) {
  return (
    <button
      onClick={() => handleFavorite(entry.id)}
      disabled={editMode.isEditing && editMode.id !== entry.id}
      style={{
        marginRight: "1em",
        padding: "0.25em 1em",
        background: "none",
        color: "white",
        borderRadius: "0.25em",
        border: "1px solid white",
        fontWeight: "bold",
      }}
      title="Favorito"
    >
      <i className="fas fa-thumbs-up" />
    </button>
  );
}

function FavoriteRemoveButton({
  handleFavorite,
  entry,
  editMode,
}: FavoriteButtonInterface) {
  return (
    <button
      onClick={() => handleFavorite(entry.id)}
      disabled={editMode.isEditing && editMode.id !== entry.id}
      style={{
        marginRight: "1em",
        padding: "0.25em 1em",
        background: "white",
        color: "red",
        borderRadius: "0.25em",
        border: "1px solid crimson",
        fontWeight: "bold",
      }}
      title="Favorito"
    >
      <i className="fas fa-exclamation-circle" />
    </button>
  );
}

function CompleteButton({
  handleComplete,
  entry,
  editMode,
}: CompleteButtonInterface) {
  return (
    <button
      onClick={() => handleComplete(entry.id)}
      disabled={editMode.isEditing && editMode.id !== entry.id}
      style={{
        padding: "0.25em 1em",
        background: "#adff2f4a none repeat scroll 0% 0%",
        color: "white",
        borderRadius: "0.25em",
        border: "1px solid white",
        fontWeight: "bold",
      }}
      title="Concluido"
    >
      <i className="fas fa-check-circle" />
      <span className="hidden-mobile">Completar</span>
    </button>
  );
}

function EditButton({ handleEdit, editMode, entry }: EditButtonInterface) {
  return !editMode.isEditing ? (
    <button
      onClick={() => handleEdit(entry.id)}
      style={{
        border: "none",
        background: "none",
        color: "cadetblue",
        padding: "1em",
      }}
    >
      <i className="fas fa-angle-double-down" />
      {!entry.isDone && !editMode.isEditing && (
        <span className="hidden-mobile">Editar</span>
      )}
    </button>
  ) : null;
}

function RestoreButton({ handleRestore, entry }: RestoreButtonInterface) {
  return entry.isDone ? (
    <button
      onClick={() => handleRestore(entry.id)}
      style={{
        // marginRight: "1em",
        padding: "0.25em 1em",
        // background: "#adff2f4a none repeat scroll 0% 0%",
        background: "lightyellow",
        color: "black",
        borderRadius: "0.25em",
        border: "1px solid white",
        fontWeight: "bold",
      }}
      title="Restaurar"
    >
      <span className="hidden-mobile">Restaurar</span>{" "}
      <i className="fas fa-trash-restore" />
    </button>
  ) : null;
}

function DeleteButton({ handleDelete, entry }: DeleteButtonInterface) {
  return (
    <button
      onClick={() => handleDelete(entry.id)}
      style={{
        border: "none",
        background: "none",
        color: "red",
      }}
    >
      <i className="fas fa-trash-alt" />
      <span className="hidden-mobile">Apagar</span>
    </button>
  );
}
function CancelEditButton({ handleCancelEdit }: CancelEditButtonInterface) {
  return (
    <button
      onClick={() => handleCancelEdit()}
      style={{
        border: "none",
        background: "none",
        color: "cadetblue",
      }}
    >
      <i className="fas fa-arrow-alt-circle-left" />
      <span className="XXXX-hidden-mobile">Cancelar</span>
    </button>
  );
}

function TaskDescription(entry: Task) {
  return (
    <p
      id={`task${entry.id}`}
      style={{
        flex: "1",
        padding: "0 1em",
        lineHeight: "2",
        textDecoration: entry.isDone ? "line-through" : "",
        color: entry.isDone ? "gray" : "inherit",
      }}
    >
      {entry.name}
    </p>
  );
}

export function TaskManagement() {
  const [taskName, setTaskName] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [totalNumberOfTasks, setTotalNumberOfTasks] = useState<number>(0);
  // const [apiPagination, setApiPagination] = useState<string>("");
  const [editMode, setEditMode] = useState<EditMode>({
    id: "",
    isEditing: false,
  });

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

  const handleCancelEdit = () => {
    setEditMode({ id: "", isEditing: false });
    setTaskName("");
  };

  const findTask = (id: string) => taskList.find((e) => e.id === id);

  const handleAddTask = async () => {
    if (!taskName) return;
    if (editMode.isEditing) {
      const newTask = { ...findTask(editMode.id)! };
      newTask.name = taskName;
      newTask.lastUpdateTime = new Date().valueOf();
      newTask.tags?.push("updated");
      await editEntry(newTask);
      setEditMode({
        id: "",
        isEditing: false,
      });
    } else {
      await addEntry(taskName);
    }
    setTaskName("");
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
    // setApiPagination(newList.pagination);
    // setTotalNumberOfTasks(newList.rowCount); //DOES NOT WORK
    setTotalNumberOfTasks(newList.tasks.length); //TEMPORARY SOLUTION - FLAKY SINCE ITS WITHOUT PAGINATION
  };

  const handleDelete = async (id: string) => {
    setEditMode({ id: "", isEditing: false });
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
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
  };

  const handleComplete = async (id: string) => {
    const newTask = { ...findTask(id)! };
    newTask.isDone = true;
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
    setEditMode({ id: "", isEditing: false });
    setTaskName("");
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
  };

  const handleEdit = async (id: string) => {
    setEditMode({
      id: id,
      isEditing: true,
    });
    setTaskName(taskList.find((e) => e.id === id)?.name ?? "N/A");
  };

  useEffect(() => {
    getAllEntries().then((newList) => {
      setTaskList(newList.tasks);
      // setApiPagination(newList.pagination);
      setTotalNumberOfTasks(newList.tasks.length); //TEMPORARY SOLUTION - FLAKY SINCE ITS WITHOUT PAGINATION
    });
  }, []);
  return (
    <article style={{ flex: 1 }}>
      <section
        style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
      >
        <label htmlFor="taskDescription">
          <h1 style={{ visibility: "hidden" }}>Digite aqui seu lembrete</h1>
        </label>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            id="taskDescription"
            name="taskDescription"
            placeholder="Digite aqui seu lembrete"
            onChange={handleTypeTaskName}
            onKeyPress={handleEnter}
            value={taskName}
            style={{ flex: 1, fontSize: "1.5em", padding: "0.5em" }}
          />
          <button
            style={{
              border: "none",
              padding: "1em",
              backgroundColor: "gray",
            }}
            onClick={handleAddTask}
            disabled={!taskName}
            title="Salvar"
          >
            <i
              className="fas fa-cloud-upload-alt"
              style={{ textShadow: "0 0 8px white" }}
            />
          </button>
        </div>
      </section>
      {totalNumberOfTasks ? (
        <h2
          style={{
            padding: "1em 1em 0",
            fontWeight: "bold",
            color: "cadetblue",
            margin: "2rem 0 1rem",
          }}
        >
          <i className="fas fa-tasks" /> Itens salvos ({totalNumberOfTasks})
        </h2>
      ) : (
        <h2>Ainda sem nenhum lembrete</h2>
      )}
      <section>
        {taskList &&
          taskList
            .sort(sortTasks)
            .map((entry) => {
              return (
                <article
                  key={entry.id}
                  style={{
                    display: entry.isDone ? "flex" : "inherit",
                    flexDirection: !editMode.isEditing ? "row" : "column",
                    backgroundColor: entry.isDone
                      ? "inherit"
                      : entry.tags.includes("favorite")
                      ? "#ff000040"
                      : "#504c4c4a",
                    borderBottom:
                      editMode.isEditing && editMode.id === entry.id
                        ? "3px solid red"
                        : "3px solid transparent",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <TaskDescription {...entry} />
                    <EditButton
                      editMode={editMode}
                      handleEdit={handleEdit}
                      entry={entry}
                    />
                  </div>
                  <div
                    key={entry.id}
                    style={
                      (editMode.isEditing && editMode.id === entry.id) ||
                      (!editMode.isEditing && !entry.isDone)
                        ? {
                            height: "65px",
                            padding: "1em",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderBottom: editMode.isEditing
                              ? "1px solid #ffffff4f"
                              : "",
                          }
                        : {
                            display: "none",
                          }
                    }
                  >
                    {!entry.isDone && <TaskDate input={entry} />}

                    {/*FAVORITE*/}
                    {!editMode.isEditing &&
                      !entry.isDone &&
                      (entry.tags.includes("favorite") ? (
                        <FavoriteRemoveButton
                          handleFavorite={handleFavorite}
                          entry={entry}
                          editMode={editMode}
                        />
                      ) : (
                        <FavoriteAddButton
                          handleFavorite={handleFavorite}
                          entry={entry}
                          editMode={editMode}
                        />
                      ))}
                    {!editMode.isEditing && !entry.isDone && (
                      <CompleteButton
                        handleComplete={handleComplete}
                        entry={entry}
                        editMode={editMode}
                      />
                    )}

                    {/*EDIT CONTROLS*/}
                    {editMode.isEditing && entry.id === editMode.id && (
                      <>
                        <RestoreButton
                          entry={entry}
                          handleRestore={handleRestore}
                          editMode={editMode}
                        />
                        <DeleteButton
                          editMode={editMode}
                          entry={entry}
                          handleDelete={handleDelete}
                        />
                        <CancelEditButton
                          editMode={editMode}
                          handleCancelEdit={handleCancelEdit}
                          entry={entry}
                        />
                      </>
                    )}
                  </div>
                </article>
              );
            })
            .reverse()}
      </section>
    </article>
  );
}
