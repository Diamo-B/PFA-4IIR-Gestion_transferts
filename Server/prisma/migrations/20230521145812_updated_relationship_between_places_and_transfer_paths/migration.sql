/*
  Warnings:

  - You are about to drop the `_PlaceTotransferPath` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `arrivalId` to the `transferPath` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureId` to the `transferPath` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_PlaceTotransferPath` DROP FOREIGN KEY `_PlaceTotransferPath_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PlaceTotransferPath` DROP FOREIGN KEY `_PlaceTotransferPath_B_fkey`;

-- AlterTable
ALTER TABLE `transferPath` ADD COLUMN `arrivalId` VARCHAR(191) NOT NULL,
    ADD COLUMN `departureId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_PlaceTotransferPath`;

-- AddForeignKey
ALTER TABLE `transferPath` ADD CONSTRAINT `transferPath_departureId_fkey` FOREIGN KEY (`departureId`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transferPath` ADD CONSTRAINT `transferPath_arrivalId_fkey` FOREIGN KEY (`arrivalId`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
