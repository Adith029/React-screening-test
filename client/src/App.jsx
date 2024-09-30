import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import UserList from "./Components/UserList";
import Register from "./Components/Register";
import Login from "./Components/Login";

function App() {
  const [authentiacated, setAuthenticated] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {!authentiacated ? (
            <>
              <Route path="/" element={<Register />} />
              <Route
                path="/login"
                element={<Login setAuthenticated={setAuthenticated} />}
              />
            </>
          ) : (
            <>
              <Route
                path="/user"
                element={<UserList setAuthentication={setAuthenticated} />}
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
