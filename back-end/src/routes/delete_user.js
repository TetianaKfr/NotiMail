import { Router } from "express";

import controller from "../controller/index.js";

export default Router().delete("/delete_user", async (req, res) => {
  try {
    const { firm_name } = req.body;

    if (typeof firm_name != "string") {
      res.sendStatus(400);
      return;
    }

    if (await controller.deleteUser(firm_name)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
    
  } catch (err) {
    console.log("Error : " + err.stack);
    res.sendStatus(500);
  }
});

