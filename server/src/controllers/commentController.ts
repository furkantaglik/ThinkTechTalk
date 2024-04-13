import { RequestHandler } from "express";
import { CommentSchema } from "../utils/ZSchema";
import { verifyBlog } from "../helpers/verifyBlog";
import db from "../../prisma/prisma";

export const createComment: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const { blogId, content } = req.body;
    const comment = CommentSchema.safeParse({
      userId,
      blogId,
      content,
    });
    if (!comment.success) {
      return res.status(400).json({ message: comment.error.issues[0].message });
    }
    if (!(await verifyBlog(blogId))) {
      return res.status(404).json({ message: "blog bulunamadı" });
    }
    await db.comment.create({
      data: { userId, blogId, content },
    });
    return res.status(201).json({ message: "Yorum gönderildi" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const deleteByCommentId: RequestHandler = async (req, res) => {
  try {
    const commentId = req.params.id;
    if (!commentId) {
      return res.status(400).json({ message: "yorum id eksik" });
    }
    await db.comment.delete({ where: { id: commentId } });
    return res.status(200).json({ message: "yorum silindi" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const updateByCommentId: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const commentId = req.params.id;
    const { content, blogId } = req.body;
    const comment = CommentSchema.safeParse({
      userId,
      content,
      blogId,
    });
    if (!commentId) {
      return res.status(400).json({ message: "yorum id eksik" });
    }
    if (!comment.success) {
      return res
        .status(400)
        .json({ message: -comment.error.issues[0].message });
    }
    await db.comment.update({
      where: { id: commentId },
      data: { content },
    });
    return res.status(200).json({ message: "yorum düzenlendi" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const getAllComments: RequestHandler = async (req, res) => {
  try {
    const data = await db.comment.findMany();
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
    const data = await db.comment.findMany({ where: { blogId } });
    if (data.length === 0) {
      return res.status(404).json({ message: "Bloğa ait yorum bulunamadı" });
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
    const data = await db.comment.findMany({ where: { userId } });
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "kullanıcının yorumu bulunmuyor" });
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};
