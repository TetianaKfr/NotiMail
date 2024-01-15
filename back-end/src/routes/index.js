import { controller } from "../controller/index.js";

import express from "express";
import bodyParser from "body-parser";

export let router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/authentificate", async (req, res) => {
  try {
    const {
      firm_name,
      password,
    } = req.body;

    if (typeof firm_name != "string" || typeof password != "string") {
      res.sendStatus(400);
      return;
    }
    
    let token = await controller.authentificate(firm_name, password);
    if (token == null) {
      res.sendStatus(401);
      return;
    }

    res.status(200).send({ token: token });
  } catch (err) {
    console.error("Error: " + err.stack);
    res.sendStatus(500);
  }
});

router.get("/get_all_users", async (req, res) => {
  try {
    const results = await controller.getAllUsers();
    res.json(results);
  } catch (error) {
    console.error("Erreur : " + error.stack);
    res.status(500).send("Erreur lors de la récupération des données");
  }
});

router.post("/create_user", async (req, res) => {
  try {
    const {
      firm_name,
      first_name,
      last_name,
      email,
      phone_number,
      password,
      has_mail,
      is_admin,
    } = req.body;

    await controller.insertUser(
      firm_name,
      first_name,
      last_name,
      email,
      phone_number,
      password,
      has_mail,
      is_admin
    );

    res.sendStatus(200);
  } catch (error) {
    console.error("Erreur : " + error.stack);
    res.status(500).send("Failed to insert user");
  }
});

router.delete("/delete_user", async (req, res) => {
  try {
    const { firm_name } = req.body;

    if (firm_name === undefined) {
      res.status(200).send("Champs non trouvé");
      return;
    }

    await controller.deleteUser(firm_name);
    res.send("Utilisateur a été supprimé");
  } catch (error) {
    console.log("Erreur : " + error.stack);
    res.status(500).send("Erreur lors de la suppression de l'utilisateur");
  }
});

router.put("/update_user", async (req, res) => {
  try {
    const { firm_name } = req.body;
    const {
      new_first_name,
      new_last_name,
      new_email,
      new_phone_number,
      new_password,
      new_has_mail,
      new_is_admin,
    } = req.body;
    await controller.updateUser(
      firm_name,
      new_first_name,
      new_last_name,
      new_email,
      new_phone_number,
      new_password,
      new_has_mail,
      new_is_admin
    );
    res.send("L'utilisateur a bien été modifié avec succès");
  } catch (error) {
    console.log("Recette a été modifié");
    res.status(500).send("Erreur lors de la modification de l'utilisateur");
  }
});

router.get("/get_user_by_firm_name", async (req, res) => {
  try {
    const { firm_name } = req.body;

    if (firm_name === undefined) {
      res.status(200).send("Champs non trouvé");
      return;
    }

    const user = await controller.getUserByFirmName(firm_name);
    res.json(user);
  } catch (error) {
    console.error("Erreur : " + error.stack);
    res
      .status(500)
      .send("Erreur lors de la récupération des données de l'utilisateur");
  }
});

// Endpoint pour récupérer des données
router.put("/picked_up_mail", async (req, res) => {
  try {
    const { firm_name } = req.body;

    if (firm_name === undefined) {
      res.status(200).send("Champs non trouvé");
      return;
    }

    // Appel de la méthode pour mettre à jour last_picked_up
    await controller.updateLastPickedUp(firm_name);

    res.status(200).send("OK");
  } catch (error) {
    console.error("Erreur : " + error.stack);
    res
      .status(500)
      .send("Erreur lors de la récupération des données de l'utilisateur");
  }
});
