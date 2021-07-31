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
  const [apiPagination, setApiPagination] = useState<string>("");
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
      // debugger;
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
    setApiPagination(newList.pagination);
    setTotalNumberOfTasks(newList.rowCount);
  };

  const handleDelete = async (id: string) => {
    setEditMode({ id: "", isEditing: false });
    setTaskName("");
    await deleteEntry(id);
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
    setApiPagination(newList.pagination);
    setTotalNumberOfTasks(newList.rowCount);
  };

  const handleComplete = async (id: string) => {
    // await completeEntry(id);
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
    // setApiPagination(newList.pagination);
    // setTotalNumberOfTasks(newList.rowCount);
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
      setApiPagination(newList.pagination);
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
          <button onClick={handleAddTask} disabled={!taskName}>
            Salvar
          </button>
        </div>
      </section>
      <hr />
      {totalNumberOfTasks ? (
        <h2>Tarefas salvas ({totalNumberOfTasks})</h2>
      ) : (
        <h2>Ainda sem nenhum lembrete</h2>
      )}
      <ol>
        {taskList &&
          taskList
            .sort(sortTasks)
            .map((entry) => (
              <li key={entry.id}>
                <button
                  onClick={() => handleComplete(entry.id)}
                  disabled={editMode.isEditing && editMode.id !== entry.id}
                  style={{
                    marginRight: "1em",
                    border: "none",
                    background: "none",
                    color: "greenyellow",
                  }}
                >
                  Concluido <i className="fas fa-check-circle" />
                </button>
                <span id={`task${entry.id}`}>{entry.name}</span>
                {!editMode.isEditing && (
                  <button
                    onClick={() => handleEdit(entry.id)}
                    style={{
                      border: "none",
                      background: "none",
                      color: "cadetblue",
                    }}
                  >
                    Expandir <i className="fas fa-angle-double-down" />
                  </button>
                )}
                {editMode.isEditing && entry.id === editMode.id && (
                  <>
                    <button
                      onClick={() => handleCancelEdit()}
                      style={{
                        border: "none",
                        background: "none",
                        color: "cadetblue",
                      }}
                    >
                      Cancelar <i className="fas fa-arrow-alt-circle-left" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      style={{
                        border: "none",
                        background: "none",
                        color: "red",
                      }}
                    >
                      Apagar <i className="fas fa-trash-alt" />
                    </button>
                  </>
                )}
              </li>
            ))
            .reverse()}
      </ol>
    </article>
  );
}
