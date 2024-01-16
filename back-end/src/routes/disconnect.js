import { Router } from "express";

import controller, { PermissionException } from "../controller/index.js"

export default Router().post("/disconnect", (req, res) => {
  try {
    controller.disconnect(req.session);
    res.sendStatus(200);
  } catch (err) {
    if (err instanceof PermissionException) {
      res.sendStatus(401);
      return;
    }

    console.error("Error: " + err.stack);
    res.sendStatus(500);
  }
});

