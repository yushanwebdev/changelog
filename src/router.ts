import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import { ICustomRequest, IUser } from "./types";
import {
  createUpdate,
  deleteUpdate,
  getUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

/*
 * Product
 */
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.delete("/product/:id", deleteProduct);

/*
 * Update
 */
router.get("/update", getUpdates);
router.get("/update/:id", getUpdate);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional(),
  handleInputErrors,
  updateUpdate
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isUUID(),
  handleInputErrors,
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

/*
 * Update Points
 */
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputErrors,
  () => {}
);
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  handleInputErrors,
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
