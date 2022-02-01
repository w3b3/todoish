import {
  createStyles,
  Grid,
  LinearProgress,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Task } from "../../types/types";

const CountdownModalStyles = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    progressBar: {
      height: "2px",
      width: "100%",
    },
  })
);

const COUNTDOWN_TIME = 25;
const PROGRESS_BAR_SLOTS = 100;

export function TaskCountdown({
  entry,
  handleDelete,
}: {
  entry: Task;
  handleDelete: (id: string) => void;
}) {
  const countdownModalStyles = CountdownModalStyles();
  const [remaining, setRemaining] = useState(COUNTDOWN_TIME);
  useEffect(() => {
    if (remaining === 0) {
      handleDelete(entry.id);
    } else {
      setTimeout(() => setRemaining(remaining - 1), 1000);
    }
  }, [remaining]);

  return (
    <Grid container>
      <LinearProgress
        variant="determinate"
        value={(remaining * PROGRESS_BAR_SLOTS) / COUNTDOWN_TIME}
        classes={{
          root: countdownModalStyles.progressBar,
        }}
      />
    </Grid>
  );
}
