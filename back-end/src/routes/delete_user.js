import { Router } from "express";

import controller from "../controller/index.js";

export default Router().delete("/delete_user", async (req, res) => {
  try {
    const {
      session_firm_name,
      session_token,
      firm_name
    } = req.body;

    if (
      (typeof session_firm_name != "string" && typeof session_firm_name != null) ||
      (typeof session_token != "string" && typeof session_token != null) ||
      typeof firm_name != "string"
    ) {
      res.sendStatus(400);
      return;
    }

    if (await controller.deleteUser(session_firm_name, session_token, firm_name)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }

  } catch (err) {
    if (err instanceof PermissionException) {
      res.sendStatus(401);
    }

    console.log("Error : " + err.stack);
    res.sendStatus(500);
  }
});

