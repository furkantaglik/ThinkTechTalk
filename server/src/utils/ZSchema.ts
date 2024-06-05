import z from "zod";

export const BlogSchema = z.object({
  title: z
    .string({ required_error: "Alanlar boş geçilemez" })
    .min(5, "Başlık minimum 5 karakterden oluşabilir")
    .max(50, "Başlık maksimum 50 karakterden  oluşabilir"),
  content: z.string({ required_error: "Alanlar boş geçilemez" }),
  media: z
    .object(
      { destination: z.string() },
      { required_error: "Medya boş geçilemez" }
    )
    .nullable(),
  userId: z.string({ required_error: "Alanlar boş geçilemez" }),
  categoryId: z.string({ required_error: "Alanlar boş geçilemez" }),
});

export const CategorySchema = z.object({
  name: z
    .string({ required_error: "Alanlar boş geçilemez" })
    .min(2, "kategori minimum 2 karakterden oluşabilir")
    .max(50, "kategori maksimum 50 karakterden  oluşabilir"),
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
  bio: z
    .string()
    .max(100, "biografi en fazla 100 karakterden oluşabilir")
    .optional(),
  avatar: z.string().optional(),
});

export const PostSchema = z.object({
  title: z
    .string({ required_error: "Alanlar boş geçilemez" })
    .min(2, "Başlık minimum 2 karakterden oluşabilir")
    .max(100, "Başlık maksimum 100 karakterden  oluşabilir"),
  userId: z.string({ required_error: "Alanlar boş geçilemez" }),
  media: z
    .object(
      { destination: z.string() },
      { required_error: "Medya boş geçilemez" }
    )
    .nullable(),
});

export const CommentSchema = z.object({
  content: z
    .string({ required_error: "Alanlar boş geçilemez" })
    .min(3, "yorum minimum 3 karakterden oluşabilir")
    .max(200, "yorum maksimum 200 karakterden  oluşabilir"),
  userId: z.string({ required_error: "Alanlar boş geçilemez" }),
  blogId: z.string({ required_error: "Alanlar boş geçilemez" }),
});

export const LikeSchema = z.object({
  userId: z.string({ required_error: "Alanlar boş geçilemez" }),
  blogId: z.string({ required_error: "Alanlar boş geçilemez" }),
});

export const SavedSchema = z.object({
  userId: z.string({ required_error: "Alanlar boş geçilemez" }),
  blogId: z.string({ required_error: "Alanlar boş geçilemez" }),
});
