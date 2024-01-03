import express from "express";
import "dotenv/config";

import { router } from "./routes/index.js";
import { PORT } from "./environment.js";
import { controller } from "./controller/index.js";

let http_server = express();

http_server.use("/", router);

http_server.listen(PORT, () => {
  console.log("Http server listening on port " + PORT);
});
