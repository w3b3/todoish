import { Locale, RestoreButtonInterface } from "../../types/types";
import React, { useContext } from "react";
import { STRINGS } from "../../strings/strings";
import AppSettingsContext from "../../context/appSettingsContext";
import { Button } from "@material-ui/core";

export function RestoreButton({
  handleRestore,
  entry,
}: RestoreButtonInterface) {
  const { locale } = useContext(AppSettingsContext);

  return entry.isDone ? (
    <Button
      onClick={() => handleRestore(entry.id)}
      // style={{ backgroundColor: "cornflowerblue", color: "white" }}
      variant={"contained"}
      color={"secondary"}
      title="Restaurar"
      startIcon={<i className="fas fa-trash-restore" />}
    >
      <span>
        {locale === Locale.BR ? STRINGS.RESTORE.pt : STRINGS.RESTORE.en}
      </span>
    </Button>
  ) : null;
}
