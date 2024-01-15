import { Router } from "express";
import controller, { PermissionException } from "../controller/index.js";

export default Router().put("/update_user", async (req, res) => {
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
      (typeof first_name != "string" && typeof first_name != null) ||
      (typeof last_name != "string" && typeof last_name != null) ||
      (typeof email != "string" && typeof email != null) ||
      (typeof phone_number != "string" && typeof phone_number != null) ||
      (typeof password != "string" && typeof password != null) ||
      (typeof has_mail != "boolean" && typeof has_mail != null) ||
      (typeof is_admin != "boolean" && typeof is_admin != null)
    ) {
      res.sendStatus(400);
      return;
    }

    if (await controller.updateUser(
      session_firm_name,
      session_token,
      firm_name,
      first_name,
      last_name,
      email,
      phone_number,
      password,
      has_mail,
      is_admin
    )) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    if (err instanceof PermissionException) {
      res.sendStatus(401);
      return;
    }

    console.log("Error: " + err.stack);
    res.sendStatus(500);
  }
});

