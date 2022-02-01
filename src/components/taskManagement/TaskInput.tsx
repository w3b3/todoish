import React, { ChangeEvent, KeyboardEvent, useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";
import { Locale } from "../../types/types";
import { createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import { cleanAllEntries } from "../../api/cleanAllEntries";

const TaskInputStyles = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      padding: "1em",
    },
    textField: {
      flex: 1,
    },
  })
);

export function TaskInput({
  handleTypeTaskName,
  handleEnter,
}: {
  handleTypeTaskName: (event: ChangeEvent<HTMLInputElement>) => void;

  handleEnter: (event: KeyboardEvent) => void;
}) {
  const taskInputStyles = TaskInputStyles();
  const { locale, taskName } = useContext(AppSettingsContext);

  return (
    <section className={taskInputStyles.root}>
      {/*<label htmlFor="taskDescription" style={{ visibility: "hidden" }}>
        {locale === Locale.BR
          ? STRINGS.INPUT_TASK_PLACEHOLDER.pt
          : STRINGS.INPUT_TASK_PLACEHOLDER.en}
      </label>*/}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          id="taskDescription"
          name="taskDescription"
          className={taskInputStyles.textField}
          label={
            locale === Locale.BR
              ? STRINGS.INPUT_TASK_PLACEHOLDER.pt
              : STRINGS.INPUT_TASK_PLACEHOLDER.en
          }
          onChange={handleTypeTaskName}
          onKeyPress={handleEnter}
          defaultValue={taskName}
          autoComplete={"off"}
        />
        {/*<SaveButton handleAddTask={handleAddTask} taskName={taskName} />*/}
        <button onClick={cleanAllEntries}>Clean all entries</button>
      </div>
    </section>
  );
}
