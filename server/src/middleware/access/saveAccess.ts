import { RequestHandler } from "express";
import { Role } from "@prisma/client";
import db from "../../../prisma/prisma";

export const SaveAccess: RequestHandler = async (req, res, next) => {
  const userId = req.user.id;
  const saveId = req.params.id;
  if (!saveId) {
    return res.status(400).json({ message: "kaydedilen id eksik" });
  }
  if (
    !(
      (await db.save.findFirst({
        where: { id: saveId, userId: userId },
      })) || req.user.Role === Role.ADMIN
    )
  ) {
    return res.status(401).json({ message: "Yetkisiz erişim" });
  }
  next();
};
