import React from "react";
import ReactDOM from "react-dom/client";
import { CartApp } from "./CartApp";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartApp />
    </BrowserRouter>
  </React.StrictMode>
);
