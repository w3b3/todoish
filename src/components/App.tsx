import React from "react";
import Clock from "./clock/clock";
import { TaskManagement } from "./taskManagement/TaskManagement";
import { AppSettingsProvider } from "../context/appSettingsContext";
import { Header } from "./Header";
import { CountdownModal } from "./CountdownModal";
import { Logo } from "./Logo";

function App() {
  return (
    <AppSettingsProvider>
      <Header>
        <Clock />
        <Logo />
        <CountdownModal />
      </Header>
      <TaskManagement />
    </AppSettingsProvider>
  );
}

export default App;
