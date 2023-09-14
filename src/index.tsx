// import React from "react";
// import App from "./App";
// import ReactDOM from "react-dom";

// ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import AppRoutes from "./AppRoutes";
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Router>
    <AppRoutes />
  </Router>
);
