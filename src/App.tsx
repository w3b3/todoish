import React, {
  KeyboardEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import "./App.css";
import { Task } from "./types";
import { sortTasks } from "./utils";
import { addEntry } from "./api/addEntry";
import { deleteEntry } from "./api/deleteEntry";
import { getAllEntries } from "./api/getAllEntries";

function App() {
  const [taskName, setTaskName] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>([]);

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
    await addEntry(taskName);
    setTaskName("");
    const newList = await getAllEntries();
    setTaskList(newList);
  };

  const handleDelete = async (id: string) => {
    await deleteEntry(id);
    const newList = await getAllEntries();
    setTaskList(newList);
  };

  useEffect(() => {
    getAllEntries().then((r) => setTaskList(r));
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "500px" }}>
      <section style={{ display: "flex", flexWrap: "wrap" }}>
        <label htmlFor="taskDescription" style={{ display: "block" }}>
          Tarefa:
        </label>
        <input
          type="text"
          id="taskDescription"
          name="taskDescription"
          onChange={handleTypeTaskName}
          onKeyPress={handleEnter}
          value={taskName}
          style={{ flex: 1 }}
        />
        <button onClick={handleAddTask}>Salvar</button>
      </section>
      <ol>
        {taskList.sort(sortTasks).map((entry) => (
          <li key={entry.id}>
            <button
              onClick={() => handleDelete(entry.id)}
              style={{ marginRight: "1em" }}
            >
              Apagar
            </button>
            {entry.name}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
