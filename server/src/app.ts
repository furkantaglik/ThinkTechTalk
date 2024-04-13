import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routers/authRouters";
import blogRouters from "./routers/blogRouters";
import checkToken from "./middleware/auth/checkToken";
import categoryRouters from "./routers/categoryRouters";
import userRouters from "./routers/userRouters";
import postRouters from "./routers/postRouters";
import LikeRouters from "./routers/likeRouters";
import saveRouters from "./routers/saveRouters";
import commentRouters from "./routers/commentRouters";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use("/api/auth", authRoutes);

//middleware
app.use(checkToken);

app.use("/api/user", userRouters);
app.use("/api/blog", blogRouters);
app.use("/api/category", categoryRouters);
app.use("/api/post", postRouters);
app.use("/api/like/", LikeRouters);
app.use("/api/save", saveRouters);
app.use("/api/comment", commentRouters);

export default app;
