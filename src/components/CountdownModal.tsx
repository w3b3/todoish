import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  LinearProgress,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";

const CountdownModalStyles = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    dialog: {
      // "& button": {
      //   border: "4px solid transparent",
      //   color: "gray",
      // },
      // "& button:hover": {
      //   border: "4px solid crimson",
      // },
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
    paperOverride: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      color: "white",
    },
    primaryButton: {
      backgroundColor: "#fdd401",
      fontWeight: "bold",
      // "&:hover": {
      //   backgroundColor: "#fdd401",
      // },
    },
    primaryButtonLabel: {
      color: "#000",
    },
    secondaryButton: {
      backgroundColor: "#333",
      fontWeight: "normal",
      // "&:hover": {
      //   backgroundColor: "#fdd401",
      // },
    },
    secondaryButtonLabel: {
      color: "ghostwhite",
    },
    timer: {
      backgroundColor: "tomato",
      color: "whitesmoke",
      border: "4px solid whitesmoke",
      fontWeight: "bold",
      "&:hover, &:active, &:focus": {
        backgroundColor: "black",
        color: "tomato",
        borderColor: "tomato",
      },
    },
  })
);

export function CountdownModal() {
  const countdownModalStyles = CountdownModalStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openConfigurationSettings, setOpenConfigurationSettings] =
    useState(false);
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const getN60SecBlocks = (n: number) => 60 * 1000 * n;
  const formatTimeCountdown = () => {
    return new Date(Math.round(timer))
      .toUTCString()
      .split(" ")[4]
      .split(":")
      .slice(1)
      .join(":");
  };
  const openModal = () => {
    setIsModalOpen(true);
    const _s = getN60SecBlocks(15);
    setStartTime(_s);
    setTimer(_s);
  };
  const closeModal = useCallback(() => {
    if (isModalOpen) {
      setIsModalOpen(false);
      setStartTime(0);
      setTimer(0);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen && timer > 0) {
      setTimeout(() => setTimer(timer - 1000), 1000);
    } else {
      closeModal();
    }
  }, [timer, closeModal, isModalOpen]);

  const getProgressPercentage = () => {
    return Math.trunc((timer / startTime) * 100) / 100;
  };

  const openConfiguration = () => {
    setOpenConfigurationSettings(!openConfigurationSettings);
    // setTimer(0);
  };
  const decideStyle = (isPrimary: boolean) => {
    return isPrimary
      ? {
          root: countdownModalStyles.primaryButton,
          label: countdownModalStyles.primaryButtonLabel,
        }
      : {
          root: countdownModalStyles.secondaryButton,
          label: countdownModalStyles.secondaryButtonLabel,
        };
  };
  return (
    <>
      <Button className={countdownModalStyles.timer} onClick={openModal}>
        <i className="fas fa-stopwatch" />
        &nbsp;Timer
      </Button>
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        fullScreen={true}
        className={countdownModalStyles.dialog}
        classes={{ paper: countdownModalStyles.paperOverride }}
      >
        <DialogContent
          classes={{ root: countdownModalStyles.dialogContentOverride }}
        >
          {openConfigurationSettings ? (
            <section>Configurations open</section>
          ) : (
            <>
              <Typography variant={"h1"}>{formatTimeCountdown()}</Typography>
              <LinearProgress
                classes={{
                  root: countdownModalStyles.progressBar,
                }}
                variant="determinate"
                value={getProgressPercentage() * 100}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!openConfigurationSettings && (
            <Button
              classes={decideStyle(!openConfigurationSettings)}
              onClick={closeModal}
            >
              Task completed
            </Button>
          )}
          <Button
            classes={decideStyle(openConfigurationSettings)}
            // variant={openConfigurationSettings ? "contained" : "outlined"}
            onClick={openConfiguration}
          >
            {openConfigurationSettings ? "Save config" : "Config timer"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
