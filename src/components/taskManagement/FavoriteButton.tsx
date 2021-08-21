import { FavoriteButtonInterface } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";

export const FavoriteButton = ({
  handleFavorite,
  entry,
}: FavoriteButtonInterface) => {
  const { isEditing } = useContext(AppSettingsContext);

  return isEditing.isEditing ? (
    entry.tags.includes("favorite") ? (
      <FavoriteRemoveButton handleFavorite={handleFavorite} entry={entry} />
    ) : (
      <FavoriteAddButton handleFavorite={handleFavorite} entry={entry} />
    )
  ) : null;
};

function FavoriteAddButton({ handleFavorite, entry }: FavoriteButtonInterface) {
  const { isEditing } = useContext(AppSettingsContext);

  return (
    <button
      onClick={() => handleFavorite(entry.id)}
      disabled={isEditing.isEditing && isEditing.id !== entry.id}
      style={{}}
      title="Adicionar Favorito"
    >
      <i className="fas fa-thumbs-up" />
      &nbsp;
      <span>Pin</span>
    </button>
  );
}

export function FavoriteRemoveButton({
  handleFavorite,
  entry,
}: FavoriteButtonInterface) {
  const { isEditing } = useContext(AppSettingsContext);

  return (
    <button
      onClick={() => handleFavorite(entry.id)}
      disabled={isEditing.isEditing && isEditing.id !== entry.id}
      style={{}}
      title="Remover Favorito"
    >
      <i className="fas fa-exclamation-circle" />
      &nbsp;
      <span>Unpin</span>
    </button>
  );
}

export default FavoriteButton;
