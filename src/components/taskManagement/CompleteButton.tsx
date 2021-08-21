import { CompleteButtonInterface } from "../../types/types";
import React from "react";

export function CompleteButton({
  handleComplete,
  entry,
  editMode,
}: CompleteButtonInterface) {
  return (
    <button
      onClick={() => handleComplete(entry.id)}
      disabled={editMode.isEditing && editMode.id !== entry.id}
      style={{
        padding: "0.25em 1em",
      }}
      title="Concluido"
    >
      <i className="fas fa-check-circle" />
      <span className="hidden-mobile">Completar</span>
    </button>
  );
}
