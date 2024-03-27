import crypto from "crypto-js";
import z from "zod";

const UserSchema = z.object({
  firstName: z
    .string()
    .min(3, "isim minimum 3 karakter olabilir")
    .max(18, "isim maksimum 18 karakter olabilir"),
  lastName: z
    .string()
    .min(3, "soyisim minimum 3 karakter olabilir")
    .max(18, "soyisim maksimum 18 karakter olabilir"),
  email: z.string().email("Geçersiz email formatı"),
  username: z
    .string()
    .min(3, "kullanıcı adı minimum 3 karakter olabilir")
    .max(18, "kullanıcı adı maksimum 18 karakter olabilir")
    .transform((username) => username.trim().toLowerCase()),
  password: z.string().min(5, "şifre en az 5 karakter olabilir"),
});

export const signUp = async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;
  const user = UserSchema.safeParse({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  if (!user.success) {
    return res.status(200).json(user.error.issues[0].message);
  }

  generatePassHash(password);
  function generatePassHash(password) {
    const key = process.env.PASS_SECRET_KEY;
    const hashedPass = crypto.AES.encrypt(password, key).toString();
    const decryptPass = crypto.AES.decrypt(hashedPass, key).toString(
      crypto.enc.Utf8
    );

    console.log("hash", hashedPass);
    console.log("normal", decryptPass);
  }

  function verifyUser(username, email) {}
  function generateToken() {}
  function createUser() {}

  return res.json(user.data);
};
