import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { prefersReducedMotion } from "./lib/motion";

if (!prefersReducedMotion()) document.documentElement.classList.add("js-motion");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
