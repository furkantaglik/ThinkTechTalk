import express from "express";
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

postRouters.get("/getbypostid:id", getByPostId);
postRouters.get("/getbyuserid:id", getByUserId);
postRouters.get("/getallposts", getAllPosts);
postRouters.get("/deletebypostid", postAccess, deleteByPostId);

postRouters.post("/createpost", upload.single("media"), createPost);
postRouters.post(
  "/updatebypostid:id",
  postAccess,
  upload.single("media"),
  updateByPostId
);

export default postRouters;
