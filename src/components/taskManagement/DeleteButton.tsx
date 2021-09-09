import { DeleteButtonInterface, Locale } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";

export function DeleteButton({ handleDelete, entry }: DeleteButtonInterface) {
  const { locale, isEditing } = useContext(AppSettingsContext);

  return isEditing.isEditing ? (
    <button onClick={() => handleDelete(entry.id)} style={{}}>
      <i className="fas fa-trash-alt" />
      &nbsp;
      <span> {locale === Locale.BR ? STRINGS.ERASE.pt : STRINGS.ERASE.en}</span>
    </button>
  ) : null;
}
