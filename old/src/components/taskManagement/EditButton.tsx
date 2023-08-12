import { EditButtonInterface, Locale } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";
import { Button, useMediaQuery } from "@material-ui/core";
import { theme } from "../../theme/theme";

export function EditButton({ handleEdit, entry }: EditButtonInterface) {
  const { locale, isEditing } = useContext(AppSettingsContext);
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return isEditing.isEditing || entry.isDone ? null : (
    <Button onClick={() => handleEdit(entry.id)}>
      <i className="fas fa-angle-double-down" />
      {matches && (
        <span>
          {locale === Locale.BR ? STRINGS.EDIT_TASK.pt : STRINGS.EDIT_TASK.en}
        </span>
      )}
    </Button>
  );
}
