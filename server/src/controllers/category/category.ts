import { RequestHandler } from "express";
import { CategorySchema } from "../../utils/ZSchema";
import { verifyCategory } from "../../helpers/verifyCategory";
import db from "../../../prisma/prisma";

export const createCategory: RequestHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const category = CategorySchema.safeParse({
      name,
    });
    if (!category.success) {
      return res
        .status(400)
        .json({ message: category.error.issues[0].message });
    }
    await db.category.create({
      data: {
        name,
      },
    });
    return res.status(201).json({ message: "kategori oluşturuldu" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const getAllCategory: RequestHandler = async (req, res) => {
  try {
    const categoryData = await db.category.findMany();
    res.status(200).json({ data: categoryData });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const updateByCategoryId: RequestHandler = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;

    const category = CategorySchema.safeParse({
      name,
    });
    if (!category.success) {
      return res
        .status(400)
        .json({ message: category.error.issues[0].message });
    }
    if (!categoryId) {
      return res.status(400).json({ message: "Kategori id eksik" });
    }
    if (!(await verifyCategory(categoryId))) {
      return res.status(404).json({ message: "kategori bulunamadı" });
    }
    const updatedCategory = await db.category.update({
      where: { id: categoryId },
      data: { name },
    });
    res
      .status(201)
      .json({ message: "Kategori güncellendi", data: updatedCategory });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const deleteByCategoryId: RequestHandler = async (req, res) => {
  try {
    const deletedId = req.params.id;
    if (!deletedId) {
      return res.status(400).json({ message: "kategori id eksik" });
    }

    await db.category.delete({
      where: { id: deletedId },
    });

    res.status(200).json({ message: "kategori başarıyla silindi" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};

export const getByCategoryId: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "kategori id eksik" });
    }
    const category = await db.category.findUnique({
      where: { id: id },
    });
    return res.status(200).json({ data: category });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "beklenmedik bir hata" });
  }
};
