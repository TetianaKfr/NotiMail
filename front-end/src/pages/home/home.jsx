// Importation du composant BtnConnect depuis le chemin spécifié
import BtnConnect from '../../components/btnConnect/BtnConnect';
import listUsers from "../../requests/list_users"
// Importation des hooks useState et useEffect depuis React
import { useState, useEffect } from 'react';
// Importation du fichier de style pour le composant Home
import "./home.css";
/**
 * Définition du composant fonctionnel Home
 * Composant fonctionnel représentant la page d'accueil de l'application.
 * Permet aux utilisateurs de sélectionner une entreprise et de se connecter.
 *
 * @component
 */

const Home = () => {
  // Utilisation du hook useState pour gérer l'état des entreprises
  const [entreprises, setEntreprises] = useState([]);
  // Utilisation du hook useState pour gérer l'état du chargement
  const [isLoading, setIsLoading] = useState(false);

  // Utilisation du hook useEffect pour effectuer une action au chargement du composant
  useEffect(() => {
    // Fonction asynchrone pour récupérer la liste des entreprises depuis l'API
    const fetchEntreprises = async () => {
      // Mise à jour de l'état isLoading pour indiquer le chargement en cours
      setIsLoading(true);
      try {
        // Récupère la liste des entreprise à partir de l'api
        let firm_list = await listUsers();
        // Vérifie que la liste à bien pu être récupéré
        if (firm_list == null) {
          throw Error("Impossible de récupérer la liste des utilisateurs");
        }

        // Met à jour de la liste d'entreprises à partir des données le l'api
        setEntreprises(firm_list);
      } catch (erreur) {
        // Affichage de l'erreur en cas d'échec de la récupération des entreprises
        console.error('Erreur lors de la récupération des entreprises:', erreur);
      }
      // Mise à jour de l'état isLoading pour indiquer que le chargement est terminé
      setIsLoading(false);
    };

    // Appel de la fonction fetchEntreprises lors du chargement initial du composant
    fetchEntreprises();
  }, []);

  // Rendu du composant Home
  return (
    <>
      {/* En-tête du composant */}
      <div className="header">
        {/* Logo du composant */}
        <img className="home-logo" src="src/assets/images/LogoByMathysG.jpg" alt="Logo" />
      </div>
      {/* Section de connexion */}
      <div className='connexion'>
        {/* Sélecteur d'entreprise avec la possibilité de le désactiver pendant le chargement */}
        <div className='company-select'>
          <select disabled={isLoading} defaultValue={"DEFAULT"}>
            <option disabled value="DEFAULT">Entreprise</option>
            {/* Affichage des options basées sur la liste des entreprises récupérées */}
            
            {entreprises.map(firm_name => (
              <option key={firm_name}>
                {firm_name}
              </option>
            ))
          }
          </select>
        </div>
        {/* Zone d'entrée du mot de passe avec le composant BtnConnect */}
        <div className="password-input">
          <BtnConnect></BtnConnect>
        </div>
      </div>
    </>
  );
};

// Exportation du composant Home comme composant par défaut
export default Home;
