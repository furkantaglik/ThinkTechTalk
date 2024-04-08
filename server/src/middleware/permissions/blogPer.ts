import { RequestHandler } from "express";
import { Role } from "@prisma/client";
import db from "../../../prisma/prisma";

export const blogPer: RequestHandler = async (req, res, next) => {
  const userId = req.user.id;
  const blogId = req.params.id;
  if (!blogId) {
    return res.status(400).json({ message: "blog id eksik" });
  }
  if (
    !(
      (await db.blog.findFirst({ where: { id: blogId, userId: userId } })) ||
      req.user.Role === Role.ADMIN
    )
  ) {
    return res.status(401).json({ message: "Yetkisiz erişim" });
  }
  next();
};
