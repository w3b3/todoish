import {
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from "@material-ui/core";
import { Locale } from "../../types/types";
import { STRINGS } from "../../strings/strings";
import { theme } from "../../theme/theme";
import React from "react";

export function TaskSummary(props: {
  locale: string;
  totalNumberOfTasks: number;
  onClick: () => void;
}) {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Typography display={"inline"}>
        <i className="fas fa-tasks" />
        &nbsp;
        {`${
          props.locale === Locale.BR
            ? STRINGS.LIST_TITLE.pt
            : STRINGS.LIST_TITLE.en
        } (${props.totalNumberOfTasks})`}
      </Typography>
      <FormGroup style={{ marginLeft: theme.spacing(2) }}>
        <FormControlLabel
          control={<Switch onClick={props.onClick} />}
          label="Show only highlighted"
        />
      </FormGroup>
    </Grid>
  );
}