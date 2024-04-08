import express from "express";
import { deleteByUserId, updateByUserId } from "../controllers/user/user";
import { getByUserId } from "../controllers/user/user";
import { userAccess } from "../middleware/access/userAccess";
const userRoutes = express.Router();

userRoutes.post("/updatebyuserid/:id", userAccess, updateByUserId);
userRoutes.get("/deletebyuserid/:id", userAccess, deleteByUserId);
userRoutes.get("/getbyuserid/:id", userAccess, getByUserId);

export default userRoutes;
