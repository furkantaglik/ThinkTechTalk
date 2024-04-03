import express from "express";
import { deleteByUserId, updateByUserId } from "../controllers/user/user";
import { getByUserId } from "../controllers/user/user";
const userRoutes = express.Router();

userRoutes.post("/updatebyuserid/:id", updateByUserId);
userRoutes.get("/deletebyuserid/:id", deleteByUserId);
userRoutes.get("/getbyuserid/:id", getByUserId);

export default userRoutes;
