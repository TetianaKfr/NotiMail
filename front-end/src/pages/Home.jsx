import React from "react";
import ReactDOM from "react-dom/client";
import { BtnConnect } from "../../components/BtnConnect.jsx";
import Logo from "../assets/logo.png";
import Select from "react-select";
export const Home = () => {
  const options = [
    { value: "entreprise1", label: "Entreprise 1" },
    { value: "entreprise2", label: "Entreprise 2" },
    { value: "entreprise3", label: "Entreprise 3" },
    { value: "entreprise4", label: "Entreprise 4" },
    { value: "entreprise5", label: "Entreprise 5" },
  ];

  return (
    <>
      <img id="logo1" src={Logo} alt="Logo" />
      <Select options={options} />
      <BtnConnect />
    </>
  );
};
