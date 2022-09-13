import React, { useState, useMemo } from "react";
import "./App.css";
import "./Componets/Styles/global.css";
import LogIn from "./Pages/LogIn";
import Database from "./Pages/Database";
import Report from "./Report";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from "./UserContex/UserContext";

function App() {
  const [value, setValue] = useState(null);
  // const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  return (
    <Router>
      <UserContext.Provider value={"this is new"}>
        <Routes>
          <Route path="/" element={<LogIn></LogIn>}></Route>
          <Route path="/Database" element={<Database />}></Route>
          <Route
            path="/Report/:country/:client/:id"
            element={<Report />}
          ></Route>
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
