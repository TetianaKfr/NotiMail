import React from "react";
import ReactDOM from "react-dom/client";
import logo from "/public/logo.png";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Select from "react-select";
import "./index.css";

import Menu from "../components/Menu.jsx";
import BtnConnect from "../components/BtnConnect.jsx";
import PanneauAdmin from "../components/PanneauAdmin.jsx";
import PanneauUser from "../components/PanneauUser.jsx";
function App() {
  const options = [
    { value: "entreprise1", label: "Entreprise 1" },
    { value: "entreprise2", label: "Entreprise 2" },
    { value: "entreprise3", label: "Entreprise 3" },
    { value: "entreprise4", label: "Entreprise 4" },
    { value: "entreprise5", label: "Entreprise 5" }
  ];

  return (
    <>
      <img src={logo} alt="Logo" />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/b" element={<BtnConnect />} />
        <Route path="/c" element={<PanneauAdmin />} />
        <Route path="/d" element={<PanneauUser />} />
      </Routes>
      <Select options={options} />
    </>
  );
}

export default App;
