import BtnConnect from "../../components/btnConnect/BtnConnect.jsx";
import Logo from "../../assets/images/LogoByMathysG.jpg";
import Select from "react-select";

const Home = () => {
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

export default Home;