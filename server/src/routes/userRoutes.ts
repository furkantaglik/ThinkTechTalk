import express from "express";
import { signUp } from "../controllers/user/signUp";
import { signIn } from "../controllers/user/signIn";
const userRoutes = express.Router();

userRoutes.post("/signup", signUp);
userRoutes.post("/signin", signIn);

export default userRoutes;
