import { CompleteButtonInterface } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";

export function CompleteButton({
  handleComplete,
  entry,
}: CompleteButtonInterface) {
  const { isEditing } = useContext(AppSettingsContext);
  // !isEditing.isEditing && !entry.isDone
  return isEditing.isEditing ? null : (
    <button
      onClick={() => handleComplete(entry.id)}
      disabled={isEditing.isEditing && isEditing.id !== entry.id}
      style={{}}
      title="Concluido"
    >
      <i className="fas fa-check-circle" />
      &nbsp;
      <span>Completar</span>
    </button>
  );
}
