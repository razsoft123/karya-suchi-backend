import { Router } from "express";
import { userRoutes } from "./user.routes.mjs";
import { authRoutes } from "./auth.routes.mjs";

const apiRoutes = Router();

apiRoutes.use(authRoutes);
apiRoutes.use(userRoutes);

export { apiRoutes }