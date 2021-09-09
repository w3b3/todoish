import React, { useContext } from "react";
import { Locale } from "../../types/types";
import { STRINGS } from "../../strings/strings";
import AppSettingsContext from "../../context/appSettingsContext";

export function SaveButton({
  handleAddTask,
  taskName,
}: {
  handleAddTask: () => void;
  taskName: string;
}) {
  const { locale } = useContext(AppSettingsContext);

  return (
    <button
      style={{
        padding: "1em",
        marginLeft: "4px",
      }}
      onClick={handleAddTask}
      disabled={!taskName}
      title="Salvar"
    >
      <i className="fas fa-cloud-upload-alt" />
      &nbsp;
      <span>
        {locale === Locale.BR ? STRINGS.SAVE_TASK.pt : STRINGS.SAVE_TASK.en}
      </span>
    </button>
  );
}
