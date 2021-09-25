import { DeleteButtonInterface, Locale } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";
import { Button } from "@material-ui/core";

export function DeleteButton({ handleDelete, entry }: DeleteButtonInterface) {
  const { locale } = useContext(AppSettingsContext);

  return entry.isDone ? (
    <Button
      onClick={() => handleDelete(entry.id)}
      style={{ backgroundColor: "tomato", color: "white" }}
    >
      <i className="fas fa-trash-alt" />
      <span className="hidden-mobile">&nbsp;</span>
      <span> {locale === Locale.BR ? STRINGS.ERASE.pt : STRINGS.ERASE.en}</span>
    </Button>
  ) : null;
}
