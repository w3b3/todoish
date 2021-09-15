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
      "& button": {
        border: "4px solid transparent",
        color: "gray",
      },
      "& button:hover": {
        border: "4px solid crimson",
      },
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
  })
);

export function CountdownModal() {
  const countdownModalStyles = CountdownModalStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  return (
    <>
      <Button className={countdownModalStyles.timer} onClick={openModal}>
        <i className="fas fa-pizza-slice" /> Pizza timer
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
          <Typography variant={"h1"}>{formatTimeCountdown()}</Typography>
          <LinearProgress
            classes={{
              root: countdownModalStyles.progressBar,
            }}
            variant="determinate"
            value={getProgressPercentage() * 100}
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
    </>
  );
}
