import { Role } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../../../prisma/prisma";

//* ikisi için veritabanı sorgusu gerekmeyebilir
export const isAdmin: RequestHandler = async (req, res, next) => {
  const user = await db.user.findUnique({ where: { id: req.user.id } });
  if (user!.role !== Role.ADMIN) {
    return res.status(403).json({ message: "Yetkiniz yok" });
  }
  next();
};

export const isEditor: RequestHandler = async (req, res, next) => {
  const user = await db.user.findUnique({ where: { id: req.user.id } });
  if (user!.role !== Role.ADMIN && user?.role !== Role.EDITOR) {
    return res.status(403).json({ message: "Yetkiniz yok" });
  }
  next();
};
