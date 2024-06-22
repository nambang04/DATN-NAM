import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./login"
import App from "./App";
import Login from "./login";
import ProtectRouter from "./components/ProtectRouter";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./components/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectRouter><App/></ProtectRouter>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();



//  trong một ứng dụng React. Nó có nhiệm vụ là render (hiển thị) ứng dụng React lên trang HTML.