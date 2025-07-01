import express from "express";
import productController from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddlewar.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const publicRouter = new express.Router();

publicRouter.get("/api/products", productController.getAll);
publicRouter.get("/api/products/search", productController.search);
publicRouter.get("/api/products/:id", productController.getById);
publicRouter.post(
  "/api/products",
  authMiddleware,
  upload.single("image"),
  productController.post
);
publicRouter.put(
  "/api/products/:id",
  authMiddleware,
  upload.single("image"),
  productController.put
);

publicRouter.delete(
  "/api/products/:id",
  authMiddleware,
  productController.remove
);

export { publicRouter };
