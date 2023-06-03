/*
  Warnings:

  - You are about to drop the column `model` on the `vehicule` table. All the data in the column will be lost.
  - Added the required column `modelId` to the `Vehicule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_Brand` to the `Vehicule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vehicule` DROP COLUMN `model`,
    ADD COLUMN `modelId` VARCHAR(191) NOT NULL,
    ADD COLUMN `sub_Brand` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Vehicule` ADD CONSTRAINT `Vehicule_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `Model`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
