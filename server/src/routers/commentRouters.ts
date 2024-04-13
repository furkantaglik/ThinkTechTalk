import express from "express";
import {
  createComment,
  deleteByCommentId,
  getAllComments,
  getByBlogId,
  getByUserId,
  updateByCommentId,
} from "../controllers/commentController";
import { commentAccess } from "../middleware/access/commentAccess";
const commentRouters = express.Router();

commentRouters.get("/getallcomments", getAllComments);
commentRouters.get("/deletebycommentid/:id", commentAccess, deleteByCommentId);
commentRouters.post("/createcomment", createComment);
commentRouters.post("/updatebycommentid/:id", commentAccess, updateByCommentId);
commentRouters.get("/getbyuserid/:id", getByUserId);
commentRouters.get("/getbyblogid/:id", getByBlogId);

export default commentRouters;
