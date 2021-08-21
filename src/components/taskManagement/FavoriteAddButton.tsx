import { FavoriteButtonInterface } from "../../types/types";
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
        // marginRight: "1em",
        padding: "0.25em 1em",
      }}
      title="Adicionar Favorito"
    >
      <i className="fas fa-thumbs-up" />
    </button>
  );
}
