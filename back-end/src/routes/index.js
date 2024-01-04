import { controller } from "../controller/index.js";

import express from "express";
import bodyParser from "body-parser";

export let router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

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
      last_received_mail,
      last_picked_up,
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
      last_received_mail,
      last_picked_up,
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
      new_last_received_mail,
      new_last_picked_up,
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
      new_last_received_mail,
      new_last_picked_up,
      new_has_mail,
      new_is_admin
    );
    res.send("L'utilisateur a bien été modifié avec succès");
  } catch (error) {
    console.log("Recette a été modifié");
    res.status(500).send("Erreur lors de la modification de l'utilisateur");
  }
});
