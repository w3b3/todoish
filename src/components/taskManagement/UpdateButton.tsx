import { UpdateButtonInterface, Locale } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";
import { Button } from "@material-ui/core";

export function UpdateButton({ handleAdd }: UpdateButtonInterface) {
  const { locale, isEditing } = useContext(AppSettingsContext);

  return isEditing.isEditing ? (
    <Button
      variant={"contained"}
      color={"primary"}
      onClick={handleAdd}
      startIcon={<i className="" />}
    >
      <span>
        {locale === Locale.BR ? STRINGS.UPDATE_TASK.pt : STRINGS.UPDATE_TASK.en}
      </span>
    </Button>
  ) : null;
}
