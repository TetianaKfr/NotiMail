import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { Home } from "./pages/Home.jsx";
import { PanneauAdmin } from "./pages/PanneauAdmin.jsx";
import { PanneauUser } from "./pages/PanneauUser.jsx";
import { Entreprises } from "./pages/Entreprises.jsx";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<PanneauAdmin />} />
        <Route path="/user" element={<PanneauUser />} />
        <Route path="*" element={<Home />} />
        {/* Utilisez des accolades pour importer le composant Entreprises */}
        <Route path="/entreprises" element={<Entreprises />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;