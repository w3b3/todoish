import { EditButtonInterface, Locale } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";
import { Button } from "@material-ui/core";

export function EditButton({ handleEdit, entry }: EditButtonInterface) {
  const { locale, isEditing } = useContext(AppSettingsContext);

  return isEditing.isEditing || entry.isDone ? null : (
    <Button
      onClick={() => handleEdit(entry.id)}
      style={{ backgroundColor: "white", color: "gray" }}
    >
      <i className="fas fa-angle-double-down" />
      <span className="hidden-mobile">&nbsp;</span>
      <span>
        {locale === Locale.BR ? STRINGS.EDIT_TASK.pt : STRINGS.EDIT_TASK.en}
      </span>
    </Button>
  );
}
