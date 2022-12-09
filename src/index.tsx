import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalModal } from "./Componets/Dashboard/Modals/GlobalModal";
import { AudienceContextProvider } from "./Data/AudienceContext";
import { ClientContextProvider } from "./Data/ClientContext";
import { FilterContextProvider } from "./Data/FilterContext";
import { UserContextProvider } from "./Data/UserContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <UserContextProvider>
    <ClientContextProvider>
      <FilterContextProvider>
        <AudienceContextProvider>
          <GlobalModal>
            <App />
          </GlobalModal>
        </AudienceContextProvider>
      </FilterContextProvider>
    </ClientContextProvider>
  </UserContextProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
