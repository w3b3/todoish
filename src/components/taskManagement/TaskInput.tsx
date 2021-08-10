import { SaveButton } from "./SaveButton";
import React, { KeyboardEvent, SyntheticEvent } from "react";

export function TaskInput({
  handleTypeTaskName,
  taskName,
  handleEnter,
  handleAddTask,
}: {
  handleTypeTaskName: (event: SyntheticEvent<HTMLInputElement>) => void;
  taskName: string;
  handleEnter: (event: KeyboardEvent) => void;
  handleAddTask: () => void;
}) {
  return (
    <section
      style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
    >
      <label htmlFor="taskDescription" style={{ visibility: "hidden" }}>
        Digite aqui seu lembrete
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
          style={{
            flex: 1,
            fontSize: "1.5em",
            padding: "0.5em",
            border: "none",
          }}
        />
        <SaveButton handleAddTask={handleAddTask} taskName={taskName} />
      </div>
    </section>
  );
}
