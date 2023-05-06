import { Request, Response } from "express";
import prisma from "../db";
import { ICustomRequest } from "../types";

// Get all
export const getProducts = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: (req as ICustomRequest).user.id,
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
export const getOneProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: (req as ICustomRequest).user.id,
    },
  });

  res.json({
    data: product,
  });
};

// Create Product
export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: (req as ICustomRequest).user.id,
    },
  });

  res.json({
    data: product,
  });
};

// Update Product
export const updateProduct = async (req: ICustomRequest, res: Response) => {
  const updated = await prisma.product.update({
    where: {
      id_belongsToId: {
        belongsToId: req.user.id,
        id: req.params.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({
    data: updated,
  });
};

// Delete Product
export const deleteProduct = async (req: ICustomRequest, res: Response) => {
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: {
        belongsToId: req.user.id,
        id: req.params.id,
      },
    },
  });

  res.json({
    data: deleted,
  });
};
