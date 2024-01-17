import Logo from "../../assets/images/logo-notimail.png";
import { IoMdMail } from "react-icons/io";
import { useState } from "react";

const PanneauUser = () => {
  const [showModal, setShowModal] = useState(true);
  const [hasMail, setHasMail] = useState(true);

  return (
    <>
      <img id="logo" src={Logo} alt="Logo" />
      <IoMdMail id="mail" />
      <h2>{hasMail ? "Vous avez du courrier en attente" : "Aucun courrier en attente"}</h2>
      <button onClick={() => setShowModal(true)}>Réceptionner</button>
      {hasMail && (
        <div className="modal">
          <p>Confirmer la réception du courrier</p>
          <button onClick={() => setHasMail(false)}>Annuler</button>
          <button onClick={() => alert("Courrier reçu")}>Valider</button>
        </div>
      )}
    </>
  );
};

export default PanneauUser;