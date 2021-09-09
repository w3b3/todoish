import { FavoriteButtonInterface, Locale } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";

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
  const { locale } = useContext(AppSettingsContext);

  return (
    <button
      onClick={() => handleFavorite(entry.id)}
      disabled={isEditing.isEditing && isEditing.id !== entry.id}
      style={{}}
      title="Adicionar Favorito"
    >
      <i className="fas fa-thumbs-up" />
      &nbsp;
      <span>
        {locale === Locale.BR ? STRINGS.PIN_TASK.pt : STRINGS.PIN_TASK.en}
      </span>
    </button>
  );
}

export function FavoriteRemoveButton({
  handleFavorite,
  entry,
}: FavoriteButtonInterface) {
  const { locale, isEditing } = useContext(AppSettingsContext);

  return (
    <button
      onClick={() => handleFavorite(entry.id)}
      disabled={isEditing.isEditing && isEditing.id !== entry.id}
      style={{}}
      title="Remover Favorito"
    >
      <i className="fas fa-exclamation-circle" />
      &nbsp;
      <span>
        {locale === Locale.BR ? STRINGS.UNPIN_TASK.pt : STRINGS.UNPIN_TASK.en}
      </span>
    </button>
  );
}

export default FavoriteButton;
