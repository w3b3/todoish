import React from "react";
import Clock from "./clock/clock";
import { TaskManagement } from "./taskManagement/TaskManagement";
import { AppSettingsProvider } from "../context/appSettingsContext";
import { Header } from "./Header";

function App() {
  return (
    <AppSettingsProvider>
      <Header>
        <Clock />
      </Header>
      <main id="App-Main">
        <TaskManagement />
      </main>
    </AppSettingsProvider>
  );
}

export default App;
