import { CompleteButtonInterface, Locale } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";
import { Button } from "@material-ui/core";

export function CompleteButton({
  handleComplete,
  entry,
}: CompleteButtonInterface) {
  const { locale, isEditing } = useContext(AppSettingsContext);
  return entry.isDone || isEditing.isEditing ? null : (
    <Button
      color={"primary"}
      variant={"contained"}
      onClick={() => handleComplete(entry.id)}
      disabled={isEditing.isEditing && isEditing.id !== entry.id}
      // style={{ backgroundColor: "green", color: "white" }}
      title="Concluido"
      startIcon={<i className="fas fa-check-circle" />}
    >
      {/*<span className="hidden-mobile">&nbsp;</span>*/}
      <span>
        {locale === Locale.BR
          ? STRINGS.COMPLETE_TASK.pt
          : STRINGS.COMPLETE_TASK.en}
      </span>
    </Button>
  );
}
