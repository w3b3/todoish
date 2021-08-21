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
        padding: "1em",
        marginLeft: "4px",
      }}
      onClick={handleAddTask}
      disabled={!taskName}
      title="Salvar"
    >
      <i className="fas fa-cloud-upload-alt" />
    </button>
  );
}
