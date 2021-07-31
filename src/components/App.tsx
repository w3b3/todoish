import React from "react";
import "./App.css";
import Clock from "./clock/clock";
import { TaskManagement } from "./taskManagement/TaskManagement";

function App() {
  return (
    <main
      style={{
        // padding: "2rem",
        margin: "0 auto",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <Clock />
      <TaskManagement />
    </main>
  );
}

export default App;
