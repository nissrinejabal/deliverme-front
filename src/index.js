import React from "react";
import ReactDOM from "react-dom";
import "./custom.scss";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import { MainFormProvider } from "./context/MainFormContext";


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <MainFormProvider>
        <App />
      </MainFormProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
