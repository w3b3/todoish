import { UpdateButtonInterface, Locale } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";
import { Button, useMediaQuery } from "@material-ui/core";
import { theme } from "../../theme/theme";

export function UpdateButton({ handleAdd }: UpdateButtonInterface) {
  const { locale, isEditing } = useContext(AppSettingsContext);
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return isEditing.isEditing ? (
    <Button onClick={handleAdd}>
      <i className="fas fa-check-circle" />

      {matches && (
        <span>
          {locale === Locale.BR
            ? STRINGS.UPDATE_TASK.pt
            : STRINGS.UPDATE_TASK.en}
        </span>
      )}
    </Button>
  ) : null;
}
