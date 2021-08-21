import { EditButtonInterface } from "../../types/types";
import React from "react";

export function EditButton({
  handleEdit,
  editMode,
  entry,
}: EditButtonInterface) {
  return !editMode.isEditing ? (
    <button
      onClick={() => handleEdit(entry.id)}
      style={{
        border: "none",
        background: "none",
        color: "cadetblue",
        padding: "1em",
      }}
    >
      <i className="fas fa-angle-double-down" />
      {!entry.isDone && !editMode.isEditing && (
        <span className="hidden-mobile">Editar</span>
      )}
    </button>
  ) : null;
}
