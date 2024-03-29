import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//routes
import { signUp } from "./routes/auth/signUp.js";
import { signIn } from "./routes/auth/signIn.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.json("Welcome");
});

app.post("/api/auth/signup", signUp);
app.post("/api/auth/signin", signIn);

app.listen(5000, () => {
  console.log(`http://localhost:5000`);
});
