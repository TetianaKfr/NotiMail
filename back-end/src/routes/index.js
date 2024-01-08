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

router.get("/get_user_by_firm_name", async (req, res) => {
  try {
    const { firm_name } = req.body;
    const user = await controller.getUserByFirmName(firm_name);
    res.json(user);
  } catch (error) {
    console.error("Erreur : " + error.stack);
    res
      .status(500)
      .send("Erreur lors de la récupération des données de l'utilisateur");
  }
});
router.get("/has_mail", async (req, res) => {
  try {
    const { has_mail } = req.body;
    const user_mail = await controller.getUserByHasMail(has_mail);
    res.json(user_mail);
  } catch (error) {
    console.error("Erreur : " + error.stack);
    res
      .status(500)
      .send("Erreur lors de la récupération des données de l'utilisateur");
  }
});

// router.get("/picked_up_mail", async (req, res) => {
//   try {
//     const { last_picked_up } = req.body;
//     const user_picked_up = await controller.getUserByLastPickedUp(
//       last_picked_up
//     );
//     res.json(user_picked_up);
//   } catch (error) {
//     console.error("Erreur : " + error.stack);
//     res
//       .status(500)
//       .send("Erreur lors de la récupération des données de l'utilisateur");
//   }
// });

// Endpoint pour récupérer des données
router.put("/picked_up_mail", async (req, res) => {
  try {
    const { firm_name } = req.body;

    // Appel de la méthode pour mettre à jour last_picked_up
    await controller.updateLastPickedUp(firm_name);

    // Récupération des données mises à jour
    const user_picked_up = await controller.getUserByFirmName(firm_name);
    res.json(user_picked_up);
  } catch (error) {
    console.error("Erreur : " + error.stack);
    res
      .status(500)
      .send("Erreur lors de la récupération des données de l'utilisateur");
  }
});
