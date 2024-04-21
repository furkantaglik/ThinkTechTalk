import db from "../../prisma/prisma";
import { RequestHandler } from "express";
import { UserSchema } from "../utils/ZSchema";

export const deleteByUserId: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await db.user.delete({ where: { id: userId } });
    if (!data) {
      return res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
    return res.status(200).json({ message: "kullanıcı silindi" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const getByUserId: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ message: "kullanıcı id eksik" });
    }
    const data = await db.user.findUnique({ where: { id: userId } });
    if (!data) {
      return res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
    return res.status(200).json({ user: data });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const updateByUserId: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const avatar = req.file;
    const { firstName, lastName, email, username, password, bio } = req.body;
    const user = UserSchema.safeParse({
      firstName,
      lastName,
      email,
      username,
      password,
      bio,
      avatar,
    });
    if (!user.success) {
      return res.status(400).json({ message: user.error.issues[0].message });
    }
    const data = await db.user.update({
      where: { id: userId },
      data: user.data,
    });
    return res
      .status(201)
      .json({ message: "kullanıcı güncellendi", user: data });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const data = await db.user.findMany();
    return res.status(200).json({ data });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};
