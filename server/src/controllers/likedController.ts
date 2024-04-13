import { RequestHandler } from "express";
import { LikeSchema } from "../utils/ZSchema";
import { verifyBlog } from "../helpers/verifyBlog";
import db from "../../prisma/prisma";

export const createLike: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const { blogId } = req.body;
    const like = LikeSchema.safeParse({
      userId,
      blogId,
    });
    if (!like.success) {
      return res.status(400).json({ message: like.error.issues[0].message });
    }
    if (!(await verifyBlog(blogId))) {
      return res.status(404).json({ message: "blog bulunamadı" });
    }
    await db.like.create({
      data: { userId, blogId },
    });
    return res.status(201).json({ message: "Beğeni gönderildi" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const deleteByLikeId: RequestHandler = async (req, res) => {
  try {
    const likedId = req.params.id;
    if (!likedId) {
      return res.status(400).json({ message: "beğeni id eksik" });
    }
    await db.like.delete({ where: { id: likedId } });
    return res.status(200).json({ message: "beğeni silindi" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const getAllLikes: RequestHandler = async (req, res) => {
  try {
    const data = await db.like.findMany();
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const getByBlogId: RequestHandler = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(400).json({ message: "blog id eksik" });
    }
    const data = await db.like.findMany({ where: { blogId } });
    if (data.length === 0) {
      return res.status(404).json({ message: "Bloğa ait beğeni bulunamadı" });
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const getByUserId: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "kullanıcı id eksik" });
    }
    const data = await db.like.findMany({ where: { userId } });
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "kullanıcının beğenisi bulunmuyor" });
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};
