/*
  Warnings:

  - You are about to drop the column `img` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "img",
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "image" TEXT;
