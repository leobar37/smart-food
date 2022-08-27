/*
  Warnings:

  - You are about to drop the column `isAvalaible` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "isVisible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isAvalaible",
ADD COLUMN     "isVisible" BOOLEAN NOT NULL DEFAULT true;
