import db from "../../../prisma/prisma";
import { RequestHandler } from "express";
import { verifyUser } from "../../helpers/verifyUser";
import { UserSchema } from "../../utils/ZSchema";
import { Role } from "@prisma/client";

export const deleteByUserId: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      res.status(404).json({ message: "Kullanıcı id eksik" });
    }
    if (!(await verifyUser(userId))) {
      return res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
    await db.user.delete({ where: { id: userId } });
    return res.status(202).json({ message: "kullanıcı silindi" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const getByUserId: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.status(404).json({ message: "kullanıcı id eksik" });
    }
    const data = await db.user.findUnique({ where: { id: userId } });
    if (!data) {
      return res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const updateByUserId: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email, username, password } = req.body;
    const user = UserSchema.safeParse({
      firstName,
      lastName,
      email,
      username,
      password,
    });
    if (!userId) {
      return res.status(404).json({ message: "kullanıcı id eksik" });
    }
    if (!user.success) {
      return res.status(400).json({ message: user.error.issues[0].message });
    }
    if (!(await verifyUser(userId))) {
      return res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
    const data = await db.user.update({
      where: { id: userId },
      data: user.data,
    });
    return res
      .status(201)
      .json({ message: "kullanıcı güncellendi", data: data });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};
