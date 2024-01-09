import React from "react";
import ReactDOM from "react-dom";
import { Navbar } from "../../components/Navbar";
import Logo from "../assets/logo.png";
import { IoMdMail } from "react-icons/io";

export const PanneauUser = () => {
  return (
    <>
      <Navbar />
      <img id="logo" src={Logo} alt="Logo" />
      <IoMdMail id="mail" />
      <h2>Aucun courrier en attente</h2>
      <button>Réceptionner</button>
    </>
  );
};
