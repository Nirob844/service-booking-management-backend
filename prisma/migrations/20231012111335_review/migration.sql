/*
  Warnings:

  - You are about to drop the column `comment` on the `review_and_rating` table. All the data in the column will be lost.
  - Added the required column `review` to the `review_and_rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "review_and_rating" DROP COLUMN "comment",
ADD COLUMN     "review" TEXT NOT NULL;
