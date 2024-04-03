import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import checkToken from "./middleware/checkToken";
import categoryRouters from "./routes/categoryRoutes";
import profileRouters from "./routes/profileRoutes";
import userRoutes from "./routes/userRoutes";
import checkRole from "./middleware/checkRole";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use("/api/auth", authRoutes);

//middleware
app.use(checkToken);

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/category", categoryRouters);
app.use("/api/profile", profileRouters);

export default app;
