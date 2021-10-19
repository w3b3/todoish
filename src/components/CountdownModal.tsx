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
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";

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
      backgroundImage: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
    },
    primaryButton: {},
    primaryButtonLabel: {},
    secondaryButton: {},
    secondaryButtonLabel: {},
    timer: {},
  })
);

interface CountdownModalInput {
  options?: {
    cardKeyword?: string;
    cardBody?: string;
  };
}

export function CountdownModal({ options }: CountdownModalInput) {
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

  return (
    <Box>
      <Button variant={"contained"} color={"secondary"} onClick={openModal}>
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
            <Typography variant={"body1"}>Configurations open</Typography>
          ) : (
            <>
              {options?.cardKeyword && (
                <Typography
                  color={"secondary"}
                  variant={"h1"}
                  component={"caption"}
                  style={{ textTransform: "uppercase" }}
                >
                  {options?.cardKeyword}
                </Typography>
              )}
              <LinearProgress
                classes={{
                  root: countdownModalStyles.progressBar,
                }}
                variant="determinate"
                value={getProgressPercentage() * 100}
              />
              <Typography variant={"h2"} color={"primary"}>
                {formatTimeCountdown()}
              </Typography>

              {options?.cardBody && (
                <Typography variant={"body1"}>{options?.cardBody}</Typography>
              )}

              {/*<CircularProgress value={getProgressPercentage() * 100} />*/}
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!openConfigurationSettings && (
            <Button
              color={!openConfigurationSettings ? "primary" : "secondary"}
              variant={"contained"}
              onClick={closeModal}
            >
              Task completed
            </Button>
          )}
          <Button
            color={openConfigurationSettings ? "primary" : "secondary"}
            variant={"contained"}
            onClick={openConfiguration}
          >
            {openConfigurationSettings ? "Save config" : "Config timer"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
