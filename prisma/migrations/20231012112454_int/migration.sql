/*
  Warnings:

  - Changed the type of `rating` on the `review_and_rating` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "review_and_rating" DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER NOT NULL;
