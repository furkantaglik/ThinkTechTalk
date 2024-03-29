import crypto from "crypto-js";
import jwt from "jsonwebtoken";
import db from "../../prisma/prisma.js";
import { UserSchema } from "../../helpers/zodschema/schemas.js";

const generatePassHash = (password) => {
  const key = process.env.PASS_SECRET_KEY;
  return crypto.AES.encrypt(password, key).toString();
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: "5h",
  });
};

const verifyUser = async (username, email) => {
  const existingUser = await db.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
  return existingUser ? true : false;
};

export const signUp = async (req, res) => {
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
      return res.status(200).json({ message: user.error.issues[0].message });
    }

    if (await verifyUser(username, email)) {
      return res.status(400).json({ message: "Kullanıcı zaten mevcut" });
    }

    const hashedPassword = generatePassHash(password);
    const createdUser = await db.user.create({
      data: { firstName, lastName, email, username, password: hashedPassword },
    });

    const token = generateToken(createdUser.uuid);
    return res.status(200).json({ message: "Hesabınız oluşturuldu", token });
  } catch (error) {
    console.error("Kullanıcı oluşturma hatası:", error.message);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
};
