/*
  Warnings:

  - You are about to drop the `Liked` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Liked" DROP CONSTRAINT "Liked_blogId_fkey";

-- DropForeignKey
ALTER TABLE "Liked" DROP CONSTRAINT "Liked_userId_fkey";

-- DropTable
DROP TABLE "Liked";

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_id_key" ON "Like"("id");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
