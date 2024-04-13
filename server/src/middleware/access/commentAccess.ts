import { RequestHandler } from "express";
import { Role } from "@prisma/client";
import db from "../../../prisma/prisma";

export const commentAccess: RequestHandler = async (req, res, next) => {
  const userId = req.user.id;
  const commentId = req.params.id;
  if (!commentId) {
    return res.status(400).json({ message: "yorum id eksik" });
  }
  if (
    !(
      (await db.comment.findFirst({
        where: { id: commentId, userId: userId },
      })) || req.user.Role === Role.ADMIN
    )
  ) {
    return res.status(401).json({ message: "Yetkisiz erişim" });
  }
  next();
};
