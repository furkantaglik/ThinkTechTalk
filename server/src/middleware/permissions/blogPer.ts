import { RequestHandler } from "express";
import { Role } from "@prisma/client";
import db from "../../../prisma/prisma";

export const blogPer: RequestHandler = async (req, res, next) => {
  const blogId = req.params.id;
  const userId = req.user.id;
  if (!userId) {
    return res.status(404).json({ message: "kullanıcı id eksik" });
  }
  if (!blogId) {
    return res.status(404).json({ message: "blog id eksik" });
  }
  const result = await db.blog.findFirst({
    where: { id: blogId, userId: userId },
  });
  if (!result || (req.user.role === Role.USER && result.userId !== userId)) {
    return res.status(403).json({ message: "Yetkiniz yok" });
  }
  next();
};
