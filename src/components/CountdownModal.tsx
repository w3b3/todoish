import {
  Box,
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  LinearProgress,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { theme } from "../theme/theme";
import { Task } from "../types/types";

const CountdownModalStyles = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    dialog: {},

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
      // backgroundImage: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
    },
    primaryButton: {},
    primaryButtonLabel: {},
    secondaryButton: {},
    secondaryButtonLabel: {},
    timer: {},
  })
);

export function CountdownModal({ entry }: { entry: Task }) {
  const countdownModalStyles = CountdownModalStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openConfigurationSettings, setOpenConfigurationSettings] =
    useState(false);
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const matches = useMediaQuery(theme.breakpoints.up("sm"));

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

  /*TODO: entry replaces options*/

  return (
    <Box>
      <Button onClick={openModal}>
        <i className="fas fa-stopwatch" />
        {matches && "Timer"}
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
            <Typography>Configurations open</Typography>
          ) : (
            <>
              <LinearProgress
                classes={{
                  root: countdownModalStyles.progressBar,
                }}
                variant="determinate"
                value={getProgressPercentage() * 100}
              />
              <Typography>{formatTimeCountdown()}</Typography>

              <Typography>{entry?.name}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!openConfigurationSettings && (
            <Button onClick={closeModal}>Task completed</Button>
          )}
          <Button onClick={openConfiguration}>
            {openConfigurationSettings ? "Save config" : "Config timer"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
