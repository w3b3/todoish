import React from "react";
import Clock from "./clock/clock";
import { TaskManagement } from "./taskManagement/TaskManagement";
import { AppSettingsProvider } from "../context/appSettingsContext";
import { Header } from "./Header";
import { CountdownModal } from "./CountdownModal";
import { Logo } from "./Logo";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "../theme/theme";

function App() {
  return (
    <AppSettingsProvider>
      <ThemeProvider theme={theme}>
        <Header>
          <Clock />
          <Logo />
          <CountdownModal />
        </Header>
        <TaskManagement />
      </ThemeProvider>
    </AppSettingsProvider>
  );
}

export default App;
