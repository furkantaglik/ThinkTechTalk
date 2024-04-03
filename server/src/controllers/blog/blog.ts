import { RequestHandler } from "express";
import { BlogSchema } from "../../utils/ZSchema";
import db from "../../../prisma/prisma";
import { verifyUser } from "../../helpers/verifyUser";
import { verifyCategory } from "../../helpers/verifyCategory";
import { verifyBlog } from "../../helpers/verifyBlog";

export const createBlog: RequestHandler = async (req, res) => {
  try {
    const { title, content, userId, categoryId } = req.body;
    const blog = BlogSchema.safeParse({
      title,
      content,
      userId,
      categoryId,
    });
    if (!blog.success) {
      return res.status(400).json({ message: blog.error.issues[0].message });
    }
    if (!(await verifyUser(userId))) {
      res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
    if (!(await verifyCategory(categoryId))) {
      return res.status(404).json({ message: "kategori bulunamadı" });
    }
    await db.blog.create({
      data: {
        title,
        content,
        userId,
        categoryId,
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
    const data = await db.blog.findMany();
    res.status(200).json({ data: data });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const updateByBlogId: RequestHandler = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content, userId, categoryId } = req.body;

    const blog = BlogSchema.safeParse({
      title,
      content,
      userId,
      categoryId,
    });
    if (!blog.success) {
      return res.status(400).json({ message: blog.error.issues[0].message });
    }
    if (!blogId) {
      return res.status(400).json({ message: "Blog id eksik" });
    }
    if (!(await verifyUser(userId))) {
      res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
    if (!(await verifyCategory(categoryId))) {
      return res.status(404).json({ message: "kategori bulunamadı" });
    }
    const updatedBlog = await db.blog.update({
      where: { id: blogId },
      data: { title, content, userId, categoryId },
    });
    res.status(201).json({ message: "Blog güncellendi", data: updatedBlog });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const deleteByBlogId: RequestHandler = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(400).json({ message: "blog id eksik" });
    }
    if (!(await verifyBlog(blogId))) {
      return res.status(404).json({ message: "blog bulunamadı" });
    }
    await db.blog.delete({
      where: { id: blogId },
    });

    return res.status(200).json({ message: "Blog başarıyla silindi" });
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
    const data = await db.blog.findUnique({ where: { id: id } });
    if (!data) {
      res.status(404).json({ message: "blog bulunamadı" });
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const getByCategoryId: RequestHandler = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.json(400).json({ message: "kategori id eksik" });
    }
    if (!(await verifyCategory(categoryId))) {
      res.status(404).json({ message: "kategori bulunamadı" });
    }
    const data = await db.blog.findMany({ where: { categoryId: categoryId } });
    if (!data) {
      res.status(404).json({ message: "kategoriye ait blog bulunamadı" });
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
    if (!(await verifyUser(userId))) {
      res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
    const data = await db.user.findMany({ where: { id: userId } });
    if (!data) {
      res.status(404).json({ message: "kullanıcının blog yazısı bulunmuyor" });
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};
