import React, { useContext, useEffect, useState } from "react";
import AppSettingsContext from "../../context/appSettingsContext";

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
    <section
      id="clock-root-wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "3em",
        width: "100%",
        height: "auto",
        textAlign: "center",
        position: "sticky",
        left: 0,
        top: 0,
        backgroundColor: "#f0efeb",
        borderBottom: "1px solid rgb(51 51 51 / 28%)",
        boxShadow: "0 -15px 25px rgb(51 51 51)",
        zIndex: 100,
      }}
    >
      <section
        style={{
          padding: "0.5rem",
          fontSize: "2rem",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <span style={{ whiteSpace: "nowrap" }}>
          <i
            className="fas fa-clock"
            style={{
              display: "inline-block",
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
              fontSize: "1em",
              display: "inline-block",
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
