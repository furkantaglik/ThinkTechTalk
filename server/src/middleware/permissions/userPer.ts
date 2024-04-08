import { RequestHandler } from "express";
import { Role } from "@prisma/client";
import db from "../../../prisma/prisma";

export const userPer: RequestHandler = async (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ message: "user id eksik" });
  }
  if (!(userId === req.user.id || req.user.Role === Role.ADMIN)) {
    return res.status(401).json({ message: "Yetkisiz erişim" });
  }
  next();
};
