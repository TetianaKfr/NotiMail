import { Router } from "express";
import controller from "../controller/index.js";

export default Router().put("/update_user", async (req, res) => {
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

    if (typeof firm_name != "string") {
      res.sendStatus(400);
      return;
    }

    await controller.updateUser(
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
  } catch (err) {
    console.log("Error: " + err.stack);
    res.sendStatus(500);
  }
});

