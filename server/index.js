import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//routes
import { signUp } from "./routes/auth/signUp.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome");
});

app.post("/api/auth/signup", signUp);

app.listen(5000, () => {
  console.log(`http://localhost:5000`);
});
