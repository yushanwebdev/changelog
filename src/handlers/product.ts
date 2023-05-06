import { Request, Response } from "express";
import prisma from "../db";
import { ICustomRequest } from "../types";

// Get all
export const getProducts = async (req: ICustomRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({
    data: user?.products,
  });
};

// Get one
export const getOneProduct = async (req: ICustomRequest, res: Response) => {
  const id = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id,
    },
  });

  res.json({
    data: product,
  });
};
