import express from "express";
import {
  createLike,
  deleteByLikeId,
  getAllLikes,
  getByBlogId,
  getByUserId,
} from "../controllers/likedController";
import { LikeAccess } from "../middleware/access/likeAccess";

const LikeRouters = express.Router();

LikeRouters.get("/getalllikes", getAllLikes);
LikeRouters.get("/deletebylikeid/:id", LikeAccess, deleteByLikeId);
LikeRouters.post("/createlike", createLike);
LikeRouters.get("/getbyuserid/:id", getByUserId);
LikeRouters.get("/getbyblogid/:id", getByBlogId);

export default LikeRouters;
