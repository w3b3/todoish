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
        border: "none",
        padding: "1em",
        backgroundColor: "gray",
      }}
      onClick={handleAddTask}
      disabled={!taskName}
      title="Salvar"
    >
      <i
        className="fas fa-cloud-upload-alt"
        style={{ textShadow: "0 0 8px white" }}
      />
    </button>
  );
}
