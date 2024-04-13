import express from "express";
import multer from "multer";
import { upload } from "../utils/multer";
import {
  createPost,
  deleteByPostId,
  getAllPosts,
  getByPostId,
  getByUserId,
  updateByPostId,
} from "../controllers/postController";
import { postAccess } from "../middleware/access/postAccess";
const postRouters = express.Router();

postRouters.get("/getbypostid/:id", getByPostId);
postRouters.get("/getbyuserid/:id", getByUserId);
postRouters.get("/getallposts", getAllPosts);
postRouters.get("/deletebypostid/:id", postAccess, deleteByPostId);
postRouters.post("/updatebypostid/:id", postAccess, upload, updateByPostId);
postRouters.post("/createpost", upload, createPost);

export default postRouters;
