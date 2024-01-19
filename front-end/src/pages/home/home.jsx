// Importation du composant BtnConnect depuis le chemin spécifié
// Importation des hooks useState et useEffect depuis React
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./home.css";

const Home = () => {
  // Utilisation du hook useState pour gérer l'état des entreprises
  const [entreprises, setEntreprises] = useState([]);
  const [firmName, setFirmName] = useState('')
  const [password, setPassword] = useState('')
  // Utilisation du hook useEffect pour effectuer une action au chargement du composant
  useEffect(() => {

    // Fonction asynchrone pour récupérer la liste des entreprises depuis l'API
    const fetchEntreprises = async () => {

      try {
        // Appel à l'API pour récupérer la liste des entreprises
        const reponse = await fetch('http://localhost:3000/list_users', { method: "GET" });
        // Conversion de la réponse en format JSON
        const user_list = await reponse.json();
        // Mise à jour de l'état entreprises avec la liste récupérée
        setEntreprises(user_list);
      } catch (erreur) {
        // Affichage de l'erreur en cas d'échec de la récupération des entreprises
        console.error('Erreur lors de la récupération des entreprises:', erreur);
      }
    };

    // Appel de la fonction fetchEntreprises lors du chargement initial du composant
    fetchEntreprises();
  }, []);

  const firmNameChange = (e) => {
    setFirmName(e.target.value)
  }
  const passwordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleSubmit = (e) => {
    //empeche le rechargement de la page
    e.preventDefault() 
  }

  // Rendu du composant Home
  return (
    <>

      <div className="header">

        <img className="home-logo" src="../../src/assets/images/logo-home.svg" alt="Logo" />
      </div>
      <form className='connexion' onSubmit={handleSubmit}>
        <div className="custom-select">

          <label className='firm-select'>
            <select id="id-1" onChange={firmNameChange}>
              <option value="">Entreprise</option>
              {/* Affichage des options basées sur la liste des entreprises récupérées */}
              {entreprises.map((entreprise, index) => (
                <option key={index} value={entreprise}>
                  {entreprise}
                </option>
              ))}
            </select>
          </label>

        </div>

        {/* Zone d'entrée du mot de passe avec le composant BtnConnect */}
        <div className="password-input">
          <div className="password-input" onSubmit={passwordChange}>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>
            <img src="../../src/assets/images/padlock.svg" alt="submit" />
            </button>
          </div>


        </div>
      </form>
    </>
  );
};

// Exportation du composant Home comme composant par défaut
export default Home;