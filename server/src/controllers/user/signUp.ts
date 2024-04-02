import crypto from "crypto-js";
import jwt from "jsonwebtoken";
import db from "../../../prisma/prisma";
import { UserSchema } from "../../utils/ZSchema";
import { RequestHandler } from "express";

const createEncryptedPass = (password: string) => {
  const key = process.env.PASS_SECRET_KEY;
  return crypto.AES.encrypt(password, key!).toString();
};

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.TOKEN_SECRET_KEY!, {
    expiresIn: "5h",
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
  const { firstName, lastName, email, username, password } = req.body;
  const user = UserSchema.safeParse({
    firstName,
    lastName,
    email,
    username,
    password,
  });
  try {
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

    const token = generateToken(createdUser.id);
    return res.status(201).json({ message: "Hesabınız oluşturuldu", token });
  } catch (error) {
    console.error("Kullanıcı oluşturma hatası:", (error as Error).message);
    return res.status(503).json({ message: "Sunucu hatası" });
  }
};
