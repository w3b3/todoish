import React, { useContext, useEffect, useState } from "react";
import AppSettingsContext from "../../context/appSettingsContext";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const ClockStyles = makeStyles(({ breakpoints, spacing }: Theme) =>
  createStyles({
    root: {
      width: "clamp(auto, 35%,350px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      // border: `${spacing(1)}px solid crimson`,
      [breakpoints.down("sm")]: {
        flexDirection: "row-reverse",
        lineHeight: 1,
        marginRight: spacing(1),
        width: "100%",
      },
    },
    time: {
      whiteSpace: "nowrap",
      fontSize: "2rem",
      [breakpoints.down("sm")]: {
        fontSize: "1em",
      },
    },
    date: {
      whiteSpace: "nowrap",
      fontSize: "1.5rem",
      [breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
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
    // hour12: true, // TODO: file a bug with Chromium: when this is true, 12:13PM shows as 00:13
    // dayPeriod: "short", // "narrow", "short", " long" yield the same
    hour: "2-digit", // 2-digit, numeric
    minute: "2-digit",
    // second: "numeric",
    // timeZoneName: "short",
    // timeZone: "America/New_York",
  } as const; /*https://stackoverflow.com/questions/66590691/typescript-type-string-is-not-assignable-to-type-numeric-2-digit-in-d*/
  /*    interface DateTimeFormatOptions node_modules/typescript/lib/lib.es5.d.ts */
  const dateOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  } as const;

  return (
    <section id="clock-root-wrapper" className={clockStyles.root}>
      <span className={clockStyles.time}>
        <i className={`fas fa-clock ${clockStyles.icon}`} />
        {new Intl.DateTimeFormat(locale, timeOptions).format(date)}
      </span>
      &nbsp;
      <span className={clockStyles.date}>
        <i className={`fas fa-calendar-alt ${clockStyles.icon}`} />
        {new Intl.DateTimeFormat(locale, dateOptions).format(date)}
      </span>
    </section>
  );
};

export default Clock;
