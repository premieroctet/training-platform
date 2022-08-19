/*
  Warnings:

  - You are about to drop the column `courseFile` on the `Training` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Training` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Training" DROP COLUMN "courseFile",
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Training.slug_unique" ON "Training"("slug");
