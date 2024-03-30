import z from "zod";

export const UserSchema = z.object({
  firstName: z
    .string()
    .min(2, "isim minimum 2 karakterden oluşabilir")
    .max(18, "isim maksimum 18 karakterden  oluşabilir")
    .refine(
      (firstName) =>
        /^[a-zA-Z\u00C0-\u1FFF\u2C00-\uD7FF]+$/u.test(firstName) === true,
      { message: "İsim sadece harfden oluşabilir" }
    ),
  lastName: z
    .string()
    .min(2, "soyisim minimum 2 karakterden oluşabilir")
    .max(18, "soyisim maksimum 18 karakterden oluşabilir")
    .refine(
      (lastName) =>
        /^[a-zA-Z\u00C0-\u1FFF\u2C00-\uD7FF]+$/u.test(lastName) === true,
      { message: "Soyisim sadece harfden oluşabilir" }
    ),
  email: z.string().email("Geçersiz email formatı"),
  username: z
    .string()
    .min(5, "kullanıcı adı minimum 5 karakterden oluşabilir")
    .max(18, "kullanıcı adı maksimum 18 karakterden oluşabilir")
    .transform((username) => username.trim().toLowerCase())
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username) === true, {
      message:
        "Kullanıcı adı sadece harf ve sayıdan oluşabilir ve Türkçe karakterler kabul edilmez",
    }),
  password: z.string().min(5, "Şifre en az 5 karakterden oluşabilir"),
});
