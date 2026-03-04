  import React from "react";
  import * as ReactDOM from "react-dom";
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import "./styles/globals.css"; // Import custom global styles including mobile padding fix
  import "./utils/navHeight"; // Initialize nav height immediately

  // Run axe-core accessibility checks in development (logs violations to console)
  if (import.meta.env.DEV) {
    import("@axe-core/react").then(({ default: axe }) => {
      axe(React, ReactDOM, 1000);
    });
  }

  createRoot(document.getElementById("root")!).render(<App />);
  