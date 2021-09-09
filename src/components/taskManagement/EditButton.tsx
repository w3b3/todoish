import { EditButtonInterface, Locale } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";

export function EditButton({ handleEdit, entry }: EditButtonInterface) {
  const { locale, isEditing } = useContext(AppSettingsContext);

  return isEditing.isEditing ? null : (
    <button onClick={() => handleEdit(entry.id)} style={{}}>
      <i className="fas fa-angle-double-down" />
      &nbsp;
      <span>
        {locale === Locale.BR ? STRINGS.EDIT_TASK.pt : STRINGS.EDIT_TASK.en}
      </span>
    </button>
  );
}
