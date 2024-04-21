import crypto from "crypto-js";
import jwt from "jsonwebtoken";
import db from "../../../prisma/prisma";
import { UserSchema } from "../../utils/ZSchema";
import { RequestHandler } from "express";
import { User } from "@prisma/client";

const createEncryptedPass = (password: string) => {
  const key = process.env.PASS_SECRET_KEY;
  return crypto.AES.encrypt(password, key!).toString();
};

const generateToken = (user: object) => {
  return jwt.sign(user, process.env.TOKEN_SECRET_KEY!, {
    expiresIn: "7d",
  });
};

const verifyUser = async (username: string, email: string) => {
  const existingUser = await db.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
  return existingUser ? true : false;
};

export const signUp: RequestHandler = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    const user = UserSchema.safeParse({
      firstName,
      lastName,
      email,
      username,
      password,
    });
    if (!user.success) {
      return res.status(400).json({ message: user.error.issues[0].message });
    }

    if (await verifyUser(username, email)) {
      return res.status(400).json({ message: "Kullanıcı zaten mevcut" });
    }

    const hashedPassword = createEncryptedPass(password);
    const createdUser = await db.user.create({
      data: { firstName, lastName, email, username, password: hashedPassword },
    });

    const token = generateToken({
      id: createdUser.id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      username: createdUser.username,
      role: createdUser.role,
    });
    return res.status(201).json({
      message: "Hesabınız oluşturuldu",
      token: token,
      username: createdUser?.username,
      email: createdUser?.email,
      role: createdUser?.role,
      id: createdUser?.id,
    });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};
