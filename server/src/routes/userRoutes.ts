import express from "express";
import { deleteByUserId, updateByUserId } from "../controllers/user/user";
import { getByUserId } from "../controllers/user/user";
import { userPer } from "../middleware/permissions/userPer";
const userRoutes = express.Router();

userRoutes.post("/updatebyuserid/:id", userPer, updateByUserId);
userRoutes.get("/deletebyuserid/:id", userPer, deleteByUserId);
userRoutes.get("/getbyuserid/:id", userPer, getByUserId);

export default userRoutes;
