import { Request, Response } from "express";
import prisma from "../db";
import { ICustomRequest } from "../types";

// Get Updates
export const getUpdates = async (req: Request, res: Response) => {
  const updates = await prisma.update.findMany({
    where: {
      product: {
        belongsToId: (req as ICustomRequest).user.id,
      },
    },
  });

  res.json({
    data: updates,
  });
};

// Get Update
export const getUpdate = async (req: Request, res: Response) => {
  const id = req.params.id;

  const update = await prisma.update.findFirst({
    where: {
      id,
      product: {
        belongsToId: (req as ICustomRequest).user.id,
      },
    },
  });

  res.json({
    data: update,
  });
};

// Create Update
export const createUpdate = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        belongsToId: (req as ICustomRequest).user.id,
        id: req.body.productId,
      },
    },
  });

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      productId: product.id,
    },
  });

  res.json({
    data: update,
  });
};

// Update Update
export const updateUpdate = async (req: Request, res: Response) => {
  const id = req.params.id;

  const update = await prisma.update.findFirst({
    where: {
      id,
      product: {
        belongsToId: (req as ICustomRequest).user.id,
      },
    },
  });

  if (!update) {
    return res.status(404).json({
      error: "Update not found",
    });
  }

  const updated = await prisma.update.update({
    where: {
      id,
    },
    data: {
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
      version: req.body.version,
    },
  });

  res.json({
    data: updated,
  });
};

// Delete Update
export const deleteUpdate = async (req: Request, res: Response) => {
  const id = req.params.id;

  const update = await prisma.update.findFirst({
    where: {
      id,
      product: {
        belongsToId: (req as ICustomRequest).user.id,
      },
    },
  });

  if (!update) {
    return res.status(404).json({
      error: "Update not found",
    });
  }

  const deleted = await prisma.update.delete({
    where: {
      id,
    },
  });

  res.json({
    data: deleted,
  });
};
