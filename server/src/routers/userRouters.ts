import express from "express";
import {
  deleteByUserId,
  getAllUsers,
  updateByUserId,
} from "../controllers/userController";
import { getByUserId } from "../controllers/userController";
import { userAccess } from "../middleware/access/userAccess";
import { isAdmin } from "../middleware/auth/checkRoles";
import { upload } from "../utils/multer";
const userRouters = express.Router();

userRouters.post("/updatebyuserid", upload, updateByUserId);
userRouters.get("/deletebyuserid", deleteByUserId);
userRouters.get("/getbyuserid", getByUserId);
userRouters.get("/getallusers", isAdmin, getAllUsers);

export default userRouters;
