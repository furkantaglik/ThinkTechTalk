import express from "express";
import {
  createBlog,
  deleteByBlogId,
  getAllBlogs,
  getByBlogId,
  updateByBlogId,
} from "../controllers/blog/blog";

const blogRouters = express.Router();

blogRouters.post("/createblog", createBlog);
blogRouters.get("/getallblogs", getAllBlogs);
blogRouters.get("/deletebyblogid/:id", deleteByBlogId);
blogRouters.post("/updatebyblogid/:id", updateByBlogId);
blogRouters.get("/getbyblogid/:id", getByBlogId);

export default blogRouters;
