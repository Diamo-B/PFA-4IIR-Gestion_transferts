/*
  Warnings:

  - You are about to drop the column `tarif` on the `extra` table. All the data in the column will be lost.
  - Added the required column `price` to the `Extra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `extra` DROP COLUMN `tarif`,
    ADD COLUMN `price` DOUBLE NOT NULL,
    MODIFY `params` JSON NULL;
