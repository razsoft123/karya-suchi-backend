import { Router } from "express";
import { userRoutes } from "./User.Routes.mjs";

const apiRoutes = Router();

apiRoutes.use(userRoutes);

export { apiRoutes }