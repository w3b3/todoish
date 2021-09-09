import { RestoreButtonInterface } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";

export function RestoreButton({
  handleRestore,
  entry,
}: RestoreButtonInterface) {
  const { isEditing } = useContext(AppSettingsContext);
  return isEditing && entry.isDone ? (
    <button
      onClick={() => handleRestore(entry.id)}
      style={{}}
      title="Restaurar"
    >
      <i className="fas fa-trash-restore" />
      &nbsp;
      <span>Restaurar</span>
    </button>
  ) : null;
}
