import React, { useContext, useEffect, useState } from "react";
import AppSettingsContext from "../../context/appSettingsContext";

const Clock = () => {
  const { locale, setLocale } = useContext(AppSettingsContext);
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

  const handleLocaleClick = () => {
    setLocale(locale === "pt-br" ? "en-us" : "pt-br");
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "3em",
        height: "20vh",
        textAlign: "center",
      }}
    >
      <section
        style={{
          padding: "1rem",
          fontSize: "2rem",
          textShadow: "0 0 6px black",
        }}
      >
        <i
          className="fas fa-clock"
          style={{
            display: "inline-block",
            marginRight: "6px",
          }}
        />
        {new Intl.DateTimeFormat(locale, timeOptions).format(date)}
      </section>
      <button
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          textTransform: "uppercase",
        }}
        onClick={handleLocaleClick}
      >
        {locale}
      </button>
      <section
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <i
          className="fas fa-calendar-alt"
          style={{
            fontSize: "1em",
            display: "inline-block",
            marginRight: "6px",
          }}
        />
        {new Intl.DateTimeFormat(locale, dateOptions).format(date)}
      </section>
    </section>
  );
};

export default Clock;
