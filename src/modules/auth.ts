import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ICustomRequest } from "../types";

interface IUser {
  id: string;
  username: string;
}

export const createJWT = (user: IUser) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET!
  );

  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({
      message: "not authorized",
    });
    return;
  }

  const [, token] = bearer.split("");

  if (!token) {
    res.status(401);
    res.json({
      message: "not a valid token",
    });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as IUser;
    (req as ICustomRequest).user = user;
    next();
  } catch (error) {
    res.status(401);
    res.json({
      message: "not a valid token",
    });
    return;
  }
};
