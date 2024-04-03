import db from "../../prisma/prisma";

export const verifyCategory = async (categoryId: string) => {
  try {
    if (!categoryId) {
      console.log("user id eksik");
    }
    return await db.category.findUnique({
      where: { id: categoryId },
    });
  } catch (error) {
    console.error(error);
  }
};
