import express from "express";
import bodyParser from "body-parser";

export let router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/listeUsers", async (req, res) => {
  try {
    const results = await usersController.getAllUsers();
    res.json(results);
  } catch (error) {
    console.error("Erreur : " + error.stack);
    res.status(500).send("Erreur lors de la récupération des données");
  }
});
