import { EditButtonInterface, Locale } from "../../types/types";
import React, { useContext } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { STRINGS } from "../../strings/strings";
import { Button } from "@material-ui/core";

export function EditButton({ handleEdit, entry }: EditButtonInterface) {
  const { locale, isEditing } = useContext(AppSettingsContext);

  return isEditing.isEditing || entry.isDone ? null : (
    <Button
      variant={"contained"}
      color={"secondary"}
      onClick={() => handleEdit(entry.id)}
      // color={"secondary"}
      startIcon={<i className="fas fa-angle-double-down" />}
      // style={{ backgroundColor: "white", color: "gray" }}
    >
      {/*<span className="hidden-mobile">&nbsp;</span>*/}
      <span>
        {locale === Locale.BR ? STRINGS.EDIT_TASK.pt : STRINGS.EDIT_TASK.en}
      </span>
    </Button>
  );
}
