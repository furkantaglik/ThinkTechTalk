import express from "express";
import { signUp } from "../controllers/auth/signUp";
import { signIn } from "../controllers/auth/signIn";
const authRouters = express.Router();

authRouters.post("/signup", signUp);
authRouters.post("/signin", signIn);

export default authRouters;
