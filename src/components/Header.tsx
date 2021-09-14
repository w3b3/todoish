import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  Theme,
  LinearProgress,
} from "@material-ui/core";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

const HeaderStyles = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      width: "100%",
      height: "clamp(5vh, 80px, 20vh)",
      textAlign: "center",
      position: "sticky",
      left: 0,
      top: 0,
      backgroundColor: "#FDD401",
      borderBottom: "1px solid rgb(51 51 51 / 28%)",
      boxShadow: "0 -15px 25px rgb(51 51 51)",
      zIndex: 100,
      padding: spacing(2),
      [breakpoints.down("sm")]: {
        // border: `${spacing(1)}px solid tomato`,
        padding: spacing(0),
      },
    },
    logo: {
      height: "50%",
    },
    timer: {
      backgroundColor: "tomato",
      color: "whitesmoke",
      border: "3px solid whitesmoke",
      fontWeight: "bold",
      "&:hover, &:active, &:focus": {
        backgroundColor: "black",
        color: "tomato",
      },
    },
    dialog: {
      "& button": {
        border: "4px solid transparent",
        color: "gray",
      },
      "& button:hover": {
        border: "4px solid crimson",
      },
    },
    paperOverride: {
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      color: "white",
    },
    dialogContentOverride: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    progressBar: {
      height: spacing(2),
      width: "100%",
    },
  })
);
export const Header = ({ children }: PropsWithChildren<any>) => {
  const headerStyles = HeaderStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [timer, setTimer] = useState(100);
  const openModal = () => {
    setIsModalOpen(true);
    setTimer(100);
  };
  const closeModal = useCallback(() => {
    if (isModalOpen) {
      setIsModalOpen(false);
      setTimer(0);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen && timer > 0) {
      setTimeout(() => setTimer(timer - 0.1), 100);
    } else {
      closeModal();
    }
  }, [timer, closeModal, isModalOpen]);

  return (
    <header className={headerStyles.root}>
      <img
        className={headerStyles.logo}
        src="todoish-logos_transparent.png"
        alt="kind of a TODO app"
      />
      <Button className={headerStyles.timer} onClick={openModal}>
        <i className="fas fa-pizza-slice" /> Pizza timer
      </Button>
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        fullScreen={true}
        className={headerStyles.dialog}
        classes={{ paper: headerStyles.paperOverride }}
      >
        <DialogContent classes={{ root: headerStyles.dialogContentOverride }}>
          <div>{Math.round(timer)}</div>
          <LinearProgress
            classes={{
              root: headerStyles.progressBar,
            }}
            variant="determinate"
            value={timer}
          />
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} onClick={closeModal}>
            Task completed
          </Button>
          <Button variant={"outlined"} onClick={closeModal}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {children}
    </header>
  );
};
