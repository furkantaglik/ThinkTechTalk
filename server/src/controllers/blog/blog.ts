import { RequestHandler } from "express";
import { BlogSchema } from "../../utils/ZSchema";
import db from "../../../prisma/prisma";

export const createBlog: RequestHandler = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const blog = BlogSchema.safeParse({
      title,
      content,
      userId,
    });
    if (!blog.success) {
      return res.status(400).json({ message: blog.error.issues[0].message });
    }
    await db.blog.create({
      data: {
        title,
        content,
        userId,
      },
    });
    return res.status(201).json({ message: "blog oluşturuldu" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const getAllBlogs: RequestHandler = async (req, res) => {
  try {
    const blogData = await db.blog.findMany();
    res.status(200).json({ data: blogData });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const updateByBlogId: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content, userId } = req.body;

    const blog = BlogSchema.safeParse({
      title,
      content,
      userId,
    });
    if (!blog.success) {
      return res.status(400).json({ message: blog.error.issues[0].message });
    }
    if (!id) {
      return res.status(500).json({ message: "Blog id eksik" });
    }

    const updatedBlog = await db.blog.update({
      where: { id },
      data: { title, content, userId },
    });
    res.status(200).json({ message: "Blog güncellendi", data: updatedBlog });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const deleteByBlogId: RequestHandler = async (req, res) => {
  try {
    const deletedId = req.params.id;
    if (!deletedId) {
      return res.status(400).json({ message: "Silinecek blogun id'si eksik" });
    }

    await db.blog.delete({
      where: { id: deletedId },
    });

    res.status(200).json({ message: "Blog başarıyla silindi" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const getByBlogId: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "blog id eksik" });
    }
    const blog = await db.blog.findUnique({
      where: { id: id },
    });
    return res.status(200).json({ data: blog });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};
