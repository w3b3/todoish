import {
  createStyles,
  Grid,
  LinearProgress,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useEffect, useState } from "react";

const CountdownModalStyles = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    progressBar: {
      height: "2px",
      width: "100%",
    },
  })
);

export function TaskCountdown({
  countdownAutoDelete,
}: {
  countdownAutoDelete: () => void;
}) {
  const countdownModalStyles = CountdownModalStyles();
  const [remaining, setRemaining] = useState(100);
  useEffect(() => {
    if (remaining === 0) {
      countdownAutoDelete();
    } else {
      setTimeout(() => setRemaining(remaining - 1), 1000);
    }
    // eslint-disable-next-line
  }, [remaining]);
  return (
    <Grid container>
      <LinearProgress
        variant="determinate"
        value={remaining}
        classes={{
          root: countdownModalStyles.progressBar,
        }}
      />
    </Grid>
  );
}
