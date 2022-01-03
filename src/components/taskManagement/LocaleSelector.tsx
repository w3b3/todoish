import {
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { theme } from "../../theme/theme";
import React from "react";

export function LocaleSelector(props: { onChange: () => void; value: string }) {
  return (
    <FormGroup style={{ marginLeft: theme.spacing(2) }}>
      <FormControl fullWidth>
        <InputLabel id="locale-select-label">Locale</InputLabel>
        <Select
          id="locale-select"
          label="Locale"
          labelId={"locale-select-label"}
          onChange={props.onChange}
          value={props.value}
        >
          <MenuItem value={"pt-br"}>Portugues</MenuItem>
          <MenuItem value={"en-us"}>English</MenuItem>
        </Select>
      </FormControl>
    </FormGroup>
  );
}