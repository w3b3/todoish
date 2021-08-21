import { RestoreButtonInterface } from "../../types/types";
import React from "react";

export function RestoreButton({
  handleRestore,
  entry,
}: RestoreButtonInterface) {
  return entry.isDone ? (
    <button
      onClick={() => handleRestore(entry.id)}
      style={{
        // marginRight: "1em",
        padding: "0.25em 1em",
        // background: "#adff2f4a none repeat scroll 0% 0%",
        background: "lightyellow",
        color: "black",
        borderRadius: "0.25em",
        border: "1px solid white",
        fontWeight: "bold",
      }}
      title="Restaurar"
    >
      <span className="hidden-mobile">Restaurar</span>{" "}
      <i className="fas fa-trash-restore" />
    </button>
  ) : null;
}
