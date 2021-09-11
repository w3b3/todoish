import React, { useContext, useEffect, useState } from "react";
import AppSettingsContext from "../../context/appSettingsContext";

const clockWrapper = {
  display: "flex",
  justifyContent: "space-between" /*TODO: center in mobile*/,
  alignItems: "center",
  flexWrap: "wrap",
  width: "100%",
  height: "clamp(50px, 10vh, 15vh)",
  textAlign: "center",
  position: "sticky",
  left: 0,
  top: 0,
  backgroundColor: "#FDD401",
  borderBottom: "1px solid rgb(51 51 51 / 28%)",
  boxShadow: "0 -15px 25px rgb(51 51 51)",
  zIndex: 100,
} as React.CSSProperties;

const Clock = () => {
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
    <section id="clock-root-wrapper" style={clockWrapper}>
      <img
        style={{ height: "50%" }}
        src="todoish-logos_transparent.png"
        alt="kind of a TODO app"
      />
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span style={{ whiteSpace: "nowrap" }}>
          <i
            className="fas fa-clock"
            style={{
              marginRight: "6px",
            }}
          />
          {new Intl.DateTimeFormat(locale, timeOptions).format(date)}
        </span>
        &nbsp;
        <span style={{ whiteSpace: "nowrap" }}>
          <i
            className="fas fa-calendar-alt"
            style={{
              marginRight: "6px",
            }}
          />
          {new Intl.DateTimeFormat(locale, dateOptions).format(date)}
        </span>
      </section>
    </section>
  );
};

export default Clock;
