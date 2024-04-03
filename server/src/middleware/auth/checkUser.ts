import { RequestHandler } from "express";
import db from "../../../prisma/prisma";

const checkUser: RequestHandler = async (req, res, next) => {
  const userId = req.user.id;
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ message: "kullanıcı bulunamadı" });
  }
  next();
};

export default checkUser;
