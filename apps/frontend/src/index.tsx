import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { MetaMaskProvider } from "metamask-react";

import App from "./App";
import { ConnectionProvider } from "./context/ConnectionContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <HashRouter>
    <React.StrictMode>
      <MetaMaskProvider>
        <ConnectionProvider>
          <App />
        </ConnectionProvider>
      </MetaMaskProvider>
    </React.StrictMode>
  </HashRouter>
);
