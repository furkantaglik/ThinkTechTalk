import express from "express";
import { signUp } from "../controllers/auth/signUp";
import { signIn } from "../controllers/auth/signIn";
const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/signin", signIn);

export default authRoutes;
