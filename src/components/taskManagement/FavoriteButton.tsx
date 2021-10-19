import { FavoriteButtonInterface, Locale } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";
import { Button } from "@material-ui/core";

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
    <Button
      color={"secondary"}
      variant={"contained"}
      onClick={() => handleFavorite(entry.id)}
      disabled={isEditing.isEditing && isEditing.id !== entry.id}
      title={locale === Locale.BR ? STRINGS.PIN_TASK.pt : STRINGS.PIN_TASK.en}
      startIcon={<i className="fas fa-thumbs-up" />}
    >
      <span>
        {locale === Locale.BR ? STRINGS.PIN_TASK.pt : STRINGS.PIN_TASK.en}
      </span>
    </Button>
  );
}

export function FavoriteRemoveButton({
  handleFavorite,
  entry,
}: FavoriteButtonInterface) {
  const { locale, isEditing } = useContext(AppSettingsContext);

  return (
    <Button
      onClick={() => handleFavorite(entry.id)}
      disabled={isEditing.isEditing && isEditing.id !== entry.id}
      color={"secondary"}
      variant={"contained"}
      title={
        locale === Locale.BR ? STRINGS.UNPIN_TASK.pt : STRINGS.UNPIN_TASK.en
      }
      startIcon={<i className="fas fa-exclamation-circle" />}
    >
      <span>
        {locale === Locale.BR ? STRINGS.UNPIN_TASK.pt : STRINGS.UNPIN_TASK.en}
      </span>
    </Button>
  );
}

export default FavoriteButton;
