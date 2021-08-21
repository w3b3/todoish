import React from "react";
import Clock from "./clock/clock";
import { TaskManagement } from "./taskManagement/TaskManagement";
import { AppSettingsProvider } from "../context/appSettingsContext";

function App() {
  return (
    <AppSettingsProvider>
      <main
        id="App-Main"
        style={
          {
            /*use index.css*/
          }
        }
      >
        <Clock />
        <TaskManagement />
      </main>
    </AppSettingsProvider>
  );
}

export default App;
