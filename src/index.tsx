import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ClientContextProvider } from "./Data/ClientContext";
import { UserContextProvider } from "./Data/UserContext";
import { FilterContextProvider } from "./Data/FilterContext";
import { GlobalModal } from "./Componets/Dashboard/Modals/GlobalModal";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <ClientContextProvider>
        <GlobalModal>
          <FilterContextProvider>
            <App />
          </FilterContextProvider>
        </GlobalModal>
      </ClientContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
