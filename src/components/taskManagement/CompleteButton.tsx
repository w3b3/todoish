import { CompleteButtonInterface, Locale } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";
import { Button, useMediaQuery } from "@material-ui/core";
import { theme } from "../../theme/theme";

export function CompleteButton({
  handleComplete,
  entry,
}: CompleteButtonInterface) {
  const { locale, isEditing } = useContext(AppSettingsContext);
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return entry.isDone || isEditing.isEditing ? null : (
    <Button
      onClick={() => handleComplete(entry.id)}
      disabled={isEditing.isEditing && isEditing.id !== entry.id}
      variant={"outlined"}
      color={"primary"}
    >
      <i className="fas fa-check-circle" />
      <span>
        &nbsp;
        {locale === Locale.BR
          ? STRINGS.COMPLETE_TASK.pt
          : STRINGS.COMPLETE_TASK.en}
      </span>
    </Button>
  );
}
