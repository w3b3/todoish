import React from "react";
import Clock from "./clock/clock";
import { TaskManagement } from "./taskManagement/TaskManagement";
import { Header } from "./Header";
import { Logo } from "./Logo";
import { UserAvatar } from "./UserAvatar";

function App() {
  return (
    <>
      <Header>
        <Clock />
        <Logo />
        <UserAvatar />
      </Header>
      <TaskManagement />
    </>
  );
}

export default App;
