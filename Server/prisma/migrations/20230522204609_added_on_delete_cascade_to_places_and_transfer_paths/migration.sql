-- DropForeignKey
ALTER TABLE `transferPath` DROP FOREIGN KEY `transferPath_arrivalId_fkey`;

-- DropForeignKey
ALTER TABLE `transferPath` DROP FOREIGN KEY `transferPath_departureId_fkey`;

-- AddForeignKey
ALTER TABLE `transferPath` ADD CONSTRAINT `transferPath_departureId_fkey` FOREIGN KEY (`departureId`) REFERENCES `Place`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transferPath` ADD CONSTRAINT `transferPath_arrivalId_fkey` FOREIGN KEY (`arrivalId`) REFERENCES `Place`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
