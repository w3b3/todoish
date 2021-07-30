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
    <div className="App">
      <section>
        <label htmlFor="taskDescription">Task description</label>
        <input
          type="text"
          id="taskDescription"
          name="taskDescription"
          onChange={handleTypeTaskName}
          onKeyPress={handleEnter}
          value={taskName}
        />
        <button onClick={handleAddTask}>Add new</button>
      </section>
      <ol>
        {taskList.sort(sortTasks).map((entry) => (
          <li key={entry.id}>
            <button onClick={() => handleDelete(entry.id)}>Delete</button>
            {entry.name}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
