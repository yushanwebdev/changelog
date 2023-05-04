import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

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
};
