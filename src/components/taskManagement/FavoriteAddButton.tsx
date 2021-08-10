import { FavoriteButtonInterface } from "../../types";
import React from "react";

export function FavoriteAddButton({
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
        background: "none",
        color: "white",
        borderRadius: "0.25em",
        border: "1px solid white",
        fontWeight: "bold",
      }}
      title="Favorito"
    >
      <i className="fas fa-thumbs-up" />
    </button>
  );
}
