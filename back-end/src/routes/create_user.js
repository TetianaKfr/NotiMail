import { Router } from "express";

import controller, { PermissionException } from "../controller/index.js"

export default Router().post("/create_user", async (req, res) => {
  try {
    const {
      session_firm_name,
      session_token,
      firm_name,
      first_name,
      last_name,
      email,
      phone_number,
      password,
      has_mail,
      is_admin,
    } = req.body;

    if (
      (typeof session_firm_name != "string" && typeof session_firm_name != null) ||
      (typeof session_token != "string" && typeof session_token != null) ||
      typeof firm_name != "string" ||
      typeof first_name != "string" ||
      typeof last_name != "string" ||
      typeof email != "string" ||
      typeof phone_number != "string" ||
      typeof password != "string" ||
      typeof has_mail != "boolean" ||
      typeof is_admin != "boolean"
    ) {
      res.sendStatus(400);
      return;
    }

    if (await controller.createUser(
      session_firm_name,
      session_token,
      firm_name,
      first_name,
      last_name,
      email,
      phone_number,
      password,
      has_mail,
      is_admin,
    )) {
    res.sendStatus(201);
      
    } else {
      res.sendStatus(409);
    }

  } catch (err) {
    if (err instanceof PermissionException) {
      res.sendStatus(401);
      return;
    }

    console.error("Error : " + err.stack);
    res.sendStatus(500);
  }
});

