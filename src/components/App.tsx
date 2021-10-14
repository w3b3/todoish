import React, { useContext, useState } from "react";
import Clock from "./clock/clock";
import { TaskManagement } from "./taskManagement/TaskManagement";
import AppSettingsContext from "../context/appSettingsContext";
import { Header } from "./Header";
import { Logo } from "./Logo";
import {
  Button,
  Container,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core";
import { Locale } from "../types/types";
import { STRINGS } from "../strings/strings";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { locale, setLocale } = useContext(AppSettingsContext);
  const handleLocaleClick = () => {
    setLocale(locale === "pt-br" ? "en-us" : "pt-br");
  };
  return (
    <>
      <Header>
        <Clock />
        <Logo />
        <Button
          variant={"text"}
          title="Menu"
          startIcon={<i className="fas fa-bars" />}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          Menu
        </Button>
        <SwipeableDrawer
          anchor={"right"}
          open={isDrawerOpen}
          onOpen={() => setIsDrawerOpen(true)}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Container>
            <Typography variant={"body1"}>
              {locale === Locale.BR
                ? STRINGS.LANGUAGE_SWITCHER.pt
                : STRINGS.LANGUAGE_SWITCHER.en}
            </Typography>

            <Button variant={"contained"} onClick={handleLocaleClick}>
              {locale}
            </Button>
          </Container>
        </SwipeableDrawer>
      </Header>
      <TaskManagement />
    </>
  );
}

export default App;
