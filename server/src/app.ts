import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import blogRoutes from "./routes/blogRoutes";
import isAuthenticated from "./middleware/authMw";
import categoryRouters from "./routes/categoryRoutes";
import profileRouters from "./routes/profileRoutes";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use("/api/auth", userRoutes);

//middleware
app.use(isAuthenticated);

app.use("/api/blog/", blogRoutes);
app.use("api/category", categoryRouters);
app.use("api/profile", profileRouters);

export default app;
