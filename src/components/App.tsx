import React from "react";
import Clock from "./clock/clock";
import { TaskManagement } from "./taskManagement/TaskManagement";
import { AppSettingsProvider } from "../context/appSettingsContext";

function App() {
  return (
    <AppSettingsProvider>
      <main
        style={{
          margin: "0 auto",
          maxWidth: "500px",
        }}
      >
        <Clock />
        <TaskManagement />
      </main>
    </AppSettingsProvider>
  );
}

export default App;
