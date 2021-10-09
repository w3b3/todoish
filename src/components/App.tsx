import React from "react";
import Clock from "./clock/clock";
import { TaskManagement } from "./taskManagement/TaskManagement";
import { AppSettingsProvider } from "../context/appSettingsContext";
import { Header } from "./Header";
import { Logo } from "./Logo";
import { Button } from "@material-ui/core";

function App() {
  return (
    <AppSettingsProvider>
      <Header>
        <Clock />
        <Logo />
        {/*<CountdownModal />*/}
        <Button
          variant={"text"}
          title="Menu"
          startIcon={<i className="fas fa-bars" />}
        >
          Menu
        </Button>
      </Header>
      <TaskManagement />
    </AppSettingsProvider>
  );
}

export default App;
