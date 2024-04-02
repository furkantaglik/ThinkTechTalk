import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const isAuthenticated: RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Yetkilendirme başarısız. Token bulunamadı." });
  }
  jwt.verify(token, process.env.TOKEN_SECRET_KEY!, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Yetkilendirme başarısız. Geçersiz token." });
    }
    req.user = decoded;
    next();
  });
};

export default isAuthenticated;
