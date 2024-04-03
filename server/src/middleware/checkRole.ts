import { Role } from "@prisma/client";
import { RequestHandler } from "express";

const checkRole: RequestHandler = (req, res, next) => {
  if (req.user.Role === Role.USER) {
    return res.status(401).json({ message: "Yetkiniz yok" });
  }
  next();
};

export default checkRole;
