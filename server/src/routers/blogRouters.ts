import express from "express";
import {
  createBlog,
  deleteByBlogId,
  getAllBlogs,
  getByBlogId,
  getByCategoryId,
  getByUserId,
  updateByBlogId,
} from "../controllers/blogController";
import { blogAccess } from "../middleware/access/blogAccess";
import { upload } from "../utils/multer";

const blogRouters = express.Router();

blogRouters.get("/getbyblogid/:id", getByBlogId);
blogRouters.get("/deletebyblogid/:id", blogAccess, deleteByBlogId);
blogRouters.get("/getbyuserid/:id", getByUserId);
blogRouters.get("/getallblogs", getAllBlogs);
blogRouters.get("/getbycategoryid/:id", getByCategoryId);
blogRouters.post("/updatebyblogid/:id", blogAccess, upload, updateByBlogId);
blogRouters.post("/createblog", upload, createBlog);

export default blogRouters;
