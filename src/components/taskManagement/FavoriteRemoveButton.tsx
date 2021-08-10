import { FavoriteButtonInterface } from "../../types";
import React from "react";

export function FavoriteRemoveButton({
  handleFavorite,
  entry,
  editMode,
}: FavoriteButtonInterface) {
  return (
    <button
      onClick={() => handleFavorite(entry.id)}
      disabled={editMode.isEditing && editMode.id !== entry.id}
      style={{
        marginRight: "1em",
        padding: "0.25em 1em",
        background: "white",
        color: "red",
        borderRadius: "0.25em",
        border: "1px solid crimson",
        fontWeight: "bold",
      }}
      title="Favorito"
    >
      <i className="fas fa-exclamation-circle" />
    </button>
  );
}
