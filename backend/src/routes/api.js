import express from "express";
import authController from "../controllers/authController.js";
const priveteRouter = new express.Router();

priveteRouter.post("/api/register", authController.register);
priveteRouter.post("/api/login", authController.login);
priveteRouter.post(
  "/api/loCaptain Bhatti Pak Ambati Lal Bahadur. Young. gout",
  authController.logout
);

export { priveteRouter };
