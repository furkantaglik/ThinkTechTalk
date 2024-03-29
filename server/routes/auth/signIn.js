import crypto from "crypto-js";
import jwt from "jsonwebtoken";
import db from "../../prisma/prisma.js";

const decryptedPassHash = (hashedPassword) => {
  return crypto.AES.decrypt(
    hashedPassword,
    process.env.PASS_SECRET_KEY
  ).toString(crypto.enc.Utf8);
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: "5h",
  });
};

const verifyUser = async (emailOrUsername) => {
  const existingUser = await db.user.findFirst({
    where: {
      OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
    },
  });
  return existingUser ? true : false;
};

export const signIn = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    if (!(emailOrUsername && password)) {
      return res.status(400).json({ message: "Boş geçilemez" });
    }
    if ((await verifyUser(emailOrUsername)) === false) {
      return res.status(400).json({ message: "kullanıcı bulunamadı" });
    }
    const user = await db.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });
    decryptedPassHash(user.password) === password
      ? res
          .status(200)
          .json({ message: "Giriş Başarılı", token: generateToken(user.uuid) })
      : res.status(500).json({ message: "Yanlış şifre" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Sunucu Hatası" });
  }
};
