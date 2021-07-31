import { sortTasks } from "../../utils";
import React, {
  KeyboardEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { Task } from "../../types";
import { addEntry } from "../../api/addEntry";
import { getAllEntries } from "../../api/getAllEntries";
import { deleteEntry } from "../../api/deleteEntry";
import { editEntry } from "../../api/editEntry";

interface EditMode {
  id: string;
  isEditing: boolean;
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
    setTotalNumberOfTasks(newList.rowCount);
  };

  const handleDelete = async (id: string) => {
    setEditMode({ id: "", isEditing: false });
    setTaskName("");
    await deleteEntry(id);
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
    // setApiPagination(newList.pagination);
    setTotalNumberOfTasks(newList.rowCount);
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
      setTotalNumberOfTasks(newList.rowCount);
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
          <button onClick={handleAddTask} disabled={!taskName} title="Salvar">
            <i className="fas fa-cloud-upload-alt" />
          </button>
        </div>
      </section>
      {/*<hr />*/}
      {totalNumberOfTasks ? (
        <h2
          style={{
            padding: "1em 1em 0",
            fontWeight: "bold",
            color: "cadetblue",
            margin: 0,
          }}
        >
          <i className="fas fa-tasks" /> Itens salvos ({totalNumberOfTasks})
          {/*TODO*/}
        </h2>
      ) : (
        <h2>Ainda sem nenhum lembrete</h2>
      )}
      <section>
        {taskList &&
          taskList
            .sort(sortTasks)
            .map((entry) => {
              console.info(entry);
              return (
                <>
                  <p
                    id={`task${entry.id}`}
                    style={{ padding: "1em 1em 0", lineHeight: "2" }}
                  >
                    {entry.name}
                  </p>
                  <div
                    key={entry.id}
                    style={{
                      height: "65px",
                      padding: "1em",
                      backgroundColor: "#504c4c4a",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottom: "1px solid #ffffff4f",
                    }}
                  >
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <i className="fas fa-calendar-alt" />{" "}
                      {new Intl.DateTimeFormat("pt-br", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      }).format(
                        new Date(entry.lastUpdateTime || entry.creationTime)
                      )}
                    </div>
                    {!editMode.isEditing &&
                      !entry.isDone &&
                      (entry.tags.includes("favorite") ? (
                        <button
                          onClick={() => handleFavorite(entry.id)}
                          disabled={
                            editMode.isEditing && editMode.id !== entry.id
                          }
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
                      ) : (
                        <button
                          onClick={() => handleFavorite(entry.id)}
                          disabled={
                            editMode.isEditing && editMode.id !== entry.id
                          }
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
                      ))}
                    {!editMode.isEditing &&
                      (entry.isDone ? (
                        <div style={{ color: "goldenrod" }}>
                          <i className="fas fa-check-circle" />
                        </div>
                      ) : (
                        <button
                          onClick={() => handleComplete(entry.id)}
                          disabled={
                            editMode.isEditing && editMode.id !== entry.id
                          }
                          style={{
                            marginRight: "1em",
                            padding: "0.25em 1em",
                            background: "#adff2f4a none repeat scroll 0% 0%",
                            // background: "greenyellow",
                            color: "white",
                            borderRadius: "0.25em",
                            border: "1px solid white",
                            fontWeight: "bold",
                          }}
                          title="Concluido"
                        >
                          <span className="hidden-mobile">Completar</span>
                          <i className="fas fa-check-circle" />
                        </button>
                      ))}

                    {!editMode.isEditing && (
                      <button
                        onClick={() => handleEdit(entry.id)}
                        style={{
                          border: "none",
                          background: "none",
                          color: "cadetblue",
                        }}
                      >
                        <span className="hidden-mobile">Editar</span>{" "}
                        <i className="fas fa-angle-double-down" />
                      </button>
                    )}
                    {editMode.isEditing && entry.id === editMode.id && (
                      <>
                        {entry.isDone && (
                          <button
                            onClick={() => handleRestore(entry.id)}
                            style={{
                              marginRight: "1em",
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
                        )}
                        <button
                          onClick={() => handleDelete(entry.id)}
                          style={{
                            border: "none",
                            background: "none",
                            color: "red",
                          }}
                        >
                          <span className="hidden-mobile">Apagar</span>
                          <i className="fas fa-trash-alt" />
                        </button>
                        <button
                          onClick={() => handleCancelEdit()}
                          style={{
                            border: "none",
                            background: "none",
                            color: "cadetblue",
                          }}
                        >
                          Cancelar{" "}
                          <i className="fas fa-arrow-alt-circle-left" />
                        </button>
                      </>
                    )}
                  </div>
                </>
              );
            })
            .reverse()}
      </section>
    </article>
  );
}
