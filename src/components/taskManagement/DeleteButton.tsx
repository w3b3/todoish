import { DeleteButtonInterface, Locale } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";

export function DeleteButton({ handleDelete, entry }: DeleteButtonInterface) {
  const { locale } = useContext(AppSettingsContext);

  return entry.isDone ? (
    <button
      onClick={() => handleDelete(entry.id)}
      style={{ backgroundColor: "crimson", color: "white" }}
    >
      <i className="fas fa-trash-alt" />
      <span className="hidden-mobile">&nbsp;</span>
      <span> {locale === Locale.BR ? STRINGS.ERASE.pt : STRINGS.ERASE.en}</span>
    </button>
  ) : null;
}
