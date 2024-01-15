import { Router } from "express";

import controller from "../controller/index.js";

export default Router().get("/get_user", async (req, res) => {
  try {
    const { firm_name } = req.body;

    if (typeof firm_name != "string") {
      res.sendStatus(400);
      return;
    }

    const user = await controller.getUserByFirmName(firm_name);
    res.json(user);
  } catch (err) {
    console.error("Error : " + err.stack);
    res.sendStatus(500);
  }
});

