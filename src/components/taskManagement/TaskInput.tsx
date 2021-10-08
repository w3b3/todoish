import React, { ChangeEvent, KeyboardEvent, useContext, useState } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";
import { Locale } from "../../types/types";
import { createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import { theme } from "../../theme/theme";
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
    textField: {
      flex: 1,
      fontSize: "1em",
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
  const [isFocused, setIsFocused] = useState(false);
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3em",
        }}
      >
        <i
          className="fas fa-arrow-circle-right"
          style={{
            marginRight: "4px",
            color: isFocused
              ? theme.palette.primary.main
              : "rgba(50,50,50,0.25)",
          }}
        />
        <TextField
          id="taskDescription"
          name="taskDescription"
          className={taskInputStyles.textField}
          variant={"filled"}
          label={
            locale === Locale.BR
              ? STRINGS.INPUT_TASK_PLACEHOLDER.pt
              : STRINGS.INPUT_TASK_PLACEHOLDER.en
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleTypeTaskName}
          onKeyPress={handleEnter}
          value={taskName}
        />
        {/*<SaveButton handleAddTask={handleAddTask} taskName={taskName} />*/}
        {/*<button onClick={cleanAllEntries}>Clean all entries</button>*/}
      </div>
    </section>
  );
}
