import config from "./config";
import app from "./server";
import * as dotenv from "dotenv";

dotenv.config();

app.listen(config.port, () => {
  console.log(`hello on http://localhost:${config.port}`);
});

process.on("uncaughtException", (err) => {
  console.log("Caught exception: ", err);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection: ", err);
});
