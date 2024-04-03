import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import db from "../../../prisma/prisma";

const checkToken: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Yetkilendirme başarısız. Token bulunamadı." });
  }
  jwt.verify(token, process.env.TOKEN_SECRET_KEY!, async (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Yetkilendirme başarısız. Geçersiz token." });
    }
    req.user = decoded;
    next();
  });
};

export default checkToken;
