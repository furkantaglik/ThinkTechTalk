import express from "express";
import { deleteByUserId, updateByUserId } from "../controllers/userController";
import { getByUserId } from "../controllers/userController";
import { userAccess } from "../middleware/access/userAccess";
const userRouters = express.Router();

userRouters.post("/updatebyuserid/:id", userAccess, updateByUserId);
userRouters.get("/deletebyuserid/:id", userAccess, deleteByUserId);
userRouters.get("/getbyuserid/:id", userAccess, getByUserId);

export default userRouters;
