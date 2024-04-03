import { Role } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../../../prisma/prisma";

const checkRole: RequestHandler = async (req, res, next) => {
  const user = await db.user.findUnique({ where: { id: req.user.id } });
  if (user!.Role === Role.USER) {
    return res.status(403).json({ message: "Yetkiniz yok" });
  }
  next();
};

export default checkRole;
