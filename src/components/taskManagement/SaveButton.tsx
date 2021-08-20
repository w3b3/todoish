import React from "react";

export function SaveButton({
  handleAddTask,
  taskName,
}: {
  handleAddTask: () => void;
  taskName: string;
}) {
  return (
    <button
      style={{
        border: "1px solid darkgray",
        padding: "1em",
        backgroundColor: "gray",
        borderRadius: "8px",
        marginLeft: "4px",
        boxShadow: "0 0 4px 4px #00000045",
      }}
      onClick={handleAddTask}
      disabled={!taskName}
      title="Salvar"
    >
      <i
        className="fas fa-cloud-upload-alt"
        style={{ textShadow: "0 0 8px black", color: "greenyellow" }}
      />
    </button>
  );
}
