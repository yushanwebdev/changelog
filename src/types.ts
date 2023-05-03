import { Request } from "express";

export interface CustomRequest extends Request {
  shhhh_secret: string;
}
