import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { AppSettingsProvider } from "./context/appSettingsContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppSettingsProvider>
        <App />
      </AppSettingsProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.unregister();
reportWebVitals();
