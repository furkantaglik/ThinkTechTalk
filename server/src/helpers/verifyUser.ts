import db from "../../prisma/prisma";

export const verifyUser = async (userId: string) => {
  try {
    if (!userId) {
      console.log("user id eksik");
    }
    return await db.user.findUnique({
      where: { id: userId },
    });
  } catch (error) {
    console.error(error);
  }
};
