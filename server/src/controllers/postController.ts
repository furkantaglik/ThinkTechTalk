import { RequestHandler } from "express";
import { PostSchema } from "../utils/ZSchema";
import { verifyUser } from "../helpers/verifyUser";
import db from "../../prisma/prisma";

export const createPost: RequestHandler = async (req, res) => {
  try {
    const media = req.file;
    const userId = req.user.id;
    const { title } = req.body;
    const post = PostSchema.safeParse({
      title,
      userId,
    });
    if (!post.success) {
      return res.status(400).json({ message: post.error.issues[0].message });
    }
    // await db.post.create({
    //   data: {
    //     title,
    //     mediaPath: "test",
    //     userId,
    //     mediaType: "IMAGE",
    //   },
    // });
    return res.status(201).json({ message: "post gönderildi" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const getAllPosts: RequestHandler = async (req, res) => {
  try {
    const data = await db.post.findMany();
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const updateByPostId: RequestHandler = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const { title, mediaPath, mediaType } = req.body;
    const post = PostSchema.safeParse({
      title,
      mediaType,
      userId,
      mediaPath,
    });
    if (!post.success) {
      return res.status(400).json({ message: post.error.issues[0].message });
    }

    const updatedPost = await db.post.update({
      where: { id: postId },
      data: { title, mediaPath, mediaType },
    });
    return res
      .status(201)
      .json({ message: "post güncellendi", data: updatedPost });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const deleteByPostId: RequestHandler = async (req, res) => {
  try {
    const blogId = req.params.id;
    await db.post.delete({
      where: { id: blogId },
    });
    return res.status(200).json({ message: "Blog başarıyla silindi" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const getByPostId: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "gönderi id eksik" });
    }
    const data = await db.post.findUnique({ where: { id: id } });
    if (!data) {
      return res.status(404).json({ message: "gönderi bulunamadı" });
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
      return res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
    const data = await db.post.findMany({ where: { userId: userId } });
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "kullanıcının gönderisi  bulunmuyor" });
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};
