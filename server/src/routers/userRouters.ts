import express from "express";
import {
  deleteByUserId,
  getAllUsers,
  updateByUserId,
} from "../controllers/userController";
import { getByUserId } from "../controllers/userController";
import { userAccess } from "../middleware/access/userAccess";
import { isAdmin } from "../middleware/auth/checkRoles";
const userRouters = express.Router();

userRouters.post("/updatebyuserid/:id", userAccess, updateByUserId);
userRouters.get("/deletebyuserid/:id", userAccess, deleteByUserId);
userRouters.get("/getbyuserid/:id", userAccess, getByUserId);
userRouters.get("/getallusers", isAdmin, getAllUsers);

export default userRouters;
