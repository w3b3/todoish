import { CompleteButtonInterface } from "../../types";
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
        background: "#adff2f4a none repeat scroll 0% 0%",
        color: "white",
        borderRadius: "0.25em",
        border: "1px solid white",
        fontWeight: "bold",
      }}
      title="Concluido"
    >
      <i className="fas fa-check-circle" />
      <span className="hidden-mobile">Completar</span>
    </button>
  );
}
