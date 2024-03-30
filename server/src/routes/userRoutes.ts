import express from "express";
import { signUp } from "../controllers/users/signUp";
import { signIn } from "../controllers/users/signIn";
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
