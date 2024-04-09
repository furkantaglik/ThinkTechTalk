import { RequestHandler } from "express";
import { Role } from "@prisma/client";
import db from "../../../prisma/prisma";

export const postAccess: RequestHandler = async (req, res, next) => {
  const userId = req.user.id;
  const postId = req.params.id;
  if (!postId) {
    return res.status(400).json({ message: "gönderi id eksik" });
  }
  if (
    !(
      (await db.post.findFirst({ where: { id: postId, userId: userId } })) ||
      req.user.Role === Role.ADMIN
    )
  ) {
    return res.status(401).json({ message: "Yetkisiz erişim" });
  }
  next();
};
