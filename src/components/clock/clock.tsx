import React, { useContext, useEffect, useState } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

const ClockStyles = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    root: {
      width: "clamp(auto, 35%,350px)",
      lineHeight: 1,
      display: "flex",
      flexDirection: "column-reverse",
      alignItems: "start",
      [breakpoints.down("sm")]: {
        display: "none",
      },
    },
    time: {
      whiteSpace: "nowrap",
      [breakpoints.down("sm")]: {},
    },
    date: {
      whiteSpace: "nowrap",
      [breakpoints.down("sm")]: {},
    },
    icon: {
      marginRight: "6px",
    },
  })
);

const Clock = () => {
  const clockStyles = ClockStyles();
  const { locale } = useContext(AppSettingsContext);
  const [date, setDate] = useState(() => new Date());
  useEffect(() => {
    setTimeout(() => setDate(new Date()), 10000);
  }, [date]);
  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_datetimeformat
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat */
  const timeOptions = {
    hour: "2-digit", // 2-digit, numeric
    minute: "2-digit",
  } as const; /*https://stackoverflow.com/questions/66590691/typescript-type-string-is-not-assignable-to-type-numeric-2-digit-in-d*/
  /*    interface DateTimeFormatOptions node_modules/typescript/lib/lib.es5.d.ts */
  const dateOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  } as const;

  return (
    <section id="clock-root-wrapper" className={clockStyles.root}>
      <Typography className={clockStyles.time}>
        <i className={`fas fa-clock ${clockStyles.icon}`} />
        {new Intl.DateTimeFormat(locale, timeOptions).format(date)}
      </Typography>
      &nbsp;
      <Typography className={clockStyles.date}>
        <i className={`fas fa-calendar-alt ${clockStyles.icon}`} />
        {new Intl.DateTimeFormat(locale, dateOptions).format(date)}
      </Typography>
    </section>
  );
};

export default Clock;
