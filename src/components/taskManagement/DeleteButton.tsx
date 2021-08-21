import { DeleteButtonInterface } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";

export function DeleteButton({ handleDelete, entry }: DeleteButtonInterface) {
  const { isEditing } = useContext(AppSettingsContext);

  return isEditing.isEditing ? (
    <button onClick={() => handleDelete(entry.id)} style={{}}>
      <i className="fas fa-trash-alt" />
      &nbsp;
      <span>Apagar</span>
    </button>
  ) : null;
}
