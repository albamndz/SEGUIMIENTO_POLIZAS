import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ValidacionProvider } from "./context/ValidacionContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ValidacionProvider>
      <App />
    </ValidacionProvider>
  </React.StrictMode>
);