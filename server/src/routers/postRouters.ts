import express from "express";
import {
  createPost,
  deleteByPostId,
  getAllPosts,
  getByPostId,
  getByUserId,
  updateByPostId,
} from "../controllers/postController";

const postRouters = express.Router();

postRouters.get("/getbypostid:id", getByPostId);
postRouters.get("/getbyuserid:id", getByUserId);
postRouters.get("/getallposts", getAllPosts);
postRouters.get("/deletebypostid", deleteByPostId);
postRouters.post("/createpost", createPost);
postRouters.post("/updatebypostid:id", updateByPostId);

export default postRouters;
