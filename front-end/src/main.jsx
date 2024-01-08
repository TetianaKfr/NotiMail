import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/home.jsx'
import Navbar from './components/navbar/navbar.jsx';
import UserCard from './pages/usercard/usercard.jsx';
import Notification from './pages/notification/notification.jsx';
import Menu from "./components/Menu.jsx";
import BtnConnect from "./components/BtnConnect.jsx";
import PanneauAdmin from "./components/panneauAdmin.jsx";
import PanneauUser from "./components/panneauUser.jsx";

// Importez vos autres composants ici

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/usercard" element={<UserCard />} />
        <Route path="/" element={<Menu />} />
        <Route path="/b" element={<BtnConnect />} />
        <Route path="/c" element={<PanneauAdmin />} />
        <Route path="/d" element={<PanneauUser />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
