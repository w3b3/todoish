import { EditButtonInterface } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";

export function EditButton({ handleEdit, entry }: EditButtonInterface) {
  const { isEditing } = useContext(AppSettingsContext);

  return isEditing.isEditing ? null : (
    <button
      onClick={() => handleEdit(entry.id)}
      style={{
        padding: "1em",
      }}
    >
      <i className="fas fa-angle-double-down" />
      &nbsp;
      <span>Editar</span>
    </button>
  );
}
