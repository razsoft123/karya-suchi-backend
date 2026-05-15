import express from "express";

const authRoutes = express.Router();

authRoutes.post("/login", loginController);
authRoutes.post("/register", registerController);
authRoutes.post("/refresh", refreshController);

export { authRoutes }