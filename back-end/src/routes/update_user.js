import { Router } from "express";
import controller from "../controller/index.js";
import PermissionException from "../controller/permission_exception.js";

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

    if (
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
      req.session,
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

