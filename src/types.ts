import { Request } from "express";

export interface IUser {
  id: string;
  username: string;
}

export interface ICustomRequest extends Request {
  // shhhh_secret: string;
  user: IUser;
}
