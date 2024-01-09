import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/home.jsx'
import Navbar from './components/navbar/navbar.jsx';
import Edition from './pages/edition/edition.jsx';
import Notification from './pages/notification/notification.jsx';
import BtnConnect from "./components/BtnConnect.jsx";
import PanneauAdmin from "./pages/PanneauAdmin.jsx";
import PanneauUser from "./pages/PanneauUser.jsx";

// Importez vos autres composants ici
let user={companyName:'entreprise 1'}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/edition" element={<Edition user = {user} />} />
        <Route path="/b" element={<BtnConnect />} />
        <Route path="/c" element={<PanneauAdmin />} />
        <Route path="/d" element={<PanneauUser />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
