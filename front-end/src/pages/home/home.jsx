import BtnConnect from '../../components/btnConnect/BtnConnect';
import { useState, useEffect } from 'react';
import "./home.css";


const Home = () => {
  const [entreprises, setEntreprises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEntreprises = async () => {
      setIsLoading(true);
      try {
        const reponse = await fetch('http://localhost:3000/list_users', { method: "GET" });
        const firmList = await reponse.json();

        setEntreprises(firmList.slice(0, 5)); // Prend les 5 premières entreprises
      } catch (erreur) {
        console.error('Erreur lors de la récupération des entreprises:', erreur);
      }
      setIsLoading(false);
    };

    fetchEntreprises();
  }, []);

  return (
    <>
      <div className="header">
        <img className="home-logo" src="src/assets/images/LogoByMathysG.jpg" alt="Logo" />
      </div>
      <div className='connexion'>
        <div className='company-select'>
          <select disabled={isLoading}>
            <option value="">Entreprise</option>

            {entreprises.map(entreprise => (
              <option key={entreprise.id} value={entreprise.id}>
                {entreprise.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="password-input">
          <BtnConnect></BtnConnect>
        </div>
      </div>
    </>
  );
};



export default Home;