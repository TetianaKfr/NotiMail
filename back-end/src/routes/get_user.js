import { Router } from "express";

import controller from "../controller/index.js";

export default Router().post("/get_user", async (req, res) => {
  try {
    const {
      session_firm_name,
      session_token,
      firm_name,
    } = req.body;

    if (
      (typeof session_firm_name != "string" && typeof session_firm_name != null) ||
      (typeof session_token != "string" && typeof session_token != null) ||
      typeof firm_name != "string"
    ) {
      res.sendStatus(400);
      return;
    }

    const user = await controller.getUser(session_firm_name, session_token, firm_name);
    if (user == null) {
      res.sendStatus(404);
      return;
    }

    res.json(user);
  } catch (err) {
    if (err instanceof PermissionException) {
      res.sendStatus(401);
    }

    console.error("Error : " + err.stack);
    res.sendStatus(500);
  }
});

