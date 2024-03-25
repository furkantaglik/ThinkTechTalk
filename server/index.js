import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Ana Sayfa");
});

app.listen(5000, () => {
  console.log(`http://localhost:5000`);
});
