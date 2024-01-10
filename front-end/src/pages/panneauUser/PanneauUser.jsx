import Logo from "../../assets/images/logo-notimail.png";
import { IoMdMail } from "react-icons/io";

const PanneauUser = () => {
  return (
    <>
      <img id="logo" src={Logo} alt="Logo" />
      <IoMdMail id="mail" />
      <h2>Aucun courrier en attente</h2>
      <button>Réceptionner</button>
    </>
  );
};

export default PanneauUser;
