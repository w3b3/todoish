import { CancelEditButtonInterface, Locale } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";
import { Button, useMediaQuery } from "@material-ui/core";
import { theme } from "../../theme/theme";

export function CancelEditButton({
  handleCancelEdit,
}: CancelEditButtonInterface) {
  const { locale, isEditing } = useContext(AppSettingsContext);
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return isEditing.isEditing ? (
    <Button onClick={() => handleCancelEdit()} variant={"outlined"}>
      <i className="fas fa-arrow-alt-circle-left" />
      {matches && (
        <span>
          {locale === Locale.BR ? STRINGS.CANCEL.pt : STRINGS.CANCEL.en}
        </span>
      )}
    </Button>
  ) : null;
}
