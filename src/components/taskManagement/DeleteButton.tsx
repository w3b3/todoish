import { DeleteButtonInterface } from "../../types";
import React from "react";

export function DeleteButton({ handleDelete, entry }: DeleteButtonInterface) {
  return (
    <button
      onClick={() => handleDelete(entry.id)}
      style={{
        border: "none",
        background: "none",
        color: "red",
      }}
    >
      <i className="fas fa-trash-alt" />
      <span className="hidden-mobile">Apagar</span>
    </button>
  );
}
