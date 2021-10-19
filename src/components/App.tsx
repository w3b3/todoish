import React, { useContext, useState } from "react";
import Clock from "./clock/clock";
import { TaskManagement } from "./taskManagement/TaskManagement";
import AppSettingsContext from "../context/appSettingsContext";
import { Header } from "./Header";
import { Logo } from "./Logo";
import {
  Box,
  Button,
  createStyles,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  SwipeableDrawer,
  Switch,
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
          {/*<Container>*/}
          <DialogTitle>Settings menu</DialogTitle>
          <DialogContent classes={{ root: styles.dialogRoot }}>
            <FormGroup style={{ marginLeft: theme.spacing(2) }}>
              <Typography>
                {locale === Locale.BR
                  ? STRINGS.LANGUAGE_SWITCHER.pt
                  : STRINGS.LANGUAGE_SWITCHER.en}
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="locale-select-label">Locale</InputLabel>
                <Select
                  id="locale-select"
                  label="Locale"
                  labelId={"locale-select-label"}
                  onChange={handleLocaleClick}
                  value={locale}
                >
                  <MenuItem value={"pt-br"}>Portugues</MenuItem>
                  <MenuItem value={"en-us"}>English</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>
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
          {/*</Container>*/}
        </SwipeableDrawer>
      </Header>
      <TaskManagement />
    </>
  );
}

export default App;
