import React, { useContext, useState } from "react";
import Clock from "./clock/clock";
import { TaskManagement } from "./taskManagement/TaskManagement";
import AppSettingsContext from "../context/appSettingsContext";
import { Header } from "./Header";
import { Logo } from "./Logo";
import {
  Button,
  Container,
  createStyles,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core";
import { Locale } from "../types/types";
import { STRINGS } from "../strings/strings";

const useStyles = makeStyles(() =>
  createStyles({
    containerRoot: {
      display: "flex",
      flexDirection: "column",
      height: "inherit",
    },
    drawerRoot: {
      maxWidth: "90vw",
      backgroundColor: "#ffdafb",
    },
    dialogRoot: {
      flex: 1,
    },
  })
);

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { locale, setLocale } = useContext(AppSettingsContext);
  const styles = useStyles();
  const handleLocaleClick = () => {
    setLocale(locale === "pt-br" ? "en-us" : "pt-br");
  };
  const handleToggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  return (
    <>
      <Header>
        <Clock />
        <Logo />
        <Button
          variant={"text"}
          title="Menu"
          startIcon={<i className="fas fa-bars" />}
          onClick={handleToggleDrawer}
        >
          Menu
        </Button>
        <SwipeableDrawer
          classes={{ paper: styles.drawerRoot }}
          anchor={"right"}
          open={isDrawerOpen}
          onOpen={() => setIsDrawerOpen(true)}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Container>
            <DialogTitle>Settings menu</DialogTitle>
            <DialogContent classes={{ root: styles.dialogRoot }}>
              <section>
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  onClick={handleLocaleClick}
                >
                  {locale === Locale.BR
                    ? STRINGS.LANGUAGE_SWITCHER.pt
                    : STRINGS.LANGUAGE_SWITCHER.en}
                </Button>
              </section>
            </DialogContent>
            <DialogActions>
              <Button
                variant={"contained"}
                color={"primary"}
                onClick={handleToggleDrawer}
              >
                Close
              </Button>
            </DialogActions>
          </Container>
        </SwipeableDrawer>
      </Header>
      <TaskManagement />
    </>
  );
}

export default App;
