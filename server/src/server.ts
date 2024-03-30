import app from "./app";
import db from "../prisma/prisma";
const port = 5000;

db.$connect()
  .then(() => {
    console.log("db connected");
    app.listen(port, () => {
      console.log(`Running at http://localhost:${port}`);
    });
  })
  .catch(console.error);
