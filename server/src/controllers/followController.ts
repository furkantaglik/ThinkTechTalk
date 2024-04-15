import { RequestHandler } from "express";
import db from "../../prisma/prisma";
import { verifyUser } from "../helpers/verifyUser";

export const getUserFollowers: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "kullanıcı id eksik" });
    }
    if (!(await verifyUser(userId))) {
      return res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
    const data = await db.follow.findMany({
      where: { followingId: userId },
      include: { follower: true },
    });
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const getUserFollowing: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "kullanıcı id eksik" });
    }
    if (!(await verifyUser(userId))) {
      return res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
    const data = await db.follow.findMany({
      where: { followerId: userId },
      include: { following: true },
    });
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const followUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const targetUserId = req.params.id;
    if (!targetUserId) {
      return res.status(400).json({ message: "hedef kullanıcı id eksik" });
    }
    if (!(await verifyUser(targetUserId))) {
      return res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
    await db.follow.create({
      data: {
        followerId: userId,
        followingId: targetUserId,
      },
    });
    return res.status(201).json({ message: "kullanıcı takip edildi" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const unFollowUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const targetUserId = req.params.id;
    if (!targetUserId) {
      return res.status(400).json({ message: "hedef kullanıcı id eksik" });
    }
    if (!(await verifyUser(targetUserId))) {
      return res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
    await db.follow.deleteMany({
      where: {
        followerId: userId,
        followingId: targetUserId,
      },
    });
    return res.status(201).json({ message: "kullanıcı takipten çıkıldı" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};
