import express, { NextFunction, Request, Response } from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

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

app.use("/api", protect, router);

app.use("/user", createNewUser);
app.use("/signin", signin);

app.get("/test", (_req, res) => {
  throw new Error("Something went wrong");
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  res.status(500);
  res.json({
    error: err.message,
  });
});

export default app;
