import React, { useContext, useEffect, useState } from "react";
import AppSettingsContext from "../../context/appSettingsContext";

const Clock = () => {
  const { locale, setLocale } = useContext(AppSettingsContext);
  const [date, setDate] = useState(() => new Date());
  useEffect(() => {
    setTimeout(() => setDate(new Date()), 5000);
  }, [date]);
  /*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_datetimeformat*/
  const timeOptions = {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    // timeZone: "America/New_York",
    // timeZoneName: "short",
    dayPeriod: "short",
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
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "3em",
        height: "20vh",
        marginTop: "2em",
        textAlign: "center",
      }}
    >
      <section
        style={{
          padding: "1rem",
          fontSize: "2rem",
        }}
      >
        <i
          className="fas fa-clock"
          style={{
            fontSize: "1em",
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
          background: "none",
          border: "none",
          color: "gray",
          fontSize: "0.75em",
        }}
        onClick={handleLocaleClick}
      >
        {locale}
      </button>
      <section style={{ color: "#ffffff4f", fontSize: "1.25rem" }}>
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
    </article>
  );
};

export default Clock;
