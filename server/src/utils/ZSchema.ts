import z from "zod";

export const BlogSchema = z.object({
  title: z
    .string({ required_error: "Alanlar boş geçilemez" })
    .min(5, "Başlık minimum 5 karakterden oluşabilir")
    .max(50, "Başlık maksimum 50 karakterden  oluşabilir"),
  content: z.string({ required_error: "Alanlar boş geçilemez" }),
  userId: z.string({ required_error: "Alanlar boş geçilemez" }),
});

export const UserSchema = z.object({
  firstName: z
    .string({ required_error: "Alanlar boş geçilemez" })
    .min(2, "isim minimum 2 karakterden oluşabilir")
    .max(18, "isim maksimum 18 karakterden  oluşabilir")
    .refine(
      (firstName) =>
        /^[a-zA-Z\u00C0-\u1FFF\u2C00-\uD7FF]+$/u.test(firstName) === true,
      { message: "İsim sadece harfden oluşabilir" }
    ),
  lastName: z
    .string({ required_error: "Alanlar boş geçilemez" })
    .min(2, "soyisim minimum 2 karakterden oluşabilir")
    .max(18, "soyisim maksimum 18 karakterden oluşabilir")
    .refine(
      (lastName) =>
        /^[a-zA-Z\u00C0-\u1FFF\u2C00-\uD7FF]+$/u.test(lastName) === true,
      { message: "Soyisim sadece harfden oluşabilir" }
    ),
  email: z
    .string({ required_error: "Alanlar boş geçilemez" })
    .email("Geçersiz email formatı"),
  username: z
    .string({ required_error: "Alanlar boş geçilemez" })
    .min(5, "kullanıcı adı minimum 5 karakterden oluşabilir")
    .max(18, "kullanıcı adı maksimum 18 karakterden oluşabilir")
    .transform((username) => username.trim().toLowerCase())
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username) === true, {
      message:
        "Kullanıcı adı sadece harf ve sayıdan oluşabilir ve Türkçe karakterler kabul edilmez",
    }),
  password: z
    .string({ required_error: "Alanlar boş geçilemez" })
    .min(5, "Şifre en az 5 karakterden oluşabilir"),
});
