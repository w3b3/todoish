import { CancelEditButtonInterface, Locale } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";
import { Button } from "@material-ui/core";

export function CancelEditButton({
  handleCancelEdit,
}: CancelEditButtonInterface) {
  const { locale, isEditing } = useContext(AppSettingsContext);

  return isEditing.isEditing ? (
    <Button
      onClick={() => handleCancelEdit()}
      style={{ backgroundColor: "white", color: "gray" }}
    >
      <i className="fas fa-arrow-alt-circle-left" />
      <span className="hidden-mobile">&nbsp;</span>
      <span>
        {locale === Locale.BR ? STRINGS.CANCEL.pt : STRINGS.CANCEL.en}
      </span>
    </Button>
  ) : null;
}
