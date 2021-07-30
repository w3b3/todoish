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

export function TaskManagement() {
  const [taskName, setTaskName] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [totalNumberOfTasks, setTotalNumberOfTasks] = useState<number>(0);
  const [apiPagination, setApiPagination] = useState<string>("");

  const handleEnter = (typeEvent: KeyboardEvent) => {
    if (typeEvent.key === "Enter") {
      handleAddTask();
    }
  };

  const handleTypeTaskName = (typeEvent: SyntheticEvent<HTMLInputElement>) => {
    //  TODO: field validation
    const target = typeEvent.target as HTMLInputElement;
    setTaskName(target.value);
  };

  const handleAddTask = async () => {
    if (!taskName) return;
    await addEntry(taskName);
    setTaskName("");
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
    setApiPagination(newList.pagination);
    setTotalNumberOfTasks(newList.rowCount);
  };

  const handleDelete = async (id: string) => {
    await deleteEntry(id);
    const newList = await getAllEntries();
    setTaskList(newList.tasks);
    setApiPagination(newList.pagination);
    setTotalNumberOfTasks(newList.rowCount);
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
          <h1 style={{ fontSize: "1.5em", textAlign: "center" }}>
            Digite aqui seu lembrete
          </h1>
        </label>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            id="taskDescription"
            name="taskDescription"
            placeholder="comprar um saco de batatas"
            onChange={handleTypeTaskName}
            onKeyPress={handleEnter}
            value={taskName}
            style={{ flex: 1, fontSize: "1.5em", padding: "0.5em" }}
          />
          <button onClick={handleAddTask}>Salvar</button>
        </div>
      </section>
      <hr />
      <h2>Tarefas salvas ({totalNumberOfTasks})</h2>
      <ol>
        {taskList &&
          taskList
            .sort(sortTasks)
            .map((entry) => (
              <li key={entry.id}>
                <button
                  onClick={() => handleDelete(entry.id)}
                  style={{ marginRight: "1em" }}
                >
                  Apagar
                </button>
                {entry.name}
              </li>
            ))
            .reverse()}
      </ol>
    </article>
  );
}
