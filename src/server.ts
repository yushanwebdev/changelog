import express, { NextFunction, Request, Response } from "express";
import router from "./router";
import morgan from "morgan";
import { CustomRequest } from "./types";

const app = express();

const customLogger =
  (message: string) => (_req: Request, _res: Response, next: NextFunction) => {
    console.log(`Hello from ${message}`);
    next();
  };

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(customLogger("Yushan"));

// app.use((req, res, next) => {
//   (req as CustomRequest).shhhh_secret = "doggy";
//   next();

//   res.status(401);
//   res.send("Nope");
// });

app.get("/", (_req, res) => {
  console.log("hello from Express");
  res.status(200);
  res.json({
    message: "Hello",
  });
});

app.use("/api", router);

export default app;
