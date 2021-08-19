import { CancelEditButtonInterface } from "../../strings/types/types";
import React from "react";

export function CancelEditButton({
  handleCancelEdit,
}: CancelEditButtonInterface) {
  return (
    <button
      onClick={() => handleCancelEdit()}
      style={{
        border: "none",
        background: "none",
        color: "cadetblue",
      }}
    >
      <i className="fas fa-arrow-alt-circle-left" />
      <span className="XXXX-hidden-mobile">Cancelar</span>
    </button>
  );
}
