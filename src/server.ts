import express, { NextFunction, Request, Response } from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";

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

app.use(
  "/user",
  body("username").isString(),
  body("password").isString(),
  handleInputErrors,
  createNewUser
);
app.use("/signin", signin);

app.get("/test", (_req, _res, next) => {
  // throw new Error("Something went wrong");
  setTimeout(() => {
    next(new Error("Something went wrong"));
  }, 1);
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err.cause === "auth") {
    res.status(401).json({
      message: "unauthorized",
    });
  } else if (err.cause === "input") {
    res.status(400).json({
      message: "invalid input",
    });
  } else {
    res.status(500).json({
      message: "oops, that's on us",
    });
  }
});

export default app;
