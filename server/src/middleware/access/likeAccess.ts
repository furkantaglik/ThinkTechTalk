import { RequestHandler } from "express";
import { Role } from "@prisma/client";
import db from "../../../prisma/prisma";

export const LikeAccess: RequestHandler = async (req, res, next) => {
  const userId = req.user.id;
  const likeId = req.params.id;
  if (!likeId) {
    return res.status(400).json({ message: "beğeni id eksik" });
  }
  if (
    !(
      (await db.like.findFirst({
        where: { id: likeId, userId: userId },
      })) || req.user.Role === Role.ADMIN
    )
  ) {
    return res.status(401).json({ message: "Yetkisiz erişim" });
  }
  next();
};
