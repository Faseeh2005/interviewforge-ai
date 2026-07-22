import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";
import "./styles/components.css";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import "./styles/theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>

      <BrowserRouter>

        <App />

      </BrowserRouter>

    </AuthProvider>
  </React.StrictMode>
);