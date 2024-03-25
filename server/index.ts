import express from "express";
const app = express();

app.get("/", (req, res) => {
  console.log("ana sayfa");
});

app.listen(5000, () => {
  console.log(`http://localhost:5000`);
});
