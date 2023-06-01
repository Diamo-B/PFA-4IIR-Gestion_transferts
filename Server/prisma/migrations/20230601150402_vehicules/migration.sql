-- AlterTable
ALTER TABLE `image` ADD COLUMN `vehiculeId` VARCHAR(191) NULL,
    MODIFY `placeId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Model` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicule` (
    `id` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NULL,
    `brand` VARCHAR(191) NOT NULL,
    `places` INTEGER NOT NULL,
    `lux` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_vehiculeId_fkey` FOREIGN KEY (`vehiculeId`) REFERENCES `Vehicule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
