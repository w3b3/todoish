import { CompleteButtonInterface, Locale } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";

export function CompleteButton({
  handleComplete,
  entry,
}: CompleteButtonInterface) {
  const { locale, isEditing } = useContext(AppSettingsContext);
  // !isEditing.isEditing && !entry.isDone
  return isEditing.isEditing ? null : (
    <button
      onClick={() => handleComplete(entry.id)}
      disabled={isEditing.isEditing && isEditing.id !== entry.id}
      style={{}}
      title="Concluido"
    >
      <i className="fas fa-check-circle" />
      &nbsp;
      <span>
        {locale === Locale.BR
          ? STRINGS.COMPLETE_TASK.pt
          : STRINGS.COMPLETE_TASK.en}
      </span>
    </button>
  );
}
