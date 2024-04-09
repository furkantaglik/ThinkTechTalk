import express from "express";
import {
  createCategory,
  deleteByCategoryId,
  getAllCategory,
  getByCategoryId,
  updateByCategoryId,
} from "../controllers/categoryController";
const categoryRouters = express.Router();

categoryRouters.get("/getallcategory", getAllCategory);
categoryRouters.get("/getbycategoryid", getByCategoryId);
categoryRouters.get("/deletebycategoryid/:id", deleteByCategoryId);
categoryRouters.post("/updatebycategoryid/:id", updateByCategoryId);
categoryRouters.post("/createcategory", createCategory);

export default categoryRouters;
