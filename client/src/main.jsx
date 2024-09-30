import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { initDB } from "react-indexed-db-hook";
import dbConfig from "./Storage/database.js";

initDB(dbConfig);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
