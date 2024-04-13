import { RequestHandler } from "express";
import { SavedSchema } from "../utils/ZSchema";
import { verifyBlog } from "../helpers/verifyBlog";
import db from "../../prisma/prisma";

export const createSave: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const { blogId } = req.body;
    const save = SavedSchema.safeParse({
      userId,
      blogId,
    });
    if (!save.success) {
      return res.status(400).json({ message: save.error.issues[0].message });
    }
    if (!(await verifyBlog(blogId))) {
      return res.status(404).json({ message: "blog bulunamadı" });
    }
    await db.save.create({
      data: { userId, blogId },
    });
    return res.status(201).json({ message: "Kaydedildi" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const deleteBySaveId: RequestHandler = async (req, res) => {
  try {
    const saveId = req.params.id;
    if (!saveId) {
      return res.status(400).json({ message: "kaydedilen id eksik" });
    }
    await db.save.delete({ where: { id: saveId } });
    return res.status(200).json({ message: "kaydedilen silindi" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const getAllSaves: RequestHandler = async (req, res) => {
  try {
    const data = await db.save.findMany();
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
    const data = await db.save.findMany({ where: { blogId } });
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Bloğa ait kaydedilenler bulunamadı" });
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
    const data = await db.save.findMany({ where: { userId } });
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "kullanıcının kaydedileni bulunmuyor" });
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};
