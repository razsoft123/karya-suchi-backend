import { Router } from "express";
import { authUser } from "../middleware/auth.middleware";

const workspaceRoutes = Router();

workspaceRoutes.get('/workspaces', authUser, getAllWorkspaces);
workspaceRoutes.get('/workspaces/:id', authUser, getWorkspace);

workspaceRoutes.post('/workspace', authUser, createWorkspace);
workspaceRoutes.put('/workspace/:id', authUser, updateWorkspace);
workspaceRoutes.delete('/workspace/:id', authUser, deleteWorkspace);


export { workspaceRoutes }