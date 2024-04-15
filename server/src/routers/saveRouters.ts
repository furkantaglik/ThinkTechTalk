import express from "express";
import {
  createSave,
  deleteBySaveId,
  getAllSaves,
  getByBlogId,
  getByUserId,
} from "../controllers/savedController";
import { SaveAccess } from "../middleware/access/saveAccess";

const saveRouters = express.Router();

saveRouters.get("/getallsaves", getAllSaves);
saveRouters.get("/deletebysaveid/:id", SaveAccess, deleteBySaveId);
saveRouters.post("/createsave", createSave);
saveRouters.get("/getbyuserid/:id", getByUserId);
saveRouters.get("/getbyblogid/:id", getByBlogId);

export default saveRouters;
