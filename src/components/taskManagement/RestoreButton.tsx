import { RestoreButtonInterface } from "../../types/types";
import React from "react";

export function RestoreButton({
  handleRestore,
  entry,
}: RestoreButtonInterface) {
  return entry.isDone ? (
    <button
      onClick={() => handleRestore(entry.id)}
      style={{ backgroundColor: "cornflowerblue", color: "white" }}
      title="Restaurar"
    >
      <i className="fas fa-trash-restore" />
      <span className="hidden-mobile">&nbsp;</span>
      <span>Restaurar</span>
    </button>
  ) : null;
}
