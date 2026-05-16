import express from "express";
import { loginController, registerController, refreshController } from "./../controllers/auth.controller.mjs"

const authRoutes = express.Router();

authRoutes.post("/login", loginController);
authRoutes.post("/register", registerController);
authRoutes.post("/refresh", refreshController);

export { authRoutes }