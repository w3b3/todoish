import { SaveButton } from "./SaveButton";
import React, { KeyboardEvent, SyntheticEvent, useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";
import { Locale } from "../../types/types";

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
  const { locale } = useContext(AppSettingsContext);
  return (
    <section
      id="TaskInput-media-query"
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        padding: "0 1em",
      }}
    >
      <label htmlFor="taskDescription" style={{ visibility: "hidden" }}>
        {locale === Locale.BR
          ? STRINGS.INPUT_TASK_PLACEHOLDER.pt
          : STRINGS.INPUT_TASK_PLACEHOLDER.en}
      </label>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          id="taskDescription"
          name="taskDescription"
          placeholder={
            locale === Locale.BR
              ? STRINGS.INPUT_TASK_PLACEHOLDER.pt
              : STRINGS.INPUT_TASK_PLACEHOLDER.en
          }
          onChange={handleTypeTaskName}
          onKeyPress={handleEnter}
          value={taskName}
          style={{
            flex: 1,
            padding: "0.5em",
            // border: "1px solid darkgray",
          }}
        />
        <SaveButton handleAddTask={handleAddTask} taskName={taskName} />
      </div>
    </section>
  );
}
