import { CancelEditButtonInterface } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";

export function CancelEditButton({
  handleCancelEdit,
}: CancelEditButtonInterface) {
  const { isEditing } = useContext(AppSettingsContext);

  return isEditing.isEditing ? (
    <button onClick={() => handleCancelEdit()} style={{}}>
      <i className="fas fa-arrow-alt-circle-left" />
      &nbsp;
      <span>Cancelar</span>
    </button>
  ) : null;
}
