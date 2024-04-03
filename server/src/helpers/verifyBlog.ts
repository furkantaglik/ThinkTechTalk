import db from "../../prisma/prisma";

export const verifyBlog = async (blogId: string) => {
  try {
    if (!blogId) {
      console.log("user id eksik");
    }
    return await db.user.findUnique({
      where: { id: blogId },
    });
  } catch (error) {
    console.error(error);
  }
};
