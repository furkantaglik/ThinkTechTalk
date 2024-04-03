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
import checkUser from "../middleware/checkUser";

const blogRouters = express.Router();

blogRouters.get("/getbyblogid/:id", getByBlogId);
blogRouters.get("/deletebyblogid/:id", checkUser, deleteByBlogId);
blogRouters.get("/getbyuserid/:id", getByUserId);
blogRouters.get("/getallblogs", getAllBlogs);
blogRouters.get("/getbycategoryid/:id", getByCategoryId);
blogRouters.post("/updatebyblogid/:id", updateByBlogId);
blogRouters.post("/createblog", createBlog);

export default blogRouters;
