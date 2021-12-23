import React, { useContext, useState } from "react";
import Clock from "./clock/clock";
import { TaskManagement } from "./taskManagement/TaskManagement";
import AppSettingsContext from "../context/appSettingsContext";
import { Header } from "./Header";
import { Logo } from "./Logo";
import { UserAvatar } from "./UserAvatar";
import {
  Button,
  createStyles,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core";
import { Locale } from "../types/types";
import { STRINGS } from "../strings/strings";
import { theme } from "../theme/theme";

const useStyles = makeStyles(() =>
  createStyles({
    containerRoot: {
      display: "flex",
      flexDirection: "column",
    },
    drawerRoot: {
      width: "min(90vw, 360px)",
      height: "100vh",
      backgroundColor: "#FDD401",
      backgroundImage:
        "linear-gradient(43deg, #FFCC70 0%, #C850C0 46%,#4158D0 100%)",
    },
    dialogRoot: {
      // flex: 1,
    },
  })
);

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
