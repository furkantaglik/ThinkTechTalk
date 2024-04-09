import crypto from "crypto-js";
import jwt from "jsonwebtoken";
import db from "../../../prisma/prisma";
import { RequestHandler } from "express";
import { User } from "@prisma/client";

const createDecryptedPass = (hashedPassword: string) => {
  return crypto.AES.decrypt(
    hashedPassword,
    process.env.PASS_SECRET_KEY!
  ).toString(crypto.enc.Utf8);
};

const generateToken = (user: object) => {
  return jwt.sign(user, process.env.TOKEN_SECRET_KEY!, {
    expiresIn: "5h",
  });
};

const verifyUser = async (emailOrUsername: string) => {
  const existingUser = await db.user.findFirst({
    where: {
      OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
    },
  });
  return existingUser ? true : false;
};

export const signIn: RequestHandler = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    if (!(emailOrUsername && password)) {
      return res.status(400).json({ message: "Alanlar boş geçilemez" });
    }
    if ((await verifyUser(emailOrUsername)) === false) {
      return res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
    const user = await db.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });

    const token = generateToken({
      id: user!.id,
      username: user!.username,
      role: user!.role,
    });
    return createDecryptedPass(user!.password) === password
      ? res.status(201).json({ message: "Giriş Başarılı", token: token })
      : res.status(500).json({ message: "Yanlış şifre" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};
