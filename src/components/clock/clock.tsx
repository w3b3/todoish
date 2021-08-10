import React from "react";

const Clock = () => {
  const date = new Date();
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
        {new Intl.DateTimeFormat("pt-br", timeOptions).format(date)}
      </section>
      <section style={{ color: "#ffffff4f", fontSize: "1.25rem" }}>
        <i
          className="fas fa-calendar-alt"
          style={{
            fontSize: "1em",
            display: "inline-block",
            marginRight: "6px",
          }}
        />
        {new Intl.DateTimeFormat("pt-br", dateOptions).format(date)}
      </section>
    </article>
  );
};

export default Clock;
