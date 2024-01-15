import { Router } from "express";

export default Router().put("/update_user", async (req, res) => {
  try {
    const {
      firm_name,
      new_first_name,
      new_last_name,
      new_email,
      new_phone_number,
      new_password,
      new_has_mail,
      new_is_admin,
    } = req.body;

    if (typeof firm_name != "string") {
      res.sendStatus(400);
      return;
    }

    await controller.updateUser(
      firm_name,
      new_first_name,
      new_last_name,
      new_email,
      new_phone_number,
      new_password,
      new_has_mail,
      new_is_admin
    );
    res.sendStatus(200);
  } catch (err) {
    console.log("Error: " + err.stack);
    res.sendStatus(500);
  }
});

