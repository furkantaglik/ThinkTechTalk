import express from "express";
import {
  createBlog,
  deleteByBlogId,
  getAllBlogs,
  getByBlogId,
  getByCategoryId,
  getByUserId,
  updateByBlogId,
} from "../controllers/blog/blog";
import { blogPer } from "../middleware/permissions/blogPer";

const blogRouters = express.Router();

blogRouters.get("/getbyblogid/:id", getByBlogId);
blogRouters.get("/deletebyblogid/:id", blogPer, deleteByBlogId);
blogRouters.get("/getbyuserid/:id", getByUserId);
blogRouters.get("/getallblogs", getAllBlogs);
blogRouters.get("/getbycategoryid/:id", getByCategoryId);
blogRouters.post("/updatebyblogid/:id", blogPer, updateByBlogId);
blogRouters.post("/createblog", createBlog);

export default blogRouters;
