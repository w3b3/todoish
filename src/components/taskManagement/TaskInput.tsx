import React, { ChangeEvent, KeyboardEvent, useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";
import { Locale } from "../../types/types";
import { createStyles, Input, makeStyles, Theme } from "@material-ui/core";
// import { cleanAllEntries } from "../../api/cleanAllEntries";

const TaskInputStyles = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      padding: "1em",
      // width: "100%",
      // [breakpoints.down("sm")]: {
      //   backgroundColor: "#555555b0",
      // position: "sticky",
      // top: "min(80px, 12vh)",
      // left: 0,
      // },
    },
  })
);

export function TaskInput({
  handleTypeTaskName,
  taskName,
  handleEnter,
}: {
  // handleTypeTaskName: (event: SyntheticEvent<HTMLInputElement>) => void;
  handleTypeTaskName: (event: ChangeEvent<HTMLInputElement>) => void;
  taskName: string;
  handleEnter: (event: KeyboardEvent) => void;
}) {
  const taskInputStyles = TaskInputStyles();
  const { locale } = useContext(AppSettingsContext);
  // if (isEditing.isEditing) {
  //   return null;
  // }
  return (
    <section className={taskInputStyles.root}>
      {/*<label htmlFor="taskDescription" style={{ visibility: "hidden" }}>
        {locale === Locale.BR
          ? STRINGS.INPUT_TASK_PLACEHOLDER.pt
          : STRINGS.INPUT_TASK_PLACEHOLDER.en}
      </label>*/}
      <div style={{ display: "flex" }}>
        <Input
          autoFocus
          fullWidth
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
          }}
        />
        {/*<SaveButton handleAddTask={handleAddTask} taskName={taskName} />*/}
        {/*<button onClick={cleanAllEntries}>Clean all entries</button>*/}
      </div>
    </section>
  );
}
